import { error, type Handle, type HandleFetch } from '@sveltejs/kit'
import cryptoEs from 'crypto-es'
import { database } from './lib/server/database'
import { getT } from './lib/shared/localization'
import { TELEGRAM_BOT_TOKEN } from '$env/static/private'

export const handle: Handle = async ({ event, resolve }) => {
	if(
		event.url.pathname.startsWith('/api')
		&& !event.url.pathname.endsWith('webhook')
	) {
		const paramsRaw = event.request.headers.get('Authorization')
		
		if(!paramsRaw) {
			throw error(403)
		}

		const params = new URLSearchParams(paramsRaw)
		const hash = params.get('hash')
		params.delete('hash')

		const v = Array.from(params.entries())
		v.sort(([keyA], [keyB]) => keyA.localeCompare(keyB))

		const dataCheckString = v.map(([k, v]) => `${k}=${v}`).join('\n')
		const secretKey = cryptoEs.HmacSHA256(TELEGRAM_BOT_TOKEN, 'WebAppData')
		const key = cryptoEs.HmacSHA256(dataCheckString, secretKey).toString(cryptoEs.enc.Hex)

		const isValid = key === hash

		if(!isValid) {
			throw error(401, {
				message: 'Couldn\'t validate your init data. Make sure you\'ve sent this request from Telegram Mini App.'
			})
		}

		const initDataRaw = Object.fromEntries(params)
		const initDataUserRaw = JSON.parse(initDataRaw.user)
		const initData = {
			user: {
				id: initDataUserRaw.id,
				firstName: initDataUserRaw.first_name,
				lastName: initDataUserRaw.last_name,
				username: initDataUserRaw.username,
				languageCode: initDataUserRaw.language_code,
				isPremium: initDataUserRaw.is_premium,
				allowsWriteToPM: initDataUserRaw.allows_write_to_pm
			},
			chatInstance: Number(initDataRaw.chat_instance),
			chatType: initDataRaw.chat_type,
			authDate: Number(initDataRaw.auth_date)
		}

		const user = await database.user.upsert({
			where: {
				id: initData.user.id
			},
			update: {},
			create: {
				id: initData.user.id,
				username: initData.user.username ?? `user${initData.user.id}`
			},
			include: {
				inventoryItems: true
			}
		})

		event.locals.initData = initData
		event.locals.user = user
		event.locals.t = getT(initData.user.languageCode)
	}

	const response = await resolve(event)
	return response
}