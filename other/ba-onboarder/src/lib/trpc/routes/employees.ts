import { hashPassword, removePassword } from '$lib/auth';
import prisma from '$lib/prisma';
import { auth } from '$lib/trpc/middleware/auth';
import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const employees = t.router({
  list: t.procedure
    .use(logger)
    .use(auth) // 👈 use auth middleware
    .input(z.string().optional())
    .query(async ({ input }) => {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: {
            select: {
              name: true
            }
          },
          isArchived: true,
          manager: {
            select: {
              name: true,
              id: true,
              email: true
            }
          },
          jobTitle: true,
          contracts: {
            select: {
              id: true,
              isSigned: true
            }
          },

          updatedAt: true
          // _count: { select: { books: true } }
        },
        orderBy: { updatedAt: 'desc' },
        where: input
          ? {
              OR: [{ name: { contains: input } }, { email: { contains: input } }],
              AND: [{ isArchived: false }]
            }
          : {
              isArchived: false
            }
      });
      const usersWithSignedContractsCount = users.map((user) => ({
        ...user,
        signedContractsCount: user.contracts.filter((contract) => contract.isSigned).length,
        nonSignedContractsCount: user.contracts.filter((contract) => !contract.isSigned).length,
        contractsCount: user.contracts.length
      }));

      return usersWithSignedContractsCount;
    }),

  invite: t.procedure
    .use(logger)
    .use(auth)
    .input(
      z
        .object({
          businessEmail: z.string().email().toLowerCase(),
          role: z.string().cuid(),
          managerId: z.string().cuid().optional(),
          jobTitle: z.string().optional(),
          name: z.string(),
          password: z.string().min(8).max(50),
          startDate: z.string().optional(),
          personalEmail: z.string().email().toLowerCase()
        })
        .refine((input) => (input.startDate ? new Date(input.startDate) > new Date() : true), {
          message: 'Start date must be in the future',
          path: ['startDate']
        })
        .refine(
          async (input) =>
            !(await prisma.user.findFirst({
              where: { email: input.businessEmail }
            })) &&
            !(await prisma.contactInfo.findFirst({
              where: { personalEmail: input.personalEmail }
            })),
          {
            message: 'Email already exists',
            path: ['email']
          }
        )
    )
    .mutation(async ({ input }) => {
      const { email, role, managerId, jobTitle, name, password } = input;
      const scrambledPassword = await hashPassword(password);

      const user = await prisma.user.create({
        data: {
          email,
          role: {
            connect: {
              id: role
            }
          },
          manager: {
            connect: {
              id: managerId
            }
          },
          jobTitle,
          name,
          passwordHash: scrambledPassword,
          isArchived: false,
          startDate: new Date(input.startDate || new Date()),
          contactInfo: undefined
        }
      });
      return user;
    }),

  details: t.procedure
    .use(logger)
    .use(auth)
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const user = await prisma.user.findFirst({
          where: { id: input },
          include: {
            role: true,
            manager: true
          }
        });
        if (!user) throw new Error('User not found');
        return removePassword(user);
      } catch (error) {
        return new TRPCError({ code: 'NOT_FOUND' });
      }
    }),

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
