<script>
	import Split from './Split.svelte';
	import { wallet } from './../stores/wallet';
</script>

{#await $wallet.getAccounts()}
	loading accounts
{:then accounts}
	<Split address={accounts[0]} />
{/await}
