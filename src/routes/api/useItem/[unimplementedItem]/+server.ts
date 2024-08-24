import { type RequestEvent, json } from '@sveltejs/kit'

export async function POST(event: RequestEvent) {
    return json({
		message: 'Unimplemented item'
	}, {
		status: 404
	})
}