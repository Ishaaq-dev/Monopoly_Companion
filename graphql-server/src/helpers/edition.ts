import { prisma } from "../db";
import { Edition } from "@prisma/client";

export async function getEdition(editionName: string): Promise<Edition> {
    const edition = await prisma.edition.findFirst({where: {edition: editionName}});
    if (!edition)
        throw new Error(`Edition: ${editionName} not currently supported`);
    return edition;
}