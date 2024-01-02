import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("GameStats", {
    fields: t => ({
        id: t.exposeID("id"),
        playerId: t.exposeString("playerId"),
        player: t.relation("player"),
        gameId: t.exposeString('gameId'),
        game: t.relation("game")
    })
});

builder.queryField("gameStats", (t) =>
  t.prismaField({
    type: ["GameStats"],
    resolve: async (query, root, args, ctx, info) => {
      return prisma.gameStats.findMany({ ...query });
    },
  })
);