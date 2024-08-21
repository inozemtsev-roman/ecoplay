<script lang="ts">
	import { goto } from '$app/navigation'
	import Button from '$lib/client/components/Button.svelte'
	import { ripple } from '$lib/client/actions/ripple'
	import { fetchData } from '$lib/client/fetchData'
	import { clientLanguage, t, userLanguage } from '$lib/shared/localization'
	import Drawer from '$lib/client/components/Drawer.svelte'
	import { items, type Item } from '$lib/shared/items'
	import Await from '$lib/client/components/Await.svelte'
	import { fade } from 'svelte/transition'

	const webApp = window.Telegram.WebApp
	webApp.expand()
	webApp.BackButton.show()
	webApp.BackButton.onClick(() => goto('/'))
	webApp.MainButton.hide()

	let inventoryPromise = fetchData('getInventory')
	let itemSelected: Item | null = null
	let sellPageOpened: boolean = false
	let sellQuantity = 1

	$: {
		if (!sellQuantity || sellQuantity < 1) sellQuantity = 1
		sellQuantity = Math.floor(sellQuantity)
	}

	$: if(!sellPageOpened) {
		sellQuantity = 1
	}

	async function sellItem(itemId: string, quantity: number) {
		await fetchData('sellItem', { item: itemId, quantity })
		inventoryPromise = fetchData('getInventory')
	}

	async function useItem(itemId: string) {
		itemSelected = null
		await fetchData(`useItem/${itemId}`)
		inventoryPromise = fetchData('getInventory')
	}
</script>

<div class="list">
	<div class="item-list">
		<Await promise={inventoryPromise} once>
			<svelte:fragment slot="await">
				{#each Array(6) as _}
					<div class="item-skeleton" />
				{/each}
			</svelte:fragment>
			<svelte:fragment slot="then" let:then={result}>
				{#each result as item}
					<button
						class="item-card"
						use:ripple
						on:click={(e) => {
							const itemData = items.get(item.itemId)
							if (itemData) {
								itemSelected = itemData
							}
						}}
					>
						<span class="item-image">
							<img src={`/items/${item.itemId}.webp`} alt={item.id} />
							<span class="item-quantity-badge">{item.quantity}</span>
						</span>
						<span>{$t(`items.${item.itemId}.name`)}</span>
					</button>
				{/each}
				{#if itemSelected}
					<Drawer
						on:close={() => {
							itemSelected = null
							sellPageOpened = false
						}}
						isOpen={Boolean(itemSelected)}
					>
						{#if !sellPageOpened}
							<div class="item-selected-info">
								<span class="item-selected-image">
									<img src={`/items/${itemSelected.id}.webp`} alt={itemSelected.id} />
								</span>
								<h2 class="item-selected-name">{$t(`items.${itemSelected.id}.name`)}</h2>
								<p class="item-selected-description">{$t(`items.${itemSelected.id}.description`)}</p>
							</div>

							<div class="item-actions">
								{#if itemSelected.sellable}
									<Button
										on:click={() => {
											if (!itemSelected) return
											sellPageOpened = true
										}}
										variant="secondary"
									>
										{$t('inventory.sell')}
									</Button>
								{/if}
								{#if itemSelected.usable}
									<Button
										on:click={() => {
											if (!itemSelected) return
											useItem(itemSelected.id)
										}}
										variant="primary"
									>
										{$t('inventory.use')}
									</Button>
								{/if}
							</div>
						{:else}
							<h2>{$t('inventory.sellItem')}</h2>
							<div class="price-input">
								<Button square on:click={() => (sellQuantity -= 1)}>–</Button>
								<input type="number" min="1" max={255} bind:value={sellQuantity} />
								<Button square on:click={() => (sellQuantity += 1)}>+</Button>
							</div>
							<div class="item-actions">
								<Button on:click={() => sellPageOpened = false}>
									{$t('inventory.back')}
								</Button>
								<Button
									variant="primary"
									on:click={async () => {
										if (!itemSelected) return
										sellItem(itemSelected.id, sellQuantity)
										sellPageOpened = false
										itemSelected = null
									}}
								>
									{$t('inventory.sellFor')}
									{itemSelected.price * sellQuantity}
									<img src="/icons/coin.webp" width={16} alt="coins" /></Button
								>
							</div>
						{/if}
					</Drawer>
				{/if}
			</svelte:fragment>
		</Await>
	</div>
</div>

<style lang="scss">
	@import '../../styles/mixins';

	.item-list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		padding: 1rem;
		gap: 1rem;

		.item-skeleton {
			height: 8rem;
		}
	}

	.item-skeleton {
		@include skeleton;
	}

	.item-card {
		@include card;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		border: none;
	}

	.item-image {
		width: 4rem;
		height: 4rem;
		position: relative;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.item-quantity-badge {
		position: absolute;
		bottom: -0.5rem;
		right: -0.5rem;
		height: 1.5rem;
		min-width: 1.5rem;
		background: var(--text);
		border-radius: 0.75rem;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 0.375rem;
		color: var(--accent-foreground);
	}

	.item-selected-info {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100%;
		margin-bottom: 4.5rem;
		margin-top: 4rem;
		text-align: center;
	}

	.item-selected-image {
		position: relative;

		img {
			width: 8rem;
		}
	}

	.item-selected-name {
		font-size: 1.5rem;
		line-height: 1.75rem;
		margin-top: 2rem;
	}

	.item-selected-description {
		font-size: 0.875rem;
		line-height: 130%;
		margin-top: 1rem;
		color: var(--text);
	}

	.item-actions {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(0, 1fr);
		gap: 1rem;
	}

	.price-input {
		display: flex;
		gap: 1rem;
		margin: 4rem 0;

		input[type='number'] {
			border-radius: 0.5rem;
			padding: 0 0.875rem;
			border: 1px solid var(--muted);
			background: none;
			color: var(--foreground);
			font-size: 1.25rem;
			outline: none;
			width: 100%;
			flex-shrink: 1;
			transition: 0.2s;

			&:focus {
				border-color: var(--accent);
			}

			// Hide spin buttons
			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
		}
	}
</style>
