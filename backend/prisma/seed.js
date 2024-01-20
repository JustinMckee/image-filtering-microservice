import prisma from "../src/prismaClient.js";
// import passwordService from "../src/services/passwordService.js";

const images = [
    { id: '0', user: 'Joe', imageUrl: 'https://img-processing-usr2942309.s3.amazonaws.com/filtered.1391.jpg'},
    { id: '1', user: 'Joe', imageUrl: 'https://img-processing-usr2942309.s3.amazonaws.com/filtered.1928.jpg'},
    { id: '2', user: 'Jenny', imageUrl: 'https://img-processing-usr2942309.s3.amazonaws.com/filtered.210.jpg'},
    { id: '3', user: 'Michael', imageUrl: 'https://img-processing-usr2942309.s3.amazonaws.com/filtered.577.jpg'},
]

async function main() {
    for(let i=0; i<images.length; i++){
        const img = images[i]
        await prisma.images.upsert({
            where: {id: img.id},
            update: {},
            create: {
                id: img.id,
                user: img.user,
                imageUrl: img.imageUrl
            }
        })
    }

    // const {hashedPassword,salt} = await passwordService.hashPassword('password');
    // await prisma.user.upsert({
    //     where: {email:'test@email.com'},
    //     update: {},
    //     create: {
    //         email: 'test@email.com',
    //         hashedPassword,
    //         salt,
    //         firstName: 'Joe',
    //         lastName: 'Doe'
    //     }
    // });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });