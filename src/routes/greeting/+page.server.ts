import { VerifyJwtToken } from '$lib/server/controllers/authentication-controller';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
  const token = cookies.get('signed-token');

  if (token) {
    const verified_token = await VerifyJwtToken(token);

    return {
      authenticated: verified_token
    };
  }
}) satisfies PageServerLoad;
