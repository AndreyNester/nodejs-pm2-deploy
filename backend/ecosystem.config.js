require("dotenv").config({ path: "../.env.deploy" });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_REF,
  DEPLOY_REPO,
  DEPLOY_PATH_BACKEND,
  NPM_PATH,
} = process.env;

module.exports = {
  apps: [
    {
      name: "api-service",
      script: `/home/andrey_nesterok/nodejs-mesto-project/backend/dist/app.js`,
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
      
      "pre-deploy-local": `scp ../.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH_BACKEND}/.env`,
      
      "post-deploy": `export ${NPM_PATH} && npm install && npm run build && pm2 startOrRestart ${DEPLOY_PATH_BACKEND}/ecosystem.config.js --env production`,
    },
  },
};
