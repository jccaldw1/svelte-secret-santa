import { Db, MongoClient } from "mongodb";
import { MONGO_DB_URI } from "$lib/server/secrets";
import ChristmasPresent from "../models/christmas-present";
import { decode } from "jsonwebtoken";

const client = new MongoClient(MONGO_DB_URI);
await client.connect();
const database: Db = client.db('Users');
const christmasPresentsCollection = database.collection<ChristmasPresent>('Christmas Presents');

/**
  * Gets the presents for the currently logged-in user.
  */
async function GetPresentsForThisUser(token: string) {
  const username = GetUsernameFromToken(token);

  const query = { recipient: username };

  const presents = christmasPresentsCollection.find<ChristmasPresent>(query);

  let presentsReturn = [];

  for await (const present of presents) {
    presentsReturn.push(present);
  }

  return presentsReturn;
}

async function GetOthersPresents(token: string) {
  const username = GetUsernameFromToken(token);

  const query = { recipient: {$ne: username}};

  const presents = christmasPresentsCollection.find<ChristmasPresent>(query);

  let presentsReturn = [];

  for await (const present of presents){
    presentsReturn.push(present);
  }

  return presentsReturn;
}

async function GetPresent(token: string, recipient: string, present: string, gotten: boolean) {
  const updateCriteria = {recipient: recipient, present: present}

  const updateResult = await christmasPresentsCollection.updateOne(updateCriteria, {gotten: gotten});
  console.log(updateResult);
}

async function RemovePresent(token: string, present: string) {
  const username = GetUsernameFromToken(token);

  const delete_query = {recipient: username, gift: present}

  const delete_result = await christmasPresentsCollection.deleteOne(delete_query);
  console.log(`delete result: ${JSON.stringify(delete_result)}`);
}

async function AddPresent(token: string, present: string) {
  const username = GetUsernameFromToken(token);

  const presentToAdd: ChristmasPresent = {
    gift: present,
    gotten: false,
    recipient: username
  } 

  let insertResult = await christmasPresentsCollection.insertOne(presentToAdd);
  if (insertResult.acknowledged == false) throw('acknowledged iks false idiot')
}

function GetUsernameFromToken(token: string) {
  const decodedToken = decode(token);

  const username = decodedToken?.username;

  if (!username) 
    throw redirect(302, '/login') 
  else 
    return username;
}

export { GetPresentsForThisUser, RemovePresent, AddPresent, GetOthersPresents };
