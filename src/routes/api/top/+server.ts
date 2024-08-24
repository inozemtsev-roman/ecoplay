import { error, json, type RequestEvent } from '@sveltejs/kit'
import { database } from '$lib/server/database'
import type { Prisma } from '@prisma/client'

export async function POST(event: RequestEvent) {
	const [levelTop, coinsTop, orbsTop] = await Promise.all([
		getTopByFilter([{
			level: 'desc'
		}, {
			xp: 'desc'
		}]),
		getTopByFilter({ coins: 'desc' }),
		getTopByFilter({ orbs: 'desc' })
	])

	return json({
		level: levelTop,
		coins: coinsTop,
		orbs: orbsTop
	})
}

async function getTopByFilter(orderBy: Prisma.UserFindManyArgs['orderBy']) {
	return await database.user.findMany({
		orderBy,
		take: 20,
		select: {
			username: true,
			level: true,
			xp: true,
			coins: true,
			orbs: true,
			profilePhoto: true
		}
	})
}