import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.player.deleteMany({});
  await prisma.property.deleteMany({});
  await prisma.edition.deleteMany({});

  // editions
  await prisma.edition.create({
    data: {
      edition: "classic",
      numOfProperties: 28,
      playerStartingCash: 1500,
      properties: {
        create: [
          {
            title: "Old Kent Road",
            type: "brown"
          },
          {
            title: "Whitechapel Road",
            type: "brown"
          },
          {
            title: "The Angel Islington",
            type: "light_blue"
          },
          {
            title: "Euston Road",
            type: "light_blue"
          },
          {
            title: "Pentonville Road",
            type: "light_blue"
          },
          {
            title: "Pall Mall",
            type: "pink"
          },
          {
            title: "Whitehall",
            type: "pink"
          },
          {
            title: "Northumberland Avenue",
            type: "pink"
          },
          {
            title: "Bow Street",
            type: "orange"
          },
          {
            title: "Marlborough Street",
            type: "orange"
          },
          {
            title: "Vine Street",
            type: "orange"
          },
          {
            title: "The Strand",
            type: "red"
          },
          {
            title: "Fleet Street",
            type: "red"
          },
          {
            title: "Trafalgar Square",
            type: "red"
          },
          {
            title: "Leicester Square",
            type: "yellow"
          },
          {
            title: "Coventry Street",
            type: "yellow"
          },
          {
            title: "Piccadilly",
            type: "yellow"
          },
          {
            title: "Regent Street",
            type: "green"
          },
          {
            title: "Oxford Street",
            type: "green"
          },
          {
            title: "Bond Street",
            type: "green"
          },
          {
            title: "King's Cross Station",
            type: "station"
          },
          {
            title: "Marylebone Station",
            type: "station"
          },
          {
            title: "Fenchurch St Station",
            type: "station"
          },
          {
            title: "Liverpool Street Station",
            type: "station"
          },
          {
            title: "Electric Company",
            type: "utility"
          },
          {
            title: "Water Works",
            type: "utility"
          }

        ]
      }
    }
  });  

  // users
  await prisma.player.create({
    data: {
      name: "Saaqy",
      cash: 1500
    },
  });
  await prisma.player.create({
    data: {
      name: "Ibraheem",
      cash: 1500
    },
  });
  await prisma.player.create({
    data: {
      name: "Ismaeel",
      cash: 1500
    },
  });
  await prisma.player.create({
    data: {
      name: "Dice",
      cash: 1500
    },
  });
  await prisma.player.create({
    data: {
      name: "Yushua",
      cash: 1500
    },
  });
  await prisma.player.create({
    data: {
      name: "Bilal",
      cash: 1500
    },
  });
  await prisma.player.create({
    data: {
      name: "Omaan",
      cash: 1500
    },
  });
  await prisma.player.create({
    data: {
      name: "Sufyan",
      cash: 1500
    },
  });
  await prisma.player.create({
    data: {
      name: "Raihan",
      cash: 1500
    },
  });
}

main().then(() => {
  console.log("Data seeded...");
});