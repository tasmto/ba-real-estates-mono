<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownDivider,
		Tooltip
	} from 'flowbite-svelte'

	export let isAuthenticated: boolean
	export let username: string

	const logout = async () => {
		await fetch('/logout', { method: 'POST' })
		invalidateAll()
	}
	let hidden = true
	let toggle = () => (hidden = !hidden)
</script>

<Navbar>
	<NavBrand href="/">
		<img
			src="https://barealestates.co.za/images/logos/ba-icon.svg"
			class="mr-3 h-6 sm:h-9"
		/>
		<span
			class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
		>
			BA Real Estates
		</span>
	</NavBrand>
	<div class="flex items-center md:order-2">
		{#if isAuthenticated}
			<Avatar
				id="avatar-menu"
				data-name={username}
				class={'cursor-pointer'}
				>{username
					.split(' ')
					.map((item) => item[0])
					.join('')}</Avatar
			>
			<Tooltip triggeredBy="[data-name]" placement="bottom"
				>{username}</Tooltip
			>
		{:else}
			<NavUl>
				<NavLi href="/login">Login</NavLi></NavUl
			>
			<NavLi href="/employees">Employees</NavLi>
		{/if}
		<NavHamburger
			on:click={toggle}
			class1="w-full md:flex md:w-auto md:order-1"
		/>
	</div>
	{#if isAuthenticated}
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm">{username}</span>
				<span class="block truncate text-sm font-medium">
					name@flowbite.com
				</span>
			</DropdownHeader>
			<DropdownItem>Dashboard</DropdownItem>
			<DropdownItem>Settings</DropdownItem>
			<DropdownItem>Earnings</DropdownItem>
			<DropdownDivider />
			<DropdownItem on:click={logout}>Sign out</DropdownItem
			>
		</Dropdown>

		<NavUl
			{hidden}
			ulClass="md:gap-3 flex flex-col p-4 mt-4 md:flex-row md:mt-0 md:text-sm md:font-medium"
		>
			<NavLi href="/employees" active={true}
				>Employees</NavLi
			>
			<NavLi href="/about">About</NavLi>
			<NavLi href="/services">Services</NavLi>
		</NavUl>{/if}
</Navbar>
