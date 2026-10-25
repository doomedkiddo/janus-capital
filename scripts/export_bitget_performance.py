"""Bitget market-making record (account mm2) for the performance section, from bg-dash's database.

  cd ~/bitget2_dashboard/backend && ~/miniconda3/bin/python ~/janus-capital/scripts/export_bitget_performance.py \
      [--since 2026-10-13T17:31] [--out ~/janus-capital/out/data/performance/market-making-bitget.json]

Read-only on bg-dash's Mongo (connection string from its own settings; run from its backend directory). Writes the same JSON shape as
binance_mm's live_web_export.py, ratios only. Net value is bg-dash's own (services/mm_stats.get_nav): the 30-second equity snapshots
chained, each interval's return = (equity change - transfer) / equity before, so deposits and withdrawals do not count as return
(a transfer is a wallet move the fills and funding of that interval do not explain, above max($20, 1% of equity)). Unlike the Binance
record this is the whole account, compounded. Leverage = gross position (rebuilt from the fills since the start, when mm2 was flat,
at each symbol's last fill price) / equity. Turnover = traded notional / equity at the time, summed.
"""
import calendar, datetime, json, math, os, sys, time

sys.path.insert(0, os.getcwd())
from app.config import get_settings  # noqa: E402
from pymongo import MongoClient  # noqa: E402

ACCOUNT = "5061801444"                     # mm2
SINCE_DEFAULT = "2026-10-13T17:31"         # rv29's first live start on mm2 (17:31:52 UTC); flat before
STEP = 600
FUNDING = {"$regex": r"SETTLE_FEE_USER_(IN|OUT)$"}


def arg(name, default):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default


def main():
    since = calendar.timegm(time.strptime(arg("--since", SINCE_DEFAULT), "%Y-%m-%dT%H:%M"))
    out = os.path.expanduser(arg("--out", "~/janus-capital/out/data/performance/market-making-bitget.json"))
    db = MongoClient(get_settings().mongo_conn_str, serverSelectionTimeoutMS=10000).bitget_dashboard

    epoch = lambda d: calendar.timegm(d.timetuple()) + d.microsecond / 1e6           # equity_snapshots.timestamp: naive UTC
    snaps = [s for s in db.equity_snapshots.find({"accountId": ACCOUNT, "timestamp": {"$gte": datetime.datetime.utcfromtimestamp(since)}},
                                                 {"_id": 0, "timestamp": 1, "accountEquity": 1, "unrealisedPnl": 1}).sort("timestamp", 1)
             if s["accountEquity"] > 0]
    cutoff = datetime.datetime.fromtimestamp(since)                                   # fills / records: naive local time (sync_service)
    fills = list(db.trade_fills.find({"accountId": ACCOUNT, "createdTime": {"$gte": cutoff}},
                                     {"_id": 0, "symbol": 1, "side": 1, "execQty": 1, "execPrice": 1, "execPnl": 1, "fee": 1, "tradeScope": 1, "createdTime": 1}).sort("createdTime", 1))
    funding = list(db.financial_records.find({"accountId": ACCOUNT, "ts": {"$gte": cutoff}, "type": FUNDING}, {"_id": 0, "amount": 1, "ts": 1}))
    cash = sorted([(f["createdTime"].timestamp(), float(f.get("execPnl") or 0) - float(f.get("fee") or 0)) for f in fills]
                  + [(g["ts"].timestamp(), float(g.get("amount") or 0)) for g in funding])
    fl = [(f["createdTime"].timestamp(), f["symbol"], (-1 if f["side"] == "sell" else 1) * float(f["execQty"]), float(f["execPrice"])) for f in fills]

    # net value (bg-dash get_nav), gross position and turnover per snapshot
    t = [epoch(snaps[0]["timestamp"])]; nav = [1.0]; lev = []; turn = [0.0]; flows = []
    pos, px = {}, {}; ci = fi = 0
    while ci < len(cash) and cash[ci][0] <= t[0]: ci += 1
    while fi < len(fl) and fl[fi][0] <= t[0]:
        _, s, q, p = fl[fi]; pos[s] = pos.get(s, 0.0) + q; px[s] = p; fi += 1
    gross = lambda: sum(abs(q) * px[s] for s, q in pos.items())
    lev.append(gross() / snaps[0]["accountEquity"])
    for prev, cur in zip(snaps, snaps[1:]):
        tc = epoch(cur["timestamp"]); explained = 0.0; notional = 0.0
        while ci < len(cash) and cash[ci][0] <= tc: explained += cash[ci][1]; ci += 1
        while fi < len(fl) and fl[fi][0] <= tc:
            _, s, q, p = fl[fi]; pos[s] = pos.get(s, 0.0) + q; px[s] = p; notional += abs(q) * p; fi += 1
        eq = prev["accountEquity"]
        flow = (cur["accountEquity"] - cur["unrealisedPnl"]) - (eq - prev["unrealisedPnl"]) - explained
        if abs(flow) <= max(20.0, 0.01 * eq): flow = 0.0
        else: flows.append((tc, round(flow, 2)))
        t.append(tc); nav.append(nav[-1] * (1 + (cur["accountEquity"] - eq - flow) / eq))
        lev.append(gross() / cur["accountEquity"]); turn.append(turn[-1] + notional / eq)

    pk = 1.0; dd = []
    for v in nav: pk = max(pk, v); dd.append(v / pk - 1.0)
    j = min(range(len(dd)), key=dd.__getitem__); i = max(range(j + 1), key=nav.__getitem__)

    def nav_at(u):                                                                    # linear between snapshots
        k = max(0, min(len(t) - 2, next((m for m in range(len(t)) if t[m] >= u), len(t) - 1) - 1))
        w = 0.0 if t[k + 1] == t[k] else (u - t[k]) / (t[k + 1] - t[k])
        return nav[k] + max(0.0, min(1.0, w)) * (nav[k + 1] - nav[k])
    edges = [t[0]] + list(range((int(t[0] // 86400) + 1) * 86400, int(t[-1]), 86400)) + [t[-1]]
    vals = [nav_at(u) for u in edges]
    rows = [(edges[k], vals[k + 1] / vals[k] - 1.0, vals[k + 1], (edges[k + 1] - edges[k]) < 86400 - 120) for k in range(len(edges) - 1)]
    full = [r[1] for r in rows if not r[3]]; n = len(full)
    mean = sum(full) / n if n else 0.0
    sd = math.sqrt(sum((x - mean) ** 2 for x in full) / (n - 1)) if n > 2 else None
    hours = (t[-1] - t[0]) / 3600.0

    pts = []; b0 = None
    for k in range(len(t)):                                                           # 10-minute buckets: last nav, lowest drawdown
        b = int((t[k] - t[0]) // STEP)
        if b != b0: pts.append([int(t[k]), nav[k], dd[k]]); b0 = b
        else: pts[-1] = [int(t[k]), nav[k], min(pts[-1][2], dd[k])]
    pts[0] = [int(t[0]), nav[0], dd[0]]
    hb = {}
    for u, v in zip(t, lev): hb.setdefault(int(u // 3600), []).append(v)
    th = {}
    for u, v in zip(t, turn): th[int(u // 3600)] = (int(u), v)
    r4 = lambda v: round(float(v), 4)
    rec = dict(
        asof=int(t[-1]), since=int(t[0]),
        kpi=dict(cum_return=r4(nav[-1] - 1.0), max_dd=r4(dd[j]), dd_peak=int(t[i]), dd_trough=int(t[j]),
                 sharpe=round(mean / sd * math.sqrt(365.0), 2) if sd else None, n_days=n, daily_vol=r4(sd) if sd else None,
                 pos_days=sum(1 for x in full if x > 0), best_day=r4(max(full)), worst_day=r4(min(full)),
                 lev_mean=round(sum(lev) / len(lev), 2), lev_now=round(lev[-1], 2), turnover=round(turn[-1], 1),
                 turnover_per_day=round(turn[-1] / hours * 24.0, 1),
                 maker=round(100.0 * sum(1 for f in fills if f.get("tradeScope") == "maker") / max(len(fills), 1), 1)),
        series=dict(cols=["t", "nav", "dd"], rows=[[u, round(v, 5), round(d, 5)] for u, v, d in pts]),
        leverage=dict(cols=["t", "mean", "min", "max"], rows=[[h * 3600 + 1800, round(sum(v) / len(v), 3), round(min(v), 3), round(max(v), 3)] for h, v in sorted(hb.items())]),
        turnover=dict(cols=["t", "x"], rows=[[u, round(v, 1)] for _, (u, v) in sorted(th.items())]),
        daily=dict(cols=["day", "ret", "nav", "partial"], rows=[[int(r[0]), r4(r[1]), r4(r[2]), bool(r[3])] for r in rows]))
    tmp = out + ".tmp"
    json.dump(rec, open(tmp, "w"), separators=(",", ":")); os.replace(tmp, out)
    k = rec["kpi"]
    print(f"BITGET_PERF {out} ({os.path.getsize(out) / 1024:.0f} KB) | {len(snaps)} snapshots, {len(fills)} fills, {len(funding)} funding | open symbols {sum(1 for q in pos.values() if abs(q) > 1e-12)}")
    print("  transfers taken out:", ", ".join(f"{time.strftime('%m-%d %H:%M', time.gmtime(u))} {a:+,.2f}" for u, a in flows) or "none")
    print(f"  net value {nav[-1]:.4f} | max DD {dd[j] * 100:.2f}% | Sharpe {k['sharpe']} on {n} days | positive {k['pos_days']}/{n} | best {k['best_day'] * 100:+.2f}% "
          f"worst {k['worst_day'] * 100:+.2f}% | leverage {k['lev_mean']}x now {k['lev_now']}x | turnover {k['turnover']:,.0f}x ({k['turnover_per_day']:.0f}x/day) | maker {k['maker']}%")
    print("  days:", [(time.strftime("%m-%d", time.gmtime(r[0])), round(r[1] * 100, 2), round(r[2], 3), r[3]) for r in rows])


if __name__ == "__main__":
    main()
