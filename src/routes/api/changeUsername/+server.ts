import { error, json, type RequestEvent } from '@sveltejs/kit'
import { database } from '$lib/server/database'
import { usernameSchema } from '$lib/shared/zodSchemas'

export async function POST(event: RequestEvent) {
	const { t, initData } = event.locals
	const body = usernameSchema.safeParse(await event.request.json())

	if(!body.success) {
		throw error(403, {
			message: t('api.changeUsername.invalid')
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

	if (user) {
		throw error(403, {
			message: t('api.changeUsername.taken')
		})
	}

	await database.user.update({
		where: {
			id: initData.user.id
		},
		data: {
			username: body.data.username
		}
	})

	return json({
		username: body.data.username
	})
}
