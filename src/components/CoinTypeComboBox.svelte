<script>
	/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
	import { CheckIcon, ChevronUpIcon } from '@rgossiaux/svelte-heroicons/solid';
	import {
		Listbox,
		ListboxLabel,
		ListboxOption,
		ListboxOptions,
		ListboxButton
	} from '@rgossiaux/svelte-headlessui';

	import { Coin } from '@mysten/sui.js';

	function classs(...classes) {
		return classes.filter(Boolean).join(' ');
	}

	export let availableTypes = [];
	export let selectedType = undefined;
</script>

<Listbox
	as="div"
	value={selectedType}
	on:change={(ev) => {
		selectedType = ev.detail;
	}}
>
	<ListboxLabel class="block text-sm font-medium text-gray-700">Coin Type</ListboxLabel>
	<div class="relative mt-1">
		<ListboxButton as="div">
			{#if selectedType}
				<div
					contenteditable="false"
					class="cursor-default w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
				>
					{Coin.getCoinSymbol(selectedType)}
				</div>
			{:else}
				<div
					type="text"
					class="cursor-default w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
				>
					&nbsp;
				</div>
			{/if}
		</ListboxButton>
		<ListboxButton
			class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
		>
			<ChevronUpIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
		</ListboxButton>

		<!-- {#if filteredTypes.length > 0} -->
		<ListboxOptions
			class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
		>
			{#each availableTypes as coinType}
				<ListboxOption
					value={coinType}
					let:active
					let:selected
					class={({ active }) =>
						classs(
							'relative cursor-default select-none py-2 pl-3 pr-9',
							active ? 'bg-indigo-600 text-white' : 'text-gray-900'
						)}
				>
					<div class="flex items-center">
						<!-- <img src={person.imageUrl} alt="" class="h-6 w-6 flex-shrink-0 rounded-full" /> -->
						<span class={classs('ml-3 truncate', selected && 'font-semibold')}
							>{Coin.getCoinSymbol(coinType)}</span
						>
					</div>

					{#if selected}
						<span
							class={classs(
								'absolute inset-y-0 right-0 flex items-center pr-4',
								active ? 'text-white' : 'text-indigo-600'
							)}
						>
							<CheckIcon class="h-5 w-5" aria-hidden="true" />
						</span>
					{/if}
				</ListboxOption>
			{/each}
		</ListboxOptions>
		<!-- {/if} -->
	</div>
</Listbox>
