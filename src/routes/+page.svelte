<script>
	import { onMount } from 'svelte';
	let downloading = true;

	onMount(download);

	async function download() {
		const response = await fetch('/test');
		const text = await response.text();
		console.log('Done', { text });
		downloading = false;
	}
</script>

{#if downloading}
	Downloading...
{:else}
	Done!
{/if}
