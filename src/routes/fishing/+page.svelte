<script lang="ts">
	import { goto } from '$app/navigation'
	import Button from '$lib/client/components/Button.svelte'
	import { fetchData } from '$lib/client/fetchData'
	import type { FishDrop } from '$lib/fishDrop'
	import { fly } from 'svelte/transition'
	import { flyIntoInventory } from '$lib/client/transitions'
	import { userData } from '$lib/client/store'
	import type { User } from '@prisma/client'
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'

	const webApp = window.Telegram.WebApp

	webApp.expand()
	webApp.BackButton.show()
	webApp.BackButton.onClick(() => goto('/'))
	webApp.MainButton.hide()

	let currentDrop: FishDrop | null = null

	let myData: User | undefined = undefined
	let fishingState: 'timeout' | 'idle' | 'waiting' | 'biting' | 'caught' | 'missed' = 'timeout'
	let timeout: NodeJS.Timeout
	let catchButtonPressed = false

	$: if (myData) {
		console.log(myData)
		const timeUntilCanFish = new Date(myData.lastTimeFished ?? 0).getTime() + 30_000 - new Date().getTime()
		setTimeout(
			() => {
				fishingState = 'idle'
			},
			timeUntilCanFish > 0 ? timeUntilCanFish : 0
		)
	}

	function caughtItemTransition(node: HTMLElement) {
		if (currentDrop?.isJunk) {
			return fly(node, { y: 64 })
		}
		return flyIntoInventory(node, { duration: 750 })
	}

	userData.subscribe((data) => {
		if (!data) return
		myData = data
	})
</script>

{#if fishingState === 'caught' && currentDrop}
	<button
		on:click={() => {
			fishingState = 'timeout'
			clearTimeout(timeout)
		}}
		class="drop"
		in:fly={{ y: -32 }}
		out:caughtItemTransition
	>
		{#if !currentDrop?.isJunk}
			<img class="shine" src="shine.webp" alt="" />
		{/if}
		<img src={`items/${currentDrop.itemId}.webp`} alt={currentDrop.itemId} width="160" loading="lazy" />
	</button>
{/if}

{#if fishingState === 'idle'}
	<div class="fishing-action">
		<Button
			variant="secondary"
			on:click={() => {
				fishingState = 'waiting'
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					fishingState = 'biting'

					timeout = setTimeout(() => {
						fishingState = 'missed'

						timeout = setTimeout(() => {
							fishingState = 'timeout'

							timeout = setTimeout(() => {
								fishingState = 'idle'
							}, 30_000)
						}, 5_000)
					}, 5_000)
				}, 15_000 + Math.random() * 30_000)
			}}
		>
			Закинуть удочку
		</Button>
	</div>
{:else if fishingState === 'biting'}
	<div class="fishing-action">
		<Button
			variant="primary"
			disabled={catchButtonPressed}
			on:click={async () => {
				catchButtonPressed = true
				currentDrop = await fetchData('catchFish')
				fishingState = 'caught'
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					fishingState = 'timeout'
					catchButtonPressed = false
					timeout = setTimeout(() => {
						fishingState = 'idle'
					}, 30_000)
				}, 5_000)
			}}
		>
			Поймать
		</Button>
	</div>
{:else if fishingState === 'timeout'}
	<div class="animation">
		<LottiePlayer src="/animations/hourglass.json" loop autoplay width={192} />
	</div>
	<div class="fishing-action">Рыбы немного испугались, ждём, когда приплывут назад</div>
{:else if fishingState === 'waiting'}
	<div class="animation">
		<LottiePlayer src="/animations/hourglass.json" loop autoplay width={192} />
	</div>
	<div class="fishing-action">Ждём, когда клюнет</div>
{:else if fishingState === 'missed'}
	<div class="animation">
		<LottiePlayer src="/animations/rainCloud.json" loop autoplay width={192} />
	</div>
	<div class="fishing-action">Рыба сбежала</div>
{/if}

<style lang="scss">
	.drop {
		position: absolute;
		right: 50%;
		top: 50%;
		translate: 50% -50%;
		transition: none;
		background: none;
		border: none;
		transition: 0.5s ease-in;
	}

	.fishing-action {
		position: absolute;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		left: 0;
		bottom: 0;
		align-items: stretch;
		justify-content: center;
		text-align: center;
	}

	.animation {
		position: absolute;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
	}

	.shine {
		position: absolute;
		left: calc(50% - 8rem);
		top: calc(50% - 8rem);
		z-index: -1;
		animation: rotate 8s linear infinite;
	}

	@keyframes rotate {
		from {
			rotate: 0deg;
		}
		to {
			rotate: 360deg;
		}
	}
</style>
