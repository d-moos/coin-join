<script>
	import { CheckCircleIcon } from '@rgossiaux/svelte-heroicons/solid';

	export let title;
	export let content;
</script>

<div class="rounded-md bg-green-50 p-4">
	<div class="flex">
		<div class="flex-shrink-0">
			<CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
		</div>
		<div class="ml-3">
			<h3 class="text-sm font-medium text-green-800">{title}</h3>
			<div class="mt-2 text-sm text-green-700">
				<p>
					{content}
				</p>
			</div>
		</div>
	</div>
</div>
