import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

const categoriesPerPage = 6;

export const categoryRouter = createTRPCRouter({
    fetch: publicProcedure.input(z.object({
        page: z.number()
    })
    ).query(async ({ input, ctx }) => {
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
    })
})
