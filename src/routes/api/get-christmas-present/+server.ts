import { GetPresent } from '$lib/server/controllers/christmas-controller';
import { error, type RequestHandler } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const present: string = url.searchParams.get('present');
	const recipient: string = url.searchParams.get('recipient');
	const gotten: string = url.searchParams.get('gotten');

  const boolGotten: boolean = gotten == "true" ? true : false;

  if (present == null || present.trim() == "")
    throw error(400, "no present");

  if (recipient == null || recipient.trim() == "")
    throw error(400, "no recipient");

  const updateAcknowledgedResult = await GetPresent(recipient, present, boolGotten);

  return new Response(updateAcknowledgedResult.toString());
}
