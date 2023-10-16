const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Famous People" },
        { name: "Movies & TV Celebrity" },
        { name: "Musician" },
        { name: "Gamer" },
        { name: "Animals" },
        { name: "Philosophist" },
        { name: "Scientist & Engineer" },
        { name: "Business Tycoon" },
        { name: "Politician" },
      ],
    });
  } catch (error) {
    console.error("Error seeding default categories: ", error);
  } finally {
    await db.$disconnect();
  }
}

main();
