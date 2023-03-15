import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const debateRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const debates = await ctx.prisma.debates.findMany();
    return debates;
  }),
  findById: publicProcedure
    .input(z.object({ debateid: z.string() }))
    .query(async ({ ctx, input }) => {
      const debate = await ctx.prisma.debates.findUnique({
        where: { debateid: input.debateid },
      });
      return debate;
    }),
  openDebate: publicProcedure
    .input(
      z.object({ title: z.string(), topic: z.string(), user_id: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      const debates = await ctx.prisma.debates.create({
        data: {
          debateid: undefined,
          title: input.title,
          topic: input.topic,
          host: { connect: { uuid: input.user_id } },
        },
      });
      return debates;
    }),
});