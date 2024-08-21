import { activeRequests, userData } from './store'

export async function fetchData(method: string, body?: any) {
	let requestId = Math.round(Math.random() * 100000)

	activeRequests.update((requests) => {
		return [...requests, requestId]
	})

	const res = await fetch('/api/' + method, {
		body: JSON.stringify(body),
		method: 'POST',
		headers: {
			Authorization: window.Telegram.WebApp.initData
		}
	})

	const data = await res.json()

	if(!res.ok) {
		window.Telegram.WebApp.showPopup({
			title: 'An error has occured',
			message: data.message ?? res.statusText
		})

		throw new Error(data.message)
	}

	if(data._updates) {
		userData.update((user) => ({
			...user,
			...data._updates
		}))
	}

	activeRequests.update((requests) => {
		return requests.filter((id) => id !== requestId)
	})

	return data
}