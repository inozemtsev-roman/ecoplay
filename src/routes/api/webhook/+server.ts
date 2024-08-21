import { json, type RequestEvent } from '@sveltejs/kit'
import { bot } from '../../../lib/server/bot'

export async function POST(event: RequestEvent) {
	const update = await event.request.json()

	bot.eventManager.processUpdate(update)

	return json({})
}
