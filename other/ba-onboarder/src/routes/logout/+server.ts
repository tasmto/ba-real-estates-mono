import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = ({ cookies }) => {
	cookies.delete('jwt', { path: '/', secure: false })
	throw redirect(307, '/login')
}
