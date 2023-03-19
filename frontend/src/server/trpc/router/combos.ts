import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const comboRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const combos = await ctx.prisma.combos.findMany();
    return combos;
  }),
  findById: publicProcedure
    .input(z.object({ combo_id: z.string() }))
    .query(async ({ input, ctx }) => {
      const combo = await ctx.prisma.combos.findUnique({
        where: { combo_id: input.combo_id },
      });
      return combo;
    }),
});
