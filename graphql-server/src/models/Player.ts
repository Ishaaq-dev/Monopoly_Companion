import { Player } from "@prisma/client";
import { builder } from "../builder";
import { prisma } from "../db";
import { TransactionType } from "../helpers/types";
import { getPlayer, handlePlayerCash } from "../helpers/player";


builder.prismaObject("Player", {
    fields: t => ({
        id: t.exposeID("id"),
        name: t.exposeString("name"),
        cash: t.exposeInt('cash')
    })
})

builder.queryField("players", (t) =>
  t.prismaField({
    type: ["Player"],
    resolve: async (query, root, args, ctx, info) => {
      return prisma.player.findMany({ ...query });
    },
  })
);

builder.mutationField("handleFee", (t) => {
  return t.prismaField({
    type: ["Player"],
    args: {
      paying: t.arg.string(),
      receiving: t.arg.string(),
      amount: t.arg.int()
    },
    resolve: async (query, root, args, ctx, info) => {
      const response: Player[] = [];

      if (!args.paying && !args.receiving || !args.amount || args.amount <= 0)
        throw new Error(`Request requires paying or receiving player and positive amount`);

      if(args.paying && args.receiving && args.paying == args.receiving)
        throw new Error(`Can not pay fee to same player: ${args.paying}`);

      if(args.paying) {
        let payingPlayer = await getPlayer(args.paying);
        payingPlayer = await handlePlayerCash(payingPlayer, args.amount, TransactionType.FEE);
        response.push(payingPlayer);
      }

      if(args.receiving) {
        let receivingPlayer = await getPlayer(args.receiving);
        receivingPlayer = await handlePlayerCash(receivingPlayer, args.amount, TransactionType.GAIN);
        response.push(receivingPlayer);
      }

      return response;
    }
  })
});
