<script lang="ts">
	import Header from './../lib/components/Header.svelte'
	import '../app.postcss'
	import Footer from '$lib/components/Footer.svelte'
	// import '@picocss/pico';
	import type { LayoutData } from './$types'
	import {
		locale,
		loadTranslations
	} from '$lib/translations'
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import '../lib/css/app.css'

	/** @type {import('./$types').LayoutServerLoad} */
	export const load = async ({ url }: any) => {
		const { pathname } = url

		const defaultLocale = 'en' // get from cookie, user session, ...

		const initLocale = locale.get() || defaultLocale // set default if no locale already set

		await loadTranslations(initLocale, pathname) // keep this just before the `return`

		return {}
	}

	const options = {
		position: 'bottom-right',
		duration: 3000,
		closeable: true,
		pauseOnHover: true,
		pauseOnFocusLoss: true,
		pauseOnRouteChange: true,
		draggable: true,
		draggablePercent: 0.6,
		showCloseButtonOnHover: false,
		hideProgressBar: false,
		closeButton: 'button',
		icon: true,
		rtl: false
	}

	export let data: LayoutData
</script>

<svelte:head>
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1"
	/>
	<link
		rel="preconnect"
		href="https://fonts.googleapis.com"
	/>
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant:wght@500&amp;display=swap&amp;text=BOOKSTALFNTYVE"
		rel="stylesheet"
	/>
</svelte:head>

<Header
	isAuthenticated={data.isAuthenticated}
	username={data.userName}
/>

<sveltetoast {options} />

<main class="max-w-5xl m-auto">
	<slot />
</main>
<footer />

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap');

	:global(html) {
		background-color: theme(colors.slate.900);
		color: theme(colors.slate.100);
		font-family: 'Manrope', sans-serif;
	}

	/* :global {
    body > div {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    ul,
    ol {
      list-style: none !important;
    }

    dialog,
    form {
      > article {
        width: 100%;
        border: 1px solid var(--muted-border-color);
        > header {
          margin-bottom: 0.5em;
          padding-top: 0.75em;
          padding-bottom: 0.75em;
          font-size: 1.25rem;
          font-weight: 500;
          border-bottom: 1px solid var(--muted-border-color);
          .close {
            margin-top: 0.5em;
          }
        }
        > footer {
          display: flex;
          gap: 1em;
          justify-content: center;
          margin-top: 1em;
          padding-top: 1em;
          padding-bottom: 1em;
          border-top: 1px solid var(--muted-border-color);
          > button {
            display: inline-block;
            margin-bottom: 0;
            max-width: 160px;
          }
        }
      }
    }
  } */
</style>
