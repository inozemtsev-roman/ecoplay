<script lang="ts">
	import { ripple } from '$lib/client/actions/ripple'
	import { t } from '$lib/shared/localization'
	import { userData } from '$lib/client/store'
	import { fetchData } from '../lib/client/fetchData'
	import Analytics from '$lib/analytics.svelte'

	window.Telegram.WebApp.BackButton.hide()
	window.Telegram.WebApp.MainButton.hide()

	let fishingTimeRemained: number
	let frame
	let lastTime = window.performance.now()

	function updateFishingProgress() {
		frame = requestAnimationFrame(updateFishingProgress)

		const time = window.performance.now()
		fishingTimeRemained -= time - lastTime

		lastTime = time
	}
	updateFishingProgress()

	userData.subscribe((value) => {
		fishingTimeRemained = new Date(value?.lastTimeFished ?? 0).getTime() + 30_000 - new Date().getTime()
		if (fishingTimeRemained < 0) fishingTimeRemained = 0
	})

	async function handleBonusCardClick() {
		const data = await fetchData('collectDailyBonus')
		window.Telegram.WebApp.showPopup({
			message: data.collected ? $t('home.dailyBonusMessage.collected.text') : $t('home.dailyBonusMessage.timeout.text')
		})
	}
</script>

<Analytics />

<div class="nav-card-list">
	<a class="nav-card big" href="/fishing" use:ripple>
		<img src="/icons/recycling.webp" alt="recycling" />
		{$t('home.fishing')}
		<span class="progress" style:width={`${(fishingTimeRemained / 10000) * 100}%`} />
	</a>
	<a class="nav-card small" href="/inventory" use:ripple>
		<img src="/icons/wastebasket.webp" alt="wastebasket" />
		{$t('home.inventory')}
	</a>
	<button class="nav-card small" use:ripple on:click={handleBonusCardClick}>
		<img src="/icons/wrapped.webp" alt="daily bonus" />
		{$t('home.dailyBonus')}
	</button>
	<a class="nav-card small" href="/top" use:ripple>
		<img src="/icons/trophy.webp" alt="top" />
		{$t('home.top')}
	</a>
	<a class="nav-card dao" href="https://t.me/dao_gradosphera_verify_bot" use:ripple>
		<img src="/icons/dao.webp" alt="dao" />
		{$t('home.links.dao')}
	</a>
	<a class="nav-card dao" href="/settings" use:ripple>
		<img src="/icons/gear.webp" alt="settings" />
		{$t('home.settings')}
	</a>
	<a class="nav-card tg" href={$t('home.links.telegramln')} target="_blank" use:ripple>
		<img src="/icons/telegram.webp" alt="getgems" />
		{$t('home.links.iliga')}
	</a>
	<a class="nav-card tg" href="https://t.me/dao_gradosphera_support_bot" use:ripple>
		<img src="/icons/telegram.webp" alt="getgems" />
		{$t('home.links.support')}
	</a>
	<a class="nav-card iliga" href="https://t.me/iligarubot/app" target="_blank" use:ripple />
	<a class="nav-card recyclemap" href="https://t.me/recycle_mapbot/map" target="_blank" use:ripple />
</div>

<style lang="scss">
	@import '../styles/mixins';

	.nav-card {
		@include card;

		display: flex;
		aspect-ratio: 1/1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		color: var(--foreground);
		font-size: 1rem;
		line-height: 1rem;
		grid-column: span 3;
		border: none;
		font-weight: 500;

		&.tg {
			grid-column: span 3;
			flex-direction: row;
			aspect-ratio: 3/1;
			gap: 0.5rem;
			background: #0088cc;
			color: white;
			font-size: 1rem;

			img {
				width: 1.2rem;
			}
		}

		&.dao {
			grid-column: span 3;
			flex-direction: row;
			aspect-ratio: 3/1;
			gap: 0.5rem;
			color: var(--foreground);
			font-size: 1rem;

			img {
				width: 1.9rem;
			}
		}

		&.gg {
			grid-column: span 1;
			flex-direction: row;
			aspect-ratio: 1/1;
			gap: 1rem;
			background: linear-gradient(135deg, #5cc8fa 0%, #4398f7 100%);
			color: white;
			font-size: 1rem;

			img {
				width: 1.2rem;
			}
		}

		&.gh {
			grid-column: span 1;
			flex-direction: row;
			gap: 1rem;
			aspect-ratio: 1/1;
			background: #24292f;
			color: white;
			font-size: 1rem;

			img {
				width: 1.2rem;
			}
		}

		&.big {
			grid-column: span 6;
			aspect-ratio: 3/1;
			display: flex;
			flex-direction: row;
			gap: 1rem;

			img {
				width: 4rem;
			}
		}

		&.small {
			grid-column: span 2;
			gap: 1rem;

			img {
				width: 3rem;
			}
		}

		&.iliga {
			grid-column: span 6;
			aspect-ratio: 535/146;
			gap: 1rem;
			background-image: url(/iliga_banner.png);
			background-size: 100%;

			img {
				width: 2rem;
			}
		}

		&.recyclemap {
			grid-column: span 6;
			aspect-ratio: 535/146;
			gap: 1rem;
			background-image: url(/recyclemap_banner.png);
			background-size: 100%;

			img {
				width: 2rem;
			}
		}

		&.disabled {
			opacity: 0.5;
		}

		img {
			width: 4rem;
		}
	}

	.nav-card-list {
		padding: 1rem;
		gap: 1rem;
		display: grid;
		grid-template-columns: repeat(6, 1fr);
	}

	.progress {
		position: absolute;
		bottom: 0;
		left: 0;
		background: #34b41f;
		height: 0.25rem;
		border-radius: 0.125rem;
	}
</style>
