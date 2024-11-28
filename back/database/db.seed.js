const { prisma } = require('./db.connection');

async function main() {
    const questionTypes = await prisma.question_types.createMany({
        data: [
            { question_type: 'text' },
            { question_type: 'radio' },
            { question_type: 'radio_checkbox' },
            { question_type: 'checkbox' },
            { question_type: 'score' }
        ],
        skipDuplicates: true
    });

    const newUser = await prisma.users.upsert({
        where: { email: 'test@mail.com' },
        update: {},
        create: {
            email: 'test@mail.com',
            firstname: 'test',
            lastname: 'test'
        }
    });

    console.log({ questionTypes, newUser });
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });