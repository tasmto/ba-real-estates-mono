<script lang="ts">
	import IconView from '$lib/icons/IconView.svelte'
	import {
		Button,
		Heading,
		Search,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Spinner
	} from 'flowbite-svelte'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import dayjs from '$lib/dayjs'
	import IconAdd from '$lib/icons/IconAdd.svelte'
	import IconEmpty from '$lib/icons/IconEmpty.svelte'
	import IconPencil from '$lib/icons/IconPencil.svelte'
	import IconTrash from '$lib/icons/IconTrash.svelte'
	import IconVerticalDots from '$lib/icons/IconVerticalDots.svelte'
	import debounce from 'debounce'
	import { createEventDispatcher, onDestroy } from 'svelte'
	import { fade } from 'svelte/transition'
	import BusyOverlay from './BusyOverlay.svelte'

	type T = $$Generic<{ id: string; updatedAt: Date }>
	let searchValue = $page.url.searchParams.get('q') || ''
	export let busy = false
	export let title: string
	export let showDelete = true,
		showEdit = true,
		showAdd = true,
		showView = true,
		showSearch = true
	export let items: T[]
	export let columns: {
		title: string
		grow?: true
		nowrap?: true
		align?: 'center' | 'right'
		accessor: ((record: T) => string | number) | keyof T
	}[]

	const dispatch = createEventDispatcher<{
		add: never
		edit: string
		delete: string
		view: string
	}>()

	const filter = debounce(() => {
		goto(
			`${location.pathname}${
				searchValue ? `?q=${searchValue}` : ''
			}`,
			{
				keepFocus: true
			}
		).then(() => (busy = false))
	}, 300)

	onDestroy(() => filter.clear())
</script>

<article class="grid gap-4">
	<div class="flex justify-between gap-2">
		<Heading tag="h3">{title}</Heading>
		<div class="w-full flex gap-1">
			{#if showSearch}
				<Search
					bind:value={searchValue}
					on:change={() => {
						busy = true
						filter()
					}}
					size="md"
				>
					{#if busy === true}
						<Spinner />
					{/if}
				</Search>
			{/if}

			{#if showAdd}
				<Button
					class=""
					type="button"
					size="sm"
					on:click={() => dispatch('add')}
				>
					<IconAdd />
				</Button>
			{/if}
		</div>
	</div>

	<Table>
		<TableHead>
			{#each columns as { title, grow, nowrap, align } (title)}
				<TableHeadCell
					class={`
              ${nowrap ? 'nowrap' : ''} ${
						align === 'center' ? 'align-center' : ''
					} ${align === 'right' ? 'align-right' : ''} ${
						grow ? 'w-full' : ''
					}
              `}>{title}</TableHeadCell
				>
			{/each}
			<TableHeadCell class="actions">
				<IconVerticalDots />
			</TableHeadCell>
		</TableHead>
		<TableBody>
			{#if items.length}
				{#each items as item, index (item.id)}
					<TableBodyRow>
						{#each columns as { title, nowrap, align, accessor } (title)}
							<TableBodyCell>
								{typeof accessor === 'function'
									? accessor(item)
									: item[accessor]}</TableBodyCell
							>
						{/each}
						<TableBodyCell class="actions">
							{#if showView}
								<Button
									title="View"
									on:click={() => dispatch('view', item.id)}
									outline
									color="dark"
									class="!p-1"
								>
									<IconView />
								</Button>
							{/if}

							<!-- svelte-ignore a11y-click-events-have-key-events -->
							{#if showEdit}
								<Button
									title="Edit"
									on:click={() => dispatch('edit', item.id)}
									class="!p-1"
								>
									<IconPencil />
								</Button>
							{/if}

							<!-- svelte-ignore a11y-click-events-have-key-events -->
							{#if showDelete}
								<Button
									title="Delete"
									on:click={() =>
										dispatch('delete', item.id)}
									color="red"
									class="!p-1"
								>
									<IconTrash />
								</Button>
							{/if}
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			{:else}
				<TableBodyRow>
					<TableBodyCell colspan={columns.length + 3}>
						<div class="empty" in:fade>
							<div class="empty-icon">
								<IconEmpty size="5em" />
							</div>
							No items found.
						</div>
					</TableBodyCell>
				</TableBodyRow>
			{/if}
		</TableBody>
	</Table>
</article>
