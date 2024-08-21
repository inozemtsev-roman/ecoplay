<script lang="ts">
	import { goto } from '$app/navigation'
	import { userData } from '$lib/client/store'
	import Await from '$lib/client/components/Await.svelte'
	import { fetchData } from '$lib/client/fetchData'
	import { usernameSchema } from '$lib/shared/zodSchemas'
	import { onMount } from 'svelte'

	let usernameValue: string = $userData?.username
	let availabilityPromise: Promise<boolean| null>

	$: usernameParsedSchema = usernameSchema.safeParse({ username: usernameValue })

	$: (async () => {
		const available = await availabilityPromise
		if (
			usernameValue !== $userData?.username &&
			usernameParsedSchema.success &&
			available
		) {
			console.log(usernameValue, $userData?.username)
			webApp.MainButton.show()
		} else {
			webApp.MainButton.hide()
		}
	})()

	const webApp = window.Telegram.WebApp
	webApp.BackButton.show()
	webApp.BackButton.onClick(() => goto('./'))
	webApp.MainButton.hide()
	webApp.MainButton.setText('Change username')
	webApp.MainButton.color = getComputedStyle(document.documentElement)
		.getPropertyValue('--success')
	webApp.MainButton.onClick(async () => {
		await fetchData('changeUsername', {
			username: usernameValue
		})
		goto('./')
		$userData.username = usernameValue
	})

	async function checkUsernameAvailability(e: Event & {
		currentTarget: EventTarget & HTMLInputElement;
	}) {
		const res = await fetchData('checkUsernameAvailability', {
			username: e.currentTarget.value
		})

		return res.usernameAvailable
	}
</script>

<div class="block">
	<span class="block-header">Set username</span>
	<label class="input-wrapper">
		@
		<input placeholder="username" class="text-input" on:input={(e) => {
			if(!usernameSchema.safeParse({username: e.currentTarget.value }).success) return

			availabilityPromise = checkUsernameAvailability(e)
		}} bind:value={usernameValue}/>
	</label>
</div>
{#if !usernameParsedSchema.success}
	<p class="hint error">{usernameParsedSchema.error.errors.map(issue => issue.message).join('\n')}</p>
{:else if usernameValue !== $userData?.username}
	<Await promise={availabilityPromise}>
		<span class="hint" slot="await">
			Checking username...
		</span>
		<svelte:fragment slot="then" let:then={available}>
			{#if available === true}
				<p class="hint success">@{usernameValue} is available.</p>
			{:else if available === false}
				<p class="hint error">@{usernameValue} is already taken.</p>
			{/if}
		</svelte:fragment>
	</Await>
{/if}
<p class="hint">You can choose your username on Campfire or use your Telegram one. 	You can use a-z, 0-9 and underscores. Minimum length is 5 characters.</p>

<style lang="scss">
	@import '../../../styles/mixins';

	.block {
		background: var(--background);
		box-shadow:0px 0.5px 0px 0px rgba(0, 0, 0, 0.07);
		display: flex;
		flex-direction: column;
		padding: 1.25rem 1.25rem 1rem;
		gap: 0.5rem;
	}

	.block-header {
		color: var(--accent);
		font-weight: 500;
		font-size: 0.9375rem;
		line-height: 1.125rem;
		padding: 0 0 0.5rem;
	}

	.input-wrapper {
		display: flex;
		align-items: center;
		font-size: 1.0625rem;
		line-height: 120%;
	}

	.text-input {
		background: none;
		border: none;
		letter-spacing: -1%;
		color: var(--foreground);
		outline: none;
		font-size: 1.0625rem;
		line-height: 120%;
		font-weight: 400;
		padding: 0;
	}

	.hint {
		color: var(--text);
		font-size: 0.9375rem;
		padding: 0 1rem;

		&.success {
			color: var(--success);
		}

		&.error {
			color: var(--danger);
		}
	}
</style>