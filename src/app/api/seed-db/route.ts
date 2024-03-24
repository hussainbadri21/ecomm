// import prisma from '../../../../lib/prisma';
// import faker from 'faker';

// export async function POST() {

//     try {
//         await prisma.$connect();
//         let categories = new Set();

//         for (let i = 0; i < 100; i++) {
//             let category = faker.commerce.department()
//             while (categories.has(category)) {
//                 category = faker.commerce.department()
//             }
//             categories.add(category)

//             await prisma.categories.create({
//                 data: {
//                     name: category,
//                     status: 1,
//                     createdAt: new Date()
//                 }
//             });
//         }
//     } catch (error) {
//         console.log(error)
//         return Response.json({ message: 'Category table seeding failed' }, { status: 500 })
//     } finally {
//         await prisma.$disconnect();
//     }
//     return Response.json({ message: 'Category table seeded successfully' }, { status: 200 })

// }