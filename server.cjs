const { spawn } = require('child_process');
const path = require('path');

// Next.js static export output. `-s` (SPA fallback) must NOT be used here:
// it would rewrite /about to the root index.html.
const rootPath = path.join(__dirname, 'out');
const port = 3002;

const serve = spawn('serve', [rootPath, '-l', port], {
  stdio: 'inherit',
  cwd: __dirname,
});

serve.on('error', (err) => {
  console.error('Failed to start serve:', err);
  process.exit(1);
});

process.on('SIGINT', () => {
  serve.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  serve.kill('SIGTERM');
  process.exit(0);
});
