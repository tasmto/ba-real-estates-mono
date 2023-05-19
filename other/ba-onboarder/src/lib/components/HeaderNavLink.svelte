<script lang="ts">
	import { page } from '$app/stores'
	import { createEventDispatcher } from 'svelte'

	export let to: string | undefined = undefined
	export let title: string

	const dispatch = createEventDispatcher<{ click: never }>()

	const handleClick = (e: MouseEvent) => {
		if (!to) {
			e.preventDefault()
			dispatch('click')
		}
	}
</script>

<li>
	<a
		class="py-3 px-2 hover:bg-teal-800 bg-transparent transition-colors duration-200"
		class:active={$page.url.pathname === to}
		href={to || '#'}
		on:click={handleClick}>{title}</a
	>
</li>
