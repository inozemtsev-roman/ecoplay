import { writable } from 'svelte/store'
import type { User } from '@prisma/client'

export const activeRequests = writable<number[]>([])

export const userData = writable<User>(undefined)

interface LocalSettings {
	contrastMode: boolean,
	cozyMode: boolean
}

let localSettingsInitialValue: LocalSettings = localStorage.getItem('localSettings')
	? JSON.parse(localStorage.getItem('localSettings')!)
	: {
		contrastMode: false,
		cozyMode: false
	}

export const localSettings = writable<LocalSettings>(localSettingsInitialValue)

localSettings.subscribe((value) => {
	localStorage.setItem('localSettings', JSON.stringify(value))

	document.body.classList.toggle('contrast', value.contrastMode)
	document.body.classList.toggle('cozy', value.cozyMode)
})