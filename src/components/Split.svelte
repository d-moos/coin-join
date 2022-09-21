<script>
	import {
		fetchCoinObjectRefs,
		fetchCoinObjects,
		groupBy,
		multiSplit,
		oneTimeSplit
	} from './../sdk/utils';
	import { onMount } from 'svelte';
	import CoinTypeComboBox from './CoinTypeComboBox.svelte';
	import CoinObjectComboBox from './CoinObjectComboBox.svelte';
	import SuccessBox from './SuccessBox.svelte';
	import ErrorBox from './ErrorBox.svelte';

	export let address;

	onMount(async () => {
		await loadCoinObjectRefs();
	});

	async function loadCoinObjectRefs() {
		const objectRefs = await fetchCoinObjectRefs(address);
		availableObjects = groupBy(objectRefs, 'type');
	}

	async function executeSplit() {
		errorBox.visible = false;
		successBox.visible = false;

		try {
			const receipt = isOneTime
				? await oneTimeSplit(selectedObject.id, selectedType, splitAmount)
				: await multiSplit(selectedObject.id, selectedType, splitAmount);
			if (receipt.effects.status.status === 'failure') {
				showError('Error', receipt.effects.status.error);
			} else {
				splitAmount = 0;
				selectedObject = undefined;

				successBox.visible = true;
				successBox.title = 'Successful';
				successBox.content = 'Coin has been split successfully!';
			}
		} catch (e) {
			showError('Error', e.message);
		}
		await loadCoinObjectRefs();
	}

	const showError = (title, content) => {
		errorBox.visible = true;
		errorBox.title = title;
		errorBox.content = content;
	};

	let coinObjectsAsync = [];
	let availableObjects = [];
	$: availableTypes = Object.keys(availableObjects);
	$: coinObjectsAsync = fetchCoinObjects(availableObjects[selectedType]?.map((p) => p.id) ?? []);

	let selectedType = undefined;
	let selectedObject = undefined;
	let splitAmount;
	let isOneTime = false;

	let successBox = {
		visible: false,
		title: '',
		content: ''
	};

	let errorBox = {
		visible: false,
		title: '',
		content: ''
	};
</script>

<CoinTypeComboBox {availableTypes} bind:selectedType />

<div class="mt-3">
	{#await coinObjectsAsync}
		<CoinObjectComboBox coinObjects={[]} bind:selectedObject />
	{:then coinObjects}
		<CoinObjectComboBox {coinObjects} bind:selectedObject />
	{/await}
</div>

<div class="mt-3">
	<span class="block text-sm font-medium text-gray-700">Mode</span>
	<fieldset class="mt-2">
		<div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
			<div class="flex items-center">
				<input
					id="one-time"
					bind:group={isOneTime}
					value={true}
					type="radio"
					checked
					class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
				/>
				<label for="one-time" class="ml-3 block text-sm font-medium text-gray-700">One Time</label>
			</div>

			<div class="flex items-center">
				<input
					id="multi"
					bind:group={isOneTime}
					value={false}
					type="radio"
					class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
				/>
				<label for="multi" class="ml-3 block text-sm font-medium text-gray-700">Multi Split</label>
			</div>
		</div>
	</fieldset>
</div>

<div class="mt-3">
	<label for="amount" class="block text-sm font-medium text-gray-700"> Amount </label>
	<div class="mt-1">
		<input
			bind:value={splitAmount}
			type="number"
			autocomplete="off"
			name="amount"
			id="amount"
			class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
			placeholder="0"
		/>
	</div>
</div>

<div class="mt-4 w-full">
	<button
		on:click={executeSplit}
		type="button"
		class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
	>
		Split
	</button>
</div>

<div class="mt-4">
	{#if successBox.visible}
		<SuccessBox title={successBox.title} content={successBox.content} />
	{/if}
	{#if errorBox.visible}
		<ErrorBox title={errorBox.title} content={errorBox.content} />
	{/if}
</div>
