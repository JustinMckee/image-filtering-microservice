import prisma from "../prismaClient.js";

export class imagesService {

    async findImagesByUser(user) {
        return await prisma.images.findMany({
            where: {
                user: user
            }
        });
    }

    async findAll() {
        return await prisma.images.findMany();
    }

    async createImage(user, imageURL) {
        return await prisma.images.create({
            data: {
                user,
                imageURL
            }
        })
    }

}

export default new imagesService();