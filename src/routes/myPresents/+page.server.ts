import { VerifyJwtToken } from '$lib/server/controllers/authentication-controller';
import { AddPresent, GetPresentsForThisUser, RemovePresent } from '$lib/server/controllers/christmas-controller';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RequestEvent } from '../$types';

/** @type {import('./$types').PageServerLoad} */
const load = (async ({ cookies }) => {
  const token = cookies.get('signed-token');

  if (token) {
    const verified_token = await VerifyJwtToken(token);

    if (!verified_token) throw redirect(302, '/login');

    const presents = await GetPresentsForThisUser(token);
    let presents_gift_only = [];

    presents.map(present => {
      presents_gift_only.push(present.gift);
    });

    console.log(presents_gift_only);

    return {
      authenticated: verified_token,
      presents: presents_gift_only
    };
  } else {
    throw redirect(302, '/login');
  }
}) satisfies PageServerLoad;

/** @type {import('./$types').Actions} */
const actions = {
  remove_item: async (event: RequestEvent) => {
    const formData = await event.request.formData();
    let itemToAdd: string = "";
    // Since each button has only one associated item, there is only one key, the item to delete.
    formData.forEach((entry, key, parent) => {
      itemToAdd = key;
    });
    const token: string = event.cookies.get('signed-token');
    await RemovePresent(token, itemToAdd);
  },
  add_item: async (event: RequestEvent) => {
    console.log(event);
    const token: string = event.cookies.get('signed-token');
    const formData = await event.request.formData();
    let itemToAdd: string = "";
    // Since the input submit button has only one 'name', there is only one key, the item to add.
    formData.forEach((entry, key, parent) => {
      itemToAdd = key;
    });
    await AddPresent(token, itemToAdd);
  }
}

export {load, actions}
