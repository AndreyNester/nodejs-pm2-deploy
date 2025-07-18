require("dotenv").config({ path: ".env.deploy" });

const {
  // общие
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_REF,
  NPM_PATH,

  // backend
  DEPLOY_REPO,
  DEPLOY_PATH_BACKEND,

  // frontend
  DEPLOY_PATH_FRONTEND,
} = process.env;

module.exports = {
  apps: [
    {
      name: "api-service",
      script: "./backend/dist/app.js",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH_BACKEND,

      "pre-deploy-local": `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH_BACKEND}/.env`,

      "post-deploy": `export ${NPM_PATH} && cd ${DEPLOY_PATH_FRONTEND} && npm i && npm run build && cd ${DEPLOY_PATH_BACKEND} && npm install && npm run build && cd {DEPLOY_PATH} && pm2 reload ecosystem.config.js --only api-service --env production`,
    }
  },
};
