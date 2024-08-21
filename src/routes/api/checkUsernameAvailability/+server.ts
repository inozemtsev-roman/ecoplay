import { json, type RequestEvent } from '@sveltejs/kit'
import { database } from '$lib/server/database'
import { usernameSchema } from '$lib/shared/zodSchemas'

export async function POST(event: RequestEvent) {
	const body = usernameSchema.safeParse(await event.request.json())

	if(!body.success) {
		return json({
			usernameAvailable: false
		})
	}

	if(event.locals.user.username.toLowerCase() === body.data.username.toLocaleLowerCase()) {
		return json({
			usernameAvailable: true
		})
	}

	const user = await database.user.findFirst({
		where: {
			username: {
				equals: body.data.username,
				mode: 'insensitive'
			}
		}
	})

	return json({
		usernameAvailable: !user
	})
}
