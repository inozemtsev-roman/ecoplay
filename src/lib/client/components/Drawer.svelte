<script lang="ts">
	export let isOpen: boolean

	let dialog: HTMLDialogElement
	let isBeingClosed: boolean = false

	$: if (dialog && isOpen) {
		window.Telegram.WebApp.expand()
		dialog.showModal()
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="drawer"
	class:closed={isBeingClosed}
	bind:this={dialog}
	on:close
	on:close={() => {
		isOpen = false
	}}
	on:click|self={() => {
		isBeingClosed = true
		dialog.addEventListener('animationend', () => {
			isBeingClosed = false
			dialog.close()
		}, {
			once: true
		})
	}}
>
<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="content" on:click|stopPropagation>
		<slot />
	</div>
</dialog>

<style lang="scss">
	.drawer {
		min-height: 16rem;
		background: var(--background);
		width: 100%;
		max-width: initial;
		max-height: 32rem;
		bottom: 0;
		right: 10px;
		border-radius: 1rem 1rem 0 0;
		border: none;
		top: initial;
		padding: initial;
		flex-direction: column;
		color: inherit;

		&::backdrop {
			background: rgba(0, 0, 0, 0.33);
			backdrop-filter: grayscale(0.25) blur(2px);
		}

		&[open] {
			animation: drawer-in 0.5s;

			&::backdrop {
				animation: backdropin 0.5s;
			}
		}

		&.closed {
			animation: drawer-exit 0.5s;

			&::backdrop {
				animation: backdrop-exit 0.5s;
			}
		}
 	}

	@keyframes drawer-in {
		from {
			translate: 0 100%;
		}

		to {
			translate: 0 0;
		}
	}

	@keyframes drawer-exit {
		from {
			translate: 0 0;
		}

		to {
			translate: 0 100%;
		}
	}

	@keyframes backdrop-in {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes backdrop-exit {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}

	.content {
		width: 100%;
		height: 100%;
		padding: 1rem;
	}
</style>