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
			<svg
				width="95.25mm"
				height="47.625mm"
				viewBox="0 0 95.25 47.625"
				version="1.1"
				id="svg186"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:svg="http://www.w3.org/2000/svg"
			>
				<defs id="defs183">
					<rect x="-238.49207" y="56.118542" width="367.09445" height="123.88146" id="rect352" />
				</defs>
				<g id="layer1" transform="translate(6.1183991,-142.9996)">
					<text
						xml:space="preserve"
						transform="matrix(0.68816381,0,0,0.68816381,79.439094,121.62535)"
						id="text350"
						style="font-weight:bold;font-size:16px;line-height:1.25;font-family:Agenda;-inkscape-font-specification:'Agenda Bold';text-align:center;text-decoration-color:#000000;white-space:pre;shape-inside:url(#rect352);display:inline;fill:#1a1a1a;stroke-width:3.80578;stroke-linecap:round;stroke-linejoin:round;stop-color:#000000"
						><tspan x="-107.09732" y="71.294781" id="tspan522">Чистая Лига</tspan></text
					>
				</g>
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
