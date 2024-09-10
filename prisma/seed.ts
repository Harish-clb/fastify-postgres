import { PrismaClient, User, Joke } from "@prisma/client";

const prisma = new PrismaClient();

const users: User[] = [
  {
    id: 1,
    email: "john@email.com",
    name: "John",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    email: "jenny@email.com",
    name: "Jenny",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const jokes: Joke[] = [
  {
    id: 1,
    joke: "Why did the scarecrow win an award? Because he was outstanding in his field.",
    userId: 1,
    author: "John",
    createdAt: new Date(),
    updatedAt: new Date(),
    likes: 1,
    dislikes: 0,
  },
  {
    id: 2,
    joke: "What do you call a fish wearing a crown? A king fish.",
    userId: 2,
    author: "Jenny",
    createdAt: new Date(),
    updatedAt: new Date(),
    likes: 4,
    dislikes: 1,
  },
];

async function main() {
  await prisma.$transaction(async (prisma) => {
    await prisma.user.createMany({
      data: users,
    });
    await prisma.joke.createMany({
      data: jokes,
    });
  });

  console.log("Seeded data successfully !!!");
}

main()
  .then(async () => {
    console.log("Seed completed");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Something went wrong when seeding ", e);
    await prisma.$disconnect();
    process.exit(1);
  });
