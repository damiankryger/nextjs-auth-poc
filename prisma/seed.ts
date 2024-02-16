const {PrismaClient} = require("@prisma/client");
const {hashSync} = require('bcryptjs')

const prisma = new PrismaClient()

const main = async () => {
    const admin = await prisma.user.upsert({
        where: {email: 'admin@example.com'},
        update: {
            password: hashSync('qwerty123')
        },
        create: {
            email: 'admin@example.com',
            name: 'Admin',
            password: hashSync('qwerty123'),
            profile: {
                create: {
                    bio: 'It\'s admin user. It\'s the most powerful user in the application.'
                }
            }
        }
    })
}

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})