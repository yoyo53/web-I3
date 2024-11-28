const { prisma } = require('./db.connection');

const { hash } = require('bcrypt');

async function hashPassword(password) {
    return await hash(password, 10);
}

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

    const hashedPassword = await hashPassword('admin');
    const newUser = await prisma.admins.upsert({
        where: { user: { email: 'admin@mail.com' } },
        update: {
            user: {
                update: {
                    firstname: 'Admin',
                    lastname: 'Admin',
                    hashed_password: hashedPassword,
                }
            }
        },
        create: {
            user: {
                create: {
                    firstname: 'Admin',
                    lastname: 'Admin',
                    email: 'admin@mail.com',
                    hashed_password: hashedPassword,
                }
            }
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