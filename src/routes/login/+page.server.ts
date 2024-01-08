import { AuthenticateUser, VerifyJwtToken } from "$lib/server/controllers/authentication-controller";
import { redirect, type Actions, type RequestEvent } from "@sveltejs/kit";

export const actions: Actions = {
  AuthenticateUser: async (event: RequestEvent) => {
    let formdata = await event.request.formData();
    let codename: string | undefined = formdata.get('codename')?.toString();
    if (codename !== undefined) {
      let possible_jwt_token = await AuthenticateUser(codename);
      if (possible_jwt_token !== undefined) {
        event.cookies.set('signed-token', possible_jwt_token, {path: "/", httpOnly: true} );
        throw redirect(302, '/greeting');
      }
    }
  },
  VerifyAuthentication: async (event: RequestEvent) => {
    let userJwtToken: string | undefined = event.cookies.get('signed-token') ?? undefined;
    if (userJwtToken === undefined) {
      // user is not authenticated
      return false;
    }
    await VerifyJwtToken(userJwtToken);
    // user is authenticated
  },
  Logout: async (event: RequestEvent) => {
    event.cookies.delete('signed-token', {path: "/", httpOnly: true});
  }
}
