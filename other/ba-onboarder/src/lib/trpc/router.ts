import { authors } from '$lib/trpc/routes/authors';
import { books } from '$lib/trpc/routes/books';
import { stores } from '$lib/trpc/routes/stores';
import { employees } from '$lib/trpc/routes/employees';
import { t } from '$lib/trpc/t';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { roles } from '$lib/trpc/routes/roles';

export const router = t.router({
  authors,
  books,
  stores,
  employees,
  roles
});

export type Router = typeof router;

// 👇 type helpers 💡
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
