import { Edition, Game, Player } from "@prisma/client";
import { builder } from "../builder";
import { prisma } from "../db";
import { getPlayer } from "../helpers/player";
import { getEdition } from "../helpers/edition";

builder.prismaObject("Game", {
    fields: t => ({
        id: t.exposeID("id"),
        editionId: t.exposeString("editionId"),
        edition: t.relation("edition"),
        playerIds: t.exposeStringList("playerIds"),
        players: t.relation("players"),
        gameStats: t.relation("gameStats")
    })
})

builder.queryField("games", (t) => {
    return t.prismaField({
        type: ["Game"],
        resolve: async (query, root, args, ctx, info) => {
            return prisma.game.findMany({ ...query });
        }
    })
})

builder.mutationField("createGame", (t) => {
    return t.prismaField({
        type: "Game",
        args: {
            playerNames: t.arg.stringList(),
            edition: t.arg.string()
        },
        resolve: async (query, root, args, ctx, info) => {
            const editionName: string = args.edition?.toLowerCase() ?? 'classic';
            const playerIds: string[] = [];

            if (!args.playerNames || args.playerNames?.length <= 1)
                throw new Error(`Game requires minimum of two players`);

            const edition: Edition = await getEdition(editionName);
            const players: Player[] = await Promise.all(args.playerNames.map(async playerName => {
                const player: Player = await getPlayer(playerName);
                playerIds.push(player.id);
                return player;
            }));

            const game: Game = await prisma.game.create({
                data: {
                    editionId: edition.id,
                    playerIds: playerIds
                }
            })
            return game;
        }
    })
})