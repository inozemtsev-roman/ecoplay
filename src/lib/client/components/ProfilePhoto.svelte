<script lang="ts">
	import { ripple } from '$lib/client/actions/ripple'
	import type { User } from '@prisma/client'

	export let user: User
	export let size: number | string | undefined = undefined
</script>

{#if user?.profilePhoto}
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img
		src={`data:application/octet-stream;base64,${user.profilePhoto}`}
		alt="Profile image"
		class="profile-photo"
		style:--size={size}
	/>
{:else}
	<div class="profile-photo" style:--size={size}>
		{user?.username ? user?.username[0] : 'u'}
	</div>
{/if}

<style lang="scss">
	.profile-photo {
		width: var(--size, 2rem);
		height: var(--size, 2rem);
		border-radius: 50%;
	}

	div.profile-photo {
		background-image: url(/static/icons/eco.svg);
		background-size: cover;
		background-position: center center;
		font-weight: 800;
		font-size: 1.3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: black;
		overflow: hidden;
	}
</style>
