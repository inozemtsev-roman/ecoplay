import { writable, derived, type Stores } from 'svelte/store'
import enLocales from '../../locales/en.json'
import ruLocales from '../../locales/ru.json'

export type tFunction = (key: string, parameters?: Record<string, unknown>) => string

export const userLanguage = typeof window !== 'undefined'
	? window?.Telegram.WebApp.initDataUnsafe.user.language_code
	: undefined

export const clientLanguage = writable(userLanguage ?? 'en')

export function getT(language: string): tFunction {
	return (key: string, parameters: Record<string, unknown> = {}) => {
		const locales: any = language === 'en' ? enLocales : ruLocales

		let stringPath = key.split('.')

		let resultString = locales

		for (let stringKey of stringPath) {
			// If there's no string found return key as a fallback
			if (!resultString[stringKey]) {
				return key
			}
			resultString = resultString[stringKey]
		}

		if (typeof resultString !== 'string') {
			return key
		}

		resultString = resultString.replace(new RegExp('{{.*?}}', 'g'), (match) => {
			const paramKey = match.substring(2, match.length - 2)
			return parameters[paramKey]?.toString() ?? `{{${paramKey}}}`
		})

		return resultString
	}
}

export const t = derived(clientLanguage, (language) => getT(language))
