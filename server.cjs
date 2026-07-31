const { execSync, spawn } = require('child_process');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
const port = 3002;

const serve = spawn('serve', ['-s', distPath, '-l', port], {
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
