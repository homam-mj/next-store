const { PrismaClient } = require('@prisma/client');
const products = require('./products.json');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed products...');
  
  for (const product of products) {
    try {
      // Use upsert to avoid duplicate errors if seed is run multiple times
      await prisma.product.upsert({
        where: {
          // Use name and company as unique identifier
          name_company: {
            name: product.name,
            company: product.company,
          },
        },
        update: product,
        create: product,
      });
      console.log(`✓ Seeded product: ${product.name}`);
    } catch (error) {
      // If unique constraint doesn't exist, fall back to create
      if (error.code === 'P2002') {
        console.log(`⚠ Product already exists: ${product.name}`);
      } else {
        // Try simple create if upsert fails
        try {
          await prisma.product.create({
            data: product,
          });
          console.log(`✓ Seeded product: ${product.name}`);
        } catch (createError) {
          if (createError.code === 'P2002') {
            console.log(`⚠ Product already exists: ${product.name}`);
          } else {
            console.error(`✗ Error seeding ${product.name}:`, createError.message);
          }
        }
      }
    }
  }
  
  console.log('Finished seeding products!');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
