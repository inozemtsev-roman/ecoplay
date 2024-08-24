import { error, json, type RequestEvent } from '@sveltejs/kit'
import { database } from '$lib/server/database'
import { getWeightedRandomItem } from '$lib/weightedRandom'
import { fishDrop } from '$lib/fishDrop'
import { giveUserItem, giveUserXp } from '$lib/server/user'

const xpReward = 2
const catchPrice = 2
const cooldown = 30_000
const waitMinTime = 15_000

export async function POST(event: RequestEvent) {
	const { t, user, initData } = event.locals

	if(user.lastTimeFished && Date.now() < user.lastTimeFished.getTime() + cooldown + waitMinTime) {
		throw error(403, {
			message: t('api.catchFish.tooFast')
		})
	}

	if(user.coins < catchPrice) {
		throw error(403, {
			message: t('api.notEnoughCoins')
		})
	}

	const itemCatched = getWeightedRandomItem(fishDrop)

	let newLevelData

	if(!itemCatched.isJunk) {
		giveUserItem(initData.user.id, itemCatched.itemId);

		newLevelData = await giveUserXp(initData.user.id, xpReward)
	}

	const lastTimeFished = new Date()

	await database.user.update({
		data: {
			coins: {
				decrement: 2
			},
			lastTimeFished
		},
		where: {
			id: event.locals.initData.user.id
		}
	})

	return json({
		...itemCatched,
		_updates: {
			coins: event.locals.user.coins - 2,
			level: newLevelData?.level,
			xp: newLevelData?.xp,
			lastTimeFished
		}
	})
}
