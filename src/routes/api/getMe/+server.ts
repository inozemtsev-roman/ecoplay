import { error, json, type RequestEvent } from '@sveltejs/kit'
import { database } from '$lib/server/database'

export async function POST(event: RequestEvent) {
	const user = await database.user.findUnique({
		where: {
			id: event.locals.initData.user.id
		}, 
		select: {
			username: true,
			coins: true,
			orbs: true,
			level: true,
			xp: true,
			lastTimeFished: true,
			profilePhoto: true
		}
	})

	return json(user)
}
