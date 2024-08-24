import { Client, InlineKeyboardButton, InlineKeyboardMarkup } from 'telescript'

export const bot = new Client({
	token: process.env.TELEGRAM_BOT_TOKEN
})

export async function getUserProfilePhoto(userId: number) {
	const { photos } = await bot.getUserProfilePhotos(userId, { limit: 1 })
	if (!photos.length) return ''
	const photo = photos[0][0]
	const file = await bot.getFile(photo.fileId)

	const res = await fetch(`https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.filePath}`)
	const blob = await res.blob()
	const buffer = await Buffer.from(await blob.arrayBuffer())

	return buffer.toString('base64')
}

bot.on('message', async (message) => {
	if (message.text?.startsWith('/start')) {
		await message.chat.sendSticker('CAACAgIAAxkBAAIGB2VG4pG-t0yX8PvBtOQTXPH-pl0nAAJCEAACM8UpSZAO1BGnKkqCMwQ')
		await message.chat.sendMessage('Hi!', {
			replyMarkup: new InlineKeyboardMarkup().setKeyboard([
				[
					new InlineKeyboardButton({
						text: 'Launch Campfire',
						webApp: {
							url: 'https://campfire.sadzep.me/'
						}
					})
				]
			])
		})
	}
	if (message.text?.startsWith('/setup')) {
		await message.chat.sendSticker('CAACAgIAAxkBAAIGB2VG4pG-t0yX8PvBtOQTXPH-pl0nAAJCEAACM8UpSZAO1BGnKkqCMwQ')
		await message.chat.sendMessage('Hi!', {
			replyMarkup: new InlineKeyboardMarkup().setKeyboard([
				[
					new InlineKeyboardButton({
						text: 'Launch Scanner',
						webApp: {
							url: 'https://scanner.mir.one/'
						}
					})
				]
			])
		})
	}
})
