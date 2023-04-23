<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import HeaderNavLink from './HeaderNavLink.svelte';
  import { t } from '$lib/translations';

  export let isAuthenticated: boolean;

  const logout = async () => {
    await fetch('/logout', { method: 'POST' });
    invalidateAll();
  };
</script>

<nav class="container">
  <ul>
    <!-- <li><a href="#" class="secondary">…</a></li> -->
    <HeaderNavLink to="/employees" title={$t('employees.pageTitle')} />
    <HeaderNavLink to="/books" title="Books" />
    <HeaderNavLink to="/stores" title="Stores" />
  </ul>
  <ul>
    <li><strong>{$t('common.siteName')}</strong></li>
  </ul>
  <ul>
    {#if isAuthenticated}
      <HeaderNavLink to="/aaccount" title="Account" />
      <HeaderNavLink on:click={logout} title="Logout" />
    {:else}
      <HeaderNavLink to="/login" title="Login" />
    {/if}
    <!-- <li><a href="#" class="secondary">…</a></li> -->
  </ul>
</nav>

<style lang="scss">
  ul li {
    list-style: none;
  }
</style>
