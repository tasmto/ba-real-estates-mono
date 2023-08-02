import { createContext } from '$lib/trpc/context'
import { router } from '$lib/trpc/router'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => ({
	employees: router
		.createCaller(await createContext(event))
		.employees.list(
			event.url.searchParams.get('q') || undefined
		),
	roles: router
		.createCaller(await createContext(event))
		.roles.list()
})
