module.exports = {
  apps: [
    {
      name: "invitation",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 4000,
      },
      instances: 1, // 또는 'max'로 설정하여 CPU 코어 수만큼 실행
      exec_mode: "fork", // 또는 'cluster'
      watch: false,
      max_memory_restart: "1G",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
      restart_delay: 4000,
    },
  ],
};
