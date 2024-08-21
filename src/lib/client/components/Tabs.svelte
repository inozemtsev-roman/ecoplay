<script lang="ts">
	import { tick } from 'svelte'
	import { ripple } from '../actions'
	import { crossfade } from 'svelte/transition'

	interface Tab {
		title: string,
		value: string
	}

	export let tabs: Tab[]
	export let selected: string = tabs[0].value

	let indicatorOffset = 0
	let indicatorWidth = 0

	$: {
		selected
		tick().then(() => {
			const tabElement = document.querySelector('.tab.active span') as HTMLButtonElement
			const boundRect = tabElement.getBoundingClientRect()
			indicatorOffset = boundRect.left + boundRect.width / 2
			indicatorWidth = boundRect.width
			console.log(tabElement.offsetLeft)
		})
	}
</script>

<div class="tabs">
	{#each tabs as tab}
		<button
			class="tab"
			class:active={selected === tab.value}
			on:click={() => selected = tab.value}
			use:ripple
		>
			<span>{tab.title}</span>
		</button>
	{/each}
	<div class="active-indicator" style="--width: {indicatorWidth}px; --offset: {indicatorOffset}px"/>
</div>

<style lang="scss">
	.tabs {
		height: 2.75rem;
		width: 100%;
		background: var(--background);
		display: flex;
		overflow-x: scroll;
		position: relative;
		padding: 0 0.5rem;
		box-shadow: 0px 0.5px 0px 0px rgba(0, 0, 0, 0.07);
	}

	.tab {
		height: 100%;
		background: none;
		border: none;
		font-family: var(--font);
		font-size: 0.9375rem;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
		padding: 0 1.125rem;
		min-width: min-content;
		color: var(--text);
		overflow: hidden;
		border-radius: 0.5rem 0.5rem 0 0;

		&.active {
			color: var(--accent);
		}
	}

	.active-indicator {
		position: absolute;
		height: 0.25rem;
		background: var(--accent);
		bottom: 0;
		left: var(--offset);
		width: var(--width);
		border-radius: 0.25rem 0.25rem 0 0;
		transition: 0.2s;
		min-width: 2.5rem;
		translate: -50% 0;
	}
</style>