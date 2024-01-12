import { VerifyJwtToken } from '$lib/server/controllers/authentication-controller';
import { GetOthersPresents } from '$lib/server/controllers/christmas-controller';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RequestEvent } from '../$types';

type Present = {
  gift: string,
  gotten: bool,
  recipient: string
}

/** @type {import('./$types').PageServerLoad} */
const load = (async ({ cookies }) => {
  const token = cookies.get('signed-token');

  if (token) {
    const verified_token = await VerifyJwtToken(token);

    if (!verified_token) throw redirect(302, '/login');

    const presents = await GetOthersPresents(token);

    let returnPresents: Present[] = [];
    let distinctRecipients: string[] = [];

    presents.map(present => {
      returnPresents.push({gift: present.gift, gotten: present.gotten, recipient: present.recipient});
      if (distinctRecipients.filter(recipient => present.recipient == recipient).length == 0) {
        distinctRecipients.push(present.recipient);
      }
    })

    return {
      authenticated: verified_token,
      presents: returnPresents,
      distinctRecipients: distinctRecipients
    };
  } else {
    throw redirect(302, '/login');
  }
}) satisfies PageServerLoad;

export {load, actions}
