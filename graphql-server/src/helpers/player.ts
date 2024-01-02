import { prisma } from "../db";
import { Player } from "@prisma/client";
import { TransactionType } from "./types";

export async function getPlayer(playerName: string): Promise<Player> {
    const player = await prisma.player.findFirst({where: {name: playerName}}); 
    if (!player) {
        throw new Error(`player with name ${player} not found`);
    }
    return player;
}

export async function handlePlayerCash(player: Player, amount: number, type: TransactionType): Promise<Player> {
    let newCash = 0;
    if (type === TransactionType.FEE) {
        newCash = player.cash - amount;
        if (newCash < 0)
            throw new Error(`player ${player.name} is bankrupt`);
    }
    else if (type === TransactionType.GAIN)
        newCash = player.cash + amount;
    else 
        throw new Error(`TransactionType ${type} is not supported`);

    player.cash = newCash;
    await prisma.player.update({
        where: { id: player.id },
        data: {
            cash: newCash
        }
    });
    return player;
}