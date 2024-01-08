import { MongoClient } from "mongodb";
import { jwtSecret, MONGO_DB_URI } from "$lib/server/secrets";
import base64url from "base64url";
import pkg, { decode } from "jsonwebtoken";
import ChristmasPassword from "$lib/server/models/christmas-passwords";
const { JsonWebTokenError, sign, verify } = pkg;

const client = new MongoClient(MONGO_DB_URI);

/**
 * Returns a JSONWebToken for the user if they successfully authenticate, return undefined otherwise.
 */
async function AuthenticateUser(codename: string): Promise<string | undefined> {
  await client.connect();
  let database = client.db("Users");
  let christmasPasswordCollection = database.collection("Christmas Passwords");

  const query = { password: codename };
  let userInDatabase;

  try {
    userInDatabase = await christmasPasswordCollection.findOne<ChristmasPassword>(query);

    if (userInDatabase == null) return undefined;
  } catch (e) {
    console.log("major issue dummy");
    return undefined;
  }

  // TODO: return something more useful than boolean.
  return await CreateSignedJwtToken(userInDatabase.name);
}

async function CreateSignedJwtToken(username: string): Promise<string> {
  let jwtHeader: object = {
    "alg": "HS256",
    "typ": "jwt",
  };

  let jwtPayload: object = {
    "username": username,
    "admin": false,
  };

  let signedToken = sign({username: username}, jwtSecret);

  return signedToken;
}

async function VerifyJwtToken(jwtToken: string): Promise<boolean> {
  let jwtTokenBody;
  try {
    jwtTokenBody = verify(jwtToken, jwtSecret);
    console.log(`verify succeeds`);
    return true;
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      // log attack
      console.log("attack");
    } else {
      // log error
      console.log(`error: ${e}`);
    }
    return false;
  }
}

async function GetUsernamefromJwtToken(token: string): string {
  let decodedToken = decode(token, {complete: true});
  let allegedUsername = decodedToken?.payload.username;
  if (allegedUsername){
    return allegedUsername;
  } else {
    throw Exception("username cannot be found");
  }
}

export { AuthenticateUser, CreateSignedJwtToken, VerifyJwtToken, GetUsernamefromJwtToken };
