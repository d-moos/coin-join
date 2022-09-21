<script>
	import { XCircleIcon } from '@rgossiaux/svelte-heroicons/solid';

	export let title;
	export let content;
</script>

<div class="rounded-md bg-red-50 p-4">
	<div class="flex">
		<div class="flex-shrink-0">
			<XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
		</div>
		<div class="ml-3">
			<h3 class="text-sm font-medium text-red-800">{title}</h3>
			<div class="mt-2 text-sm text-red-700">
				{content}
			</div>
		</div>
	</div>
</div>
