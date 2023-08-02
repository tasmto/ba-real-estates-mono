import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  console.log(event.params.userId);

  return {
    employee: router.createCaller(await createContext(event)).employees.details(event.params.userId)
  };
};
