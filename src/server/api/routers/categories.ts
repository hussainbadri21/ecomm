import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from '@trpc/server';

const categoriesPerPage = 6;

export const categoryRouter = createTRPCRouter({
    fetch: publicProcedure.input(z.object({
        page: z.number(),
        token: z.boolean().default(false),
    })
    ).query(async ({ input, ctx }) => {
        if (input.token) {
            const res = await
                ctx.db.$transaction([
                    ctx.db.categories.count(),
                    ctx.db.categories.findMany({
                        take: categoriesPerPage,
                        skip: (input.page - 1) * categoriesPerPage,
                        where: {
                            status: 1,
                        },
                    })
                ]);
            return res
        } else {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Session Invalid. Please relogin',
            });
        }

    })
})
