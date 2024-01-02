import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("Edition", {
    fields: t => ({
        id: t.exposeID("id"),
        edition: t.exposeString("edition"),
        numOfProperties: t.exposeInt('numOfProperties'),
        playerStartingCash: t.exposeInt('playerStartingCash'),
        properties: t.relation("properties")
    })
});

builder.queryField("editions", (t) =>
  t.prismaField({
    type: ["Edition"],
    resolve: async (query, root, args, ctx, info) => {
      return prisma.edition.findMany({ ...query });
    },
  })
);