<script lang="ts">
	import Header from '$lib/client/components/Header.svelte'
	import { fetchData } from '$lib/client/fetchData'
	import { activeRequests, userData } from '$lib/client/store'
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'
	import '../styles/global.scss'
	import { fade } from 'svelte/transition'

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
		<div class="loader" out:fade>
			<svg width="96" height="119" viewBox="0 0 64 79" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M64 49.9692C64 61.7846 59.0769 78.7692 32 78.7692C4.92308 78.7692 0 61.7846 0 49.9692C0 39.3846 5.88719 36.4308 6.15386 26.8308C6.30423 21.4175 4.92309 19.6923 4.92309 18.7077C4.92309 17.7231 5.4154 17.2308 6.40001 17.2308C10.5846 17.2308 16.7385 23.6308 18.7077 26.8308C28.5538 14.5231 27.0769 4.92308 27.0769 1.47692C27.0769 0.984615 27.0769 0 28.0615 0C33.9692 0 48.4923 16.9846 50.7077 31.2615C53.9077 29.2923 56.1231 24.6154 57.6 24.6154C60.1938 24.6154 64 38.1538 64 49.9692Z"/>
			</svg>
		</div>
	{/if}
	<Header />
	<main>
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
		height: var(--tg-viewport-height);
		background: var(--background);
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
