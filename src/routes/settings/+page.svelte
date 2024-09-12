<script lang="ts">
	import { goto } from '$app/navigation'
	import { localSettings, userData } from '$lib/client/store'
	import { ripple } from '$lib/client/actions'
	import Toggle from '../../lib/client/components/Toggle.svelte'
	import { clientLanguage, t, userLanguage } from '$lib/shared/localization'
	import Analytics from '$lib/analytics.svelte'

	const webApp = window.Telegram.WebApp
	webApp.BackButton.show()
	webApp.BackButton.onClick(() => goto('/'))
	webApp.MainButton.hide()
</script>

<Analytics />

<div class="block">
	<a href="/settings/username" class="cell" use:ripple>
		<div class="cell-text">
			<span class="cell-name">@{$userData.username}</span>
			<span class="cell-description">{$t('settings.username.description')}</span>
		</div>
	</a>
	<label for="contrastMode" class="cell" use:ripple>
		<div class="cell-text">
			<span class="cell-name">{$t('settings.contrast.name')}</span>
			<span class="cell-description">{$t('settings.contrast.description')}</span>
		</div>
		<Toggle id="contrastMode" bind:checked={$localSettings.contrastMode} />
	</label>
	<label for="cozyMode" class="cell" use:ripple>
		<div class="cell-text">
			<span class="cell-name">{$t('settings.cozy.name')}</span>
			<span class="cell-description">{$t('settings.cozy.description')}</span>
		</div>
		<Toggle id="cozyMode" bind:checked={$localSettings.cozyMode} />
	</label>
</div>

<div class="foot">
	{$t('home.links.built')}
	<a href="httpshttps://t.me/dao_gradosphera_verify_bot" target="_blank" style="color: #2188ff; text-decoration: none;"
		>ДАО Градосфера</a
	>
</div>

<style lang="scss">
	@import '../../styles/mixins';

	.block {
		background: var(--background);
		box-shadow: 0px 0.5px 0px 0px rgba(0, 0, 0, 0.07);
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

	.foot {
		position: relative;
		z-index: 10;
		word-wrap: break-word;
		min-width: 0;
		max-width: 100%;
		width: 100%;
		color: var(--text);
		text-align: center;
		margin: 0 0 12px;
		position: absolute;
		bottom: 20px;
	}
</style>
