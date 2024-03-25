import { TRPCError } from '@trpc/server';
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sendMail } from '../../utils/sendEmail'

export const userRouter = createTRPCRouter({
  signup: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(6),
      code: z.string().min(1),
      status: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await ctx.db.user.create({
          data: input,
        });
        sendMail(input.email, input.code)
        return res
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Email is already registered with us, please try loggin in.',

        });
      }
    }),
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Account with this email does not exist. Please sign up',
        });
      }

      if (user.password !== input.password) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Incorrect password',
        });
      }

      return user;
    }),
  verify: publicProcedure
    .input(z.object({
      email: z.string().email(),
    })).mutation(async ({ ctx, input }) => {
      try {
        const res = await ctx.db.user.update({
          where: {
            email: input.email,
          },
          data: {
            emailVerified: true,
          },
        });
        return res
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong, please try again later.',
        });
      }
    }),
  updateCategories: publicProcedure
    .input(z.object({
      email: z.string().email(),
      token: z.boolean().default(false),
      categories: z.array(z.string())
    })).mutation(async ({ ctx, input }) => {
      if (input.token) {
        const res = await ctx.db.user.update({
          where: {
            email: input.email,
          },
          data: {
            categories: input.categories,
          },
        });
        return res
      } else {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Session Invalid. Please relogin',
        });
      }
    }),

});
