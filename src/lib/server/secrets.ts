// Env can take the value "deployment" or "local". If the env is local, get the env variables from the command line parameters. Otherwise, get them from deployment env vars.
let env = process.env.npm_config_env || "deployment";

let MONGO_DB_URI: string;

if (env === "deployment") {
  MONGO_DB_URI = process.env.VITE_MONGO_DB_URI;
} else {
  MONGO_DB_URI = process.env.npm_config_VITE_MONGO_DB_URI;
}

let jwtSignature: string = "jacobcaldwellisthecoolest:):):)";

export { jwtSignature as jwtSecret, MONGO_DB_URI };
