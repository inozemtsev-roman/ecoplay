<script lang="ts">
	export let promise: Promise<unknown>
	export let once: boolean = false

	const firstPromise = promise
	let pending: boolean
	let result: any

	$: updateResult(promise)

	async function updateResult(promise: Promise<unknown>) {
		pending = true
		result = await promise
		pending = false
	}
</script>

{#await once ? firstPromise : promise}
	<slot name="await"/>
{:then} 
	<slot name="then" then={result} {pending}/>
{:catch error}
	<slot name="error" {error}/>
{/await}

