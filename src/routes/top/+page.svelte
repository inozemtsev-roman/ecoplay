<script lang="ts">
	import { fetchData } from '$lib/client/fetchData'
	import Await from '$lib/client/components/Await.svelte'
	import { userData } from '$lib/client/store'
	import { ripple } from '$lib/client/actions'
	import { goto } from '$app/navigation'
	import Tabs from '../../lib/client/components/Tabs.svelte'
	import ProfilePhoto from '../../lib/client/components/ProfilePhoto.svelte'

	const webApp = window.Telegram.WebApp
	webApp.BackButton.show()
	webApp.BackButton.onClick(() => goto('/'))
	webApp.MainButton.hide()

	let topPromise = fetchData('top')
	let selectedTop = 'level'
</script>

<div class="top">
	<Tabs
		tabs={[{
			title: 'Level',
			value: 'level'
		}, {
			title: 'Coins',
			value: 'coins'
		}, {
			title: 'Orbs',
			value: 'orbs'
		}]}
		bind:selected={selectedTop}
	/>
	
	<div class="list">
		<Await promise={topPromise} once>
			<svelte:fragment slot="await">
				{#each new Array(20) as _}
					<div class="user skeleton">
						<span class="place"/>
						<span class="profile-photo"/>
						<span class="username" style:width={Math.random() * 5 + 3 + 'rem'}/>
						<span class="stats" style:width={Math.random() + 1 + 'rem'}/>
						<div class="divider"/>
					</div>
				{/each}
			</svelte:fragment>
			<svelte:fragment slot="then" let:then={result}>
				{#each result[selectedTop] as user, i}
					<div class="user" class:self={user.username === $userData.username} use:ripple>
						<span class="place">
							{i + 1}
						</span>
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<ProfilePhoto
							{user}
						/>
						<span class="username">
							@{user.username}
						</span>
						<span class="stats">
							{#if selectedTop === 'level'}
								{user.level}
							{:else if selectedTop === 'coins'}
								{user.coins} <img src="/icons/coin.webp" width={16} alt="coins"/>
							{:else if selectedTop === 'orbs'}
								{user.orbs} <img src="/icons/orb.webp" width={16} alt="orbs"/>
							{/if}
						</span>
						<div class="divider"/>
					</div>
				{/each}
			</svelte:fragment>
		</Await>
	</div>
</div>

<style lang="scss">
	@import '../../styles/mixins';

	.top {
		box-shadow: 0px 0.5px 0px 0px rgba(0, 0, 0, 0.07);
		background: var(--background);
		margin-bottom: 1rem;
	}

	.skeleton {
		.place,
		.profile-photo,
		.username,
		.stats {
			animation: skeleton 1s infinite;
		}

		.username, .stats {
			height: 1.5rem;
			border-radius: 0.25rem;
		}

		.profile-photo {
			width: 2rem;
			height: 2rem;
			border-radius: 50%;
		}
	}

	.user {
		width: 100%;
		height: 3.5rem;
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;

		&.self {
			color: var(--accent);
			--ripple-color: color-mix(in srgb, var(--accent) 15%, transparent);

			.place {
				color: var(--accent);
			}
		}

		&:last-child .divider {
			display: none;
		}


		&:nth-child(1) .place {
			background: rgb(240, 197, 90);
			border: 1px solid rgba(0, 0, 0, 0.05);
			color: white;
		}

		&:nth-child(2) .place {
			background: #9ea8b6;
			border: 1px solid rgba(0, 0, 0, 0.05);
			color: white;
		}

		&:nth-child(3) .place {
			background: #df8a49;
			border: 1px solid rgba(0, 0, 0, 0.05);
			color: white;
		}
	}

	.place {
		font-size: 1rem;
		font-weight: 400;
		font-size: 0.875rem;
		width: 1.5rem;
		height: 1.5rem;
		color: var(--text);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.username {
		font-weight: 400;
		margin-left: -0.25rem;
	}

	.stats {
		font-size: 1.125rem;
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.divider {
		position: absolute;
		bottom: 0;
		left: 1rem;
		right: 0;
		height: 1px;
		background: var(--border-color);
	}
</style>
