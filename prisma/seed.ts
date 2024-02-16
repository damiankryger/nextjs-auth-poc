const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.upsert({
        where: {email: 'admin@example.com'},
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin',
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