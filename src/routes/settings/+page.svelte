<script lang="ts">
	import { goto } from '$app/navigation'
	import { localSettings, userData } from '$lib/client/store'
	import { ripple } from '$lib/client/actions'
	import Toggle from '../../lib/client/components/Toggle.svelte'

	const webApp = window.Telegram.WebApp
	webApp.BackButton.show()
	webApp.BackButton.onClick(() => goto('/'))
	webApp.MainButton.hide()
</script>

<div class="block">
	<a href="/settings/username" class="cell" use:ripple>
		<div class="cell-text">
			<span class="cell-name">@{$userData.username}</span>
			<span class="cell-description">Username</span>
		</div>
	</a>
	<label for="contrastMode" class="cell" use:ripple>
		<div class="cell-text">
			<span class="cell-name">Contrast mode</span>
			<span class="cell-description">Enable borders to increase visibility</span>
		</div>
		<Toggle id="contrastMode" bind:checked={$localSettings.contrastMode}/>
	</label>
	<label for="cozyMode" class="cell" use:ripple>
		<div class="cell-text">
			<span class="cell-name">Cozy mode</span>
			<span class="cell-description">Enable forest background</span>
		</div>
		<Toggle id="cozyMode" bind:checked={$localSettings.cozyMode}/>
	</label>
</div>

<style lang="scss">
	@import '../../styles/mixins';

	.block {
		background: var(--background);
		box-shadow:0px 0.5px 0px 0px rgba(0, 0, 0, 0.07);
	}

	.cell {
		height: 4rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1.25rem;
		text-decoration: none;
	}

	.cell-text {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;

		.cell-name {
			font-size: 0.9375rem;
			color: var(--foreground);
		}

		.cell-description {
			font-size: 0.75rem;
			color: var(--text);
		}
	}
</style>