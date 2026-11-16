module.exports = {
  apps: [
    {
      name: 'sagnac-trading',
      script: 'server.cjs',
      cwd: '/home/ubuntu/sagnac-trading',
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
