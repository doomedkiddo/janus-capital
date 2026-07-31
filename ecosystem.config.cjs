module.exports = {
  apps: [
    {
      name: 'janus-capital',
      script: 'server.cjs',
      cwd: '/home/ubuntu/janus-capital',
      env: {
        NODE_ENV: 'production',
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
