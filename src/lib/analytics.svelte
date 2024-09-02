<script lang="ts">
	import { page } from '$app/stores'

	$: {
		if (typeof gtag !== 'undefined') {
			gtag('config', 'G-EQ9VX3XVED', {
				page_title: document.title,
				page_path: $page.url.pathname
			})
		}
	}
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-EQ9VX3XVED"></script>
	<script>
		window.dataLayer = window.dataLayer || []
		function gtag() {
			dataLayer.push(arguments)
		}
		gtag('js', new Date())

		gtag('config', 'G-EQ9VX3XVED')
	</script>
</svelte:head>
