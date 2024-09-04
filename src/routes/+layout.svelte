<script lang="ts">
	import Header from '$lib/client/components/Header.svelte'
	import { fetchData } from '$lib/client/fetchData'
	import { activeRequests, userData } from '$lib/client/store'
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'
	import '../styles/global.scss'
	import { fade, slide } from 'svelte/transition'
	import Analytics from '$lib/analytics.svelte'

	const isOpenedFromTelegram = Boolean(window.Telegram.WebView.initParams.tgWebAppThemeParams)
	let userDataLoaded = false

	fetchData('getMe').then((data) => {
		userData.set(data)
		userDataLoaded = true
	})

	fetchData('updateProfilePhoto')

	let theme = window.Telegram.WebApp.colorScheme
	$: {
		document.body.classList.toggle('dark', theme === 'dark')
		const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background')
		window.Telegram.WebApp.setHeaderColor(backgroundColor)
	}

	window.Telegram.WebApp.onEvent('themeChanged', () => {
		theme = window.Telegram.WebApp.colorScheme
	})
</script>

{#if isOpenedFromTelegram}
	{#if !userDataLoaded}
		<div class="loader" out:slide></div>
	{/if}
	<Header />
	<main>
		<Analytics />
		<slot />
	</main>
{:else}
	<div class="error">
		<LottiePlayer src="/animations/flame/no.json" autoplay loop width={192} />

		<span>Something went wrong. Make sure you've opened this app from Telegram.</span>
	</div>
{/if}

<style lang="scss">
	.error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		height: 100vh;
		font-size: 1.5rem;
		text-align: center;
		max-width: 24rem;
		margin: 0 auto;
		text-wrap: balance;
		line-height: 1.35;
	}

	.loader {
		position: fixed;
		z-index: 100;
		left: 0;
		top: 0;
		width: 100%;
		background: url(/CL.svg);
		display: flex;
		align-items: center;
		justify-content: center;

		svg path {
			animation: loading 1s infinite;
		}
	}

	@keyframes loading {
		0% {
			fill: var(--background-secondary);
		}

		50% {
			fill: var(--background);
		}

		100% {
			fill: var(--background-secondary);
		}
	}
</style>
