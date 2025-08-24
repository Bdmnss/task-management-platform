import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: "Admin User",
      email: "admin@example.com",
      password: "hashedpassword1",
      role: "admin",
      department: "Management",
      avatar: "https://example.com/avatar1.png",
    },
    {
      name: "Employee User",
      email: "employee@example.com",
      password: "hashedpassword2",
      role: "employee",
      department: "Sales",
      avatar: "https://example.com/avatar2.png",
    },
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  console.log("Seeded users successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
