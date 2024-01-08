import type { PageServerLoad } from "./login/$types";

export const load: PageServerLoad = async ({ request, locals, cookies }) => {
  const jwt_token = cookies.get("signed-token");
};
