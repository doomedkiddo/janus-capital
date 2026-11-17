"use client";

import { useEffect, useState } from "react";
import { RECORD_URL, type PerformanceRecord } from "./performance";

let pending: Promise<PerformanceRecord> | null = null;

// one request for the page, however many sections read the record
const load = () =>
  (pending ??= fetch(RECORD_URL, { cache: "no-cache" })
    .then((r) => (r.ok ? (r.json() as Promise<PerformanceRecord>) : Promise.reject(r.status)))
    .catch((e) => {
      pending = null;
      throw e;
    }));

/** The live record: undefined while it loads, "error" if it could not be fetched. */
export function useRecord() {
  const [rec, setRec] = useState<PerformanceRecord | "error">();
  useEffect(() => {
    let on = true;
    load().then(
      (j) => on && setRec(j),
      () => on && setRec("error"),
    );
    return () => {
      on = false;
    };
  }, []);
  return rec;
}
