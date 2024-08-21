<script lang="ts">
	import { ripple } from '$lib/client/actions/ripple';

	export let href: string | undefined = undefined
	export let variant: 'primary' | 'secondary' | 'link' = 'secondary'
	export let size: 'small' | 'default' = 'default'
	export let disabled: boolean = false
	export let square: boolean = false
	let className = 'button'

	$: className = ['button', variant, size].join(' ')
</script>

<svelte:element
	on:click
	role="button"
	tabindex="0"
	this={href ? 'a' : 'button'}
	class={className}
	class:square
	draggable="false"
	{disabled}
	{href}
	use:ripple
>
	<slot/>
</svelte:element>

<style lang="scss">
	.button {
		height: 3rem;
		background: var(--accent);
		padding: 0 3rem;
		font-size: 14px;
		line-height: 1.4;
		font-weight: 500;
		color: white;
		border: none;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5ch;
		flex-shrink: 0;
		text-wrap: nowrap;
		--ripple-color: rgba(0, 0, 0, 0.2);

		&:disabled {
			cursor: default;
			opacity: 0.5;
			--ripple-color: transparent;
		}
	}

	// Variants

	.secondary {
		background: var(--muted);
		color: var(--foreground);
	}


	// Sizes
	
	.small {
		height: 2rem;
	}


	// Square

	.square {
		aspect-ratio: 1/1;
		padding: 0;
	}
</style>