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

  export let data: PageData;
  import { t } from '$lib/translations';
  import Select from '$lib/components/inputs/Select.svelte';
  import { showToast } from '$lib/utils/toasts';
  let busy = false;
  let item: RouterInputs['employees']['invite'] | null = null; // 👈 we're using a helper type
  let errors: { message: string; path: string[] }[] | null = null;
  let needsAuthorization = false;

  const handleAdd = async () => {
    if (!data.isAuthenticated) {
      needsAuthorization = true;
      return;
    }

    item = {
      name: '',
      role: '',
      email: '',
      password: '',
      managerId: '',
      jobTitle: '',
      startDate: ''
    };
  };

  const handleView = async (e: CustomEvent<string>) => {
    goto(`/employees/${e.detail}`);
  };

  const handleCancel = () => {
    item = null;
    errors = null;
  };

  const handleSave = async (e: { detail: RouterInputs['employees']['invite'] }) => {
    if (!data.isAuthenticated) {
      needsAuthorization = true;
      return;
    }

    busy = true;
    showToast('Something went wrong');
    try {
      const newUser = await trpc().employees.invite.mutate(savable(e.detail));
      item = null;
      await invalidateAll();
    } catch (err) {
      if (err instanceof TRPCClientError) {
        errors = JSON.parse(err.message);
      } else {
        throw err;
      }
    } finally {
      busy = false;
    }
  };
</script>

<svelte:head>
  <title>{$t('employees.pageTitle')} {$t('common.titleSeparator')} {$t('common.siteName')}</title>
</svelte:head>

<DataTable
  {busy}
  title={$t('employees.pageTitle')}
  items={data.employees}
  columns={[
    {
      title: 'Name',
      grow: true,
      accessor: ({ name }) => `${name}`
    },
    {
      title: 'Email',
      grow: true,
      accessor: ({ email }) => email
    },
    {
      title: 'Role',
      grow: true,
      accessor: ({ jobTitle }) => jobTitle || $t('employees.noRole')
    },
    {
      title: $t('employees.hrStatus'),
      grow: true,
      accessor: ({ signedContractsCount, contractsCount }) =>
        `${signedContractsCount}/${contractsCount}`
    }
    // { title: 'Books', align: 'right', accessor: (author) => author._count.books }
  ]}
  on:add={handleAdd}
  on:view={handleView}
  showEdit={false}
  showDelete={false}
/>

<ModalEditor {item} itemName="employee" on:cancel={handleCancel} on:save={handleSave}>
  <div class="grid">
    <TextInput name="name" label="Name" required {errors} {item} />
    <TextInput name="email" label="Personal Email" required {errors} {item} />
  </div>
  <div class="grid">
    <TextInput name="password" label="Password" required {errors} {item} />
    <TextInput name="startDate" label="Start Date" type="date" required {errors} {item} />
  </div>
  <div class="grid">
    <Select
      name="role"
      label="Role"
      required
      {errors}
      {item}
      options={data.roles.map((role) => ({
        value: role.id,
        label: role.name
      }))}
    />
    <Select
      name="managerId"
      label="Manager"
      required
      {errors}
      {item}
      options={data.employees.map((person) => ({
        value: person.id,
        label: person.name
      }))}
    />
  </div>
  <div class="grid">
    <TextInput name="jobTitle" label="Job Title" {errors} {item} />
  </div>
  <!-- <TextareaInput name="bio" label="Bio" {errors} {item} /> -->
</ModalEditor>

<AuthorizationAlert visible={needsAuthorization} on:close={() => (needsAuthorization = false)} />
