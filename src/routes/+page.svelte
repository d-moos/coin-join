<script>
	import Box from '../components/Box.svelte';
	import WalletConnect from '../components/WalletConnect.svelte';

	import { connected } from './../stores/wallet';
</script>

<!-- <DevTool /> -->

<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
			{#if $connected}
				<Box />
			{:else}
				<WalletConnect />
			{/if}
		</div>
	</div>
</div>
