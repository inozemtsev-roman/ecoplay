<script lang="ts">
	import { page } from '$app/stores'

	$: {
		if (typeof gtag !== 'undefined') {
			gtag('config', 'G-NCVKVBX7X5', {
				page_title: document.title,
				page_path: $page.url.pathname
			})
		}
	}
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-NCVKVBX7X5"></script>
	<script>
		window.dataLayer = window.dataLayer || []
		function gtag() {
			dataLayer.push(arguments)
		}
		gtag('js', new Date())

		gtag('config', 'G-NCVKVBX7X5')
	</script>
</svelte:head>
