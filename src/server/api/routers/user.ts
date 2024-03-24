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
});
