import { error, json, type RequestEvent } from '@sveltejs/kit'
import { database } from '$lib/server/database'
import { getUserProfilePhoto } from '$lib/server/bot'

export async function POST(event: RequestEvent) {
	const profilePhoto = await getUserProfilePhoto(event.locals.initData.user.id)

	await database.user.update({
		where: {
			id: event.locals.initData.user.id
		},
		data: {
			profilePhoto
		}
	})

	return json({
		profilePhoto
	}, {
		status: 200
	})
}
