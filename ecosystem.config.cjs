module.exports = {
  apps: [
    {
      name: "ck-v2-dev",
      script: "npm",
      args: "run dev",
      cwd: __dirname,
      watch: false,
      autorestart: true,
      env: {
        NODE_ENV: "development",
        PORT: process.env.PORT || 3000,
      },
      windowsHide: false,
    },
  ],
};


