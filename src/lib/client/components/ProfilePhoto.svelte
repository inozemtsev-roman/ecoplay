<script lang="ts">
	import { ripple } from '$lib/client/actions/ripple';
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
	<div 
		class="profile-photo"
		style:--size={size}
	>
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
		background: var(--muted);
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text);
		overflow: hidden;
	}
</style>