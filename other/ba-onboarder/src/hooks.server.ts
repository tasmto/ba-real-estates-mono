import { createContext } from '$lib/trpc/context'
import { router } from '$lib/trpc/router'
import type {
	Handle,
	HandleServerError
} from '@sveltejs/kit'
import { TRPCError } from '@trpc/server'
import type { ResponseMetaFn } from '@trpc/server/dist/http/internals/types'
import type { ResponseMeta } from '@trpc/server/http'
import { createTRPCHandle } from 'trpc-sveltekit'

export const handle: Handle = createTRPCHandle({
	router,
	createContext,
	onError: ({ type, path, error }) =>
		console.error(
			`Encountered error while trying to process ${type} @ ${path}:`,
			error
		),

	responseMeta: ({ ctx, paths, type, data }) => ({
		status: 202,
		'Cache-Control': `s-maxage=1, stale-while-revalidate=${202020202020202}`
	})
})

// const { status, headers } = responseMeta({
//   ctx,
//   paths,
//   type,
//   data: Array<{ error: ... } | { result: { data: ... } }>,
// });
