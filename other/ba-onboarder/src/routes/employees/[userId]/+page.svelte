<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import AuthorizationAlert from '$lib/components/AuthorizationAlert.svelte';
  import DataTable from '$lib/components/DataTable.svelte';
  import TextareaInput from '$lib/components/inputs/TextareaInput.svelte';
  import TextInput from '$lib/components/inputs/TextInput.svelte';
  import ModalEditor from '$lib/components/ModalEditor.svelte';
  import { savable } from '$lib/savable';
  import { trpc } from '$lib/trpc/client';
  import type { RouterInputs } from '$lib/trpc/router';
  import { TRPCClientError } from '@trpc/client';
  import type { PageData } from './$types';
  import { goto } from '$app/navigation';
  import { showToast } from '$lib/utils/toasts';
  import { t } from '$lib/translations';
  export let data: PageData;

  if (!data.isAuthenticated) {
    showToast('You need to be logged in to view this page', 'error');
    goto('/login');
  }
  if (data.employee instanceof TRPCClientError) {
    showToast('User not found', 'error');
    goto('/employees');
  }
  const employee = data.employee;
</script>

<div class="grid">
  <div>
    <h2>{data.employee.name}</h2>
    <table>
      <thead>
        <tr>
          <th scope="col">Column </th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{$t('employee.name')}</td>
          <td>{employee.name}</td>
        </tr>
        <tr>
          <td>{$t('employee.email')}</td>
          <td>{employee.name}</td>
        </tr>
        <tr>
          <td>{$t('employee.name')}</td>
          <td>{employee.name}</td>
        </tr>
        <tr>
          <td>{$t('employee.name')}</td>
          <td>{employee.name}</td>
        </tr>
        <tr>
          <td>{$t('employee.name')}</td>
          <td>{employee.name}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <article>{JSON.stringify(employee, null, 2)}</article>
</div>

<style>
  h2 {
    margin-bottom: 0.5rem;
  }
</style>
