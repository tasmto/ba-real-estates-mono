import prisma from '$lib/prisma';
import { auth } from '$lib/trpc/middleware/auth';
import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';
import { z } from 'zod';

export const roles = t.router({
  list: t.procedure
    .use(logger)
    .use(auth)
    .input(z.string().optional())
    .query(({ input }) =>
      prisma.role.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          updatedAt: true,
          createdAt: true
        },
        orderBy: { updatedAt: 'desc' }
      })
    ),

  loadOptions: t.procedure.use(logger).query(() =>
    prisma.author
      .findMany({
        select: { id: true, firstName: true, lastName: true },
        orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }]
      })
      .then((authors) =>
        authors.map(({ id, firstName, lastName }) => ({
          label: `${firstName} ${lastName}`,
          value: id
        }))
      )
  ),

  load: t.procedure
    .use(logger)
    .use(auth) // 👈 use auth middleware
    .input(z.string())
    .query(({ input }) =>
      prisma.author.findUniqueOrThrow({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          bio: true,
          updatedAt: true,
          updatedBy: { select: { name: true } }
        },
        where: { id: input }
      })
    ),

  save: t.procedure
    .use(logger)
    .use(auth) // 👈 use auth middleware
    .input(
      z.object({
        id: z.string().nullable(),
        firstName: z.string().min(3).max(50),
        lastName: z.string().min(3).max(50),
        bio: z.string().nullable()
      })
    )
    .mutation(async ({ input: { id, ...rest }, ctx: { userId } }) => {
      if (id) {
        await prisma.author.update({
          data: { ...rest, updatedByUserId: userId },
          where: { id }
        });
      } else {
        await prisma.author.create({
          data: { ...rest, updatedByUserId: userId }
        });
      }
    }),

  delete: t.procedure
    .use(logger)
    .use(auth) // 👈 use auth middleware
    .input(z.string())
    .mutation(async ({ input: id }) => {
      await prisma.author.delete({ where: { id } });
    })
});
