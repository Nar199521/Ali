
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categoriesToDelete = ["Men's Fashion", "Technical Guruji"];

  for (const categoryName of categoriesToDelete) {
    try {
      const category = await prisma.category.findFirst({
        where: { name: categoryName },
      });

      if (category) {
        await prisma.category.delete({
          where: { id: category.id },
        });
        console.log(`Successfully deleted category: ${categoryName}`);
      } else {
        console.log(`Category not found: ${categoryName}`);
      }
    } catch (error) {
      console.error(`Error deleting category ${categoryName}:`, error);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
