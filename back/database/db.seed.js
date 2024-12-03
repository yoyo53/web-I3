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
    const newUser = await prisma.users.upsert({
        where: { email: 'admin@mail.com' },
        update: {
            firstname: 'Admin',
            lastname: 'Admin',
            hashed_password: hashedPassword,
        },
        create: {
            firstname: 'Admin',
            lastname: 'Admin',
            email: 'admin@mail.com',
            hashed_password: hashedPassword,
        },
        select: {
            userID: true,
        }
    });

    const newAdmin = await prisma.admins.upsert({
        where: { adminID: newUser.userID },
        update: {},
        create: {
            user: {
                connect: {
                    userID: newUser.userID
                }
            }
        }
    });

    const userHashedPassword = await hashPassword('password');
    const user1 = await prisma.users.upsert({
        where: { email: 'lucas@email.com'},
        update: {},
        create: {
            firstname: 'Lucas',
            lastname: 'Brancolini',
            email: 'lucas@email.com',
            hashed_password: userHashedPassword,
        },
        select: {
            userID: true,
        }
    });

    const student1 = await prisma.students.upsert({
        where: { studentID: user1.userID },
        update: {},
        create: {
            user: {
                connect: {
                    userID: user1.userID
                }
            },
            student_number: 20210790
        }
    });

    const user2 = await prisma.users.upsert({
        where: { email: 'ludovic@email.com'},
        update: {},
        create: {
            firstname: 'Ludovic',
            lastname: 'Liu Chi Pioa',
            email: 'ludovic@email.com',
            hashed_password: userHashedPassword,
        },
        select: {
            userID: true,
        }
    });

    const student2 = await prisma.students.upsert({
        where: { studentID: user2.userID },
        update: {},
        create: {
            user: {
                connect: {
                    userID: user2.userID
                }
            },
            student_number: 20200545
        }
    });

    const user3 = await prisma.users.upsert({
        where: { email: 'yohan@email.com'},
        update: {},
        create: {
            firstname: 'Yohan',
            lastname: 'Villiers',
            email: 'yohan@email.com',
            hashed_password: userHashedPassword,
        },
        select: {
            userID: true,
        }
    });

    const student3 = await prisma.students.upsert({
        where: { studentID: user3.userID },
        update: {},
        create: {
            user: {
                connect: {
                    userID: user3.userID
                }
            },
            student_number: 20200430
        }
    });

    const user4 = await prisma.users.upsert({
        where: { email: 'hugo@email.com'},
        update: {},
        create: {
            firstname: 'Hugo',
            lastname: 'Parmentier',
            email: 'hugo@email.com',
            hashed_password: userHashedPassword,
        },
        select: {
            userID: true,
        }
    });

    const student4 = await prisma.students.upsert({
        where: { studentID: user4.userID },
        update: {},
        create: {
            user: {
                connect: {
                    userID: user4.userID
                }
            },
            student_number: 20200817
        }
    });

    const user5 = await prisma.users.upsert({
        where: { email: 'arnaud@email.com'},
        update: {},
        create: {
            firstname: 'Arnaud',
            lastname: 'Kohler',
            email: 'arnaud@email.com',
            hashed_password: userHashedPassword,
        },
        select: {
            userID: true,
        }
    });

    const student5 = await prisma.students.upsert({
        where: { studentID: user5.userID },
        update: {},
        create: {
            user: {
                connect: {
                    userID: user5.userID
                }
            },
            student_number: 20210351
        }
    });

    const user6 = await prisma.users.upsert({
        where: { email: 'jacques@email.com'},
        update: {},
        create: {
            firstname: 'Jacques',
            lastname: 'Augustin',
            email: 'jacques@email.com',
            hashed_password: userHashedPassword,
        },
        select: {
            userID: true,
        }
    });

    const teacher1 = await prisma.teachers.upsert({
        where: { teacherID: user6.userID },
        update: {},
        create: {
            user: {
                connect: {
                    userID: user6.userID
                }
            },
            teacher_number: 19906578
        }
    });

    const user7 = await prisma.users.upsert({
        where: { email: 'data@email.com'},
        update: {},
        create: {
            firstname: 'Data',
            lastname: 'Teacher',
            email: 'data@email.com',
            hashed_password: userHashedPassword,
        },
        select: {
            userID: true,
        }
    });

    const teacher2 = await prisma.teachers.upsert({
        where: { teacherID: user7.userID },
        update: {},
        create: {
            user: {
                connect: {
                    userID: user7.userID
                }
            },
            teacher_number: 19906579
        }
    });

    const user8 = await prisma.users.upsert({
        where: { email: 'sec@email.com'},
        update: {},
        create: {
            firstname: 'Sec',
            lastname: 'Teacher',
            email: 'sec@email.com',
            hashed_password: userHashedPassword,
        },
        select: {
            userID: true,
        }
    });

    const teacher3 = await prisma.teachers.upsert({
        where: { teacherID: user8.userID },
        update: {},
        create: {
            user: {
                connect: {
                    userID: user8.userID
                }
            },
            teacher_number: 19906580
        }
    });

    const group1 = await prisma.groups.upsert({
        where: { groupID: 1 },
        update: {},
        create: {
            groupID: 1,
            name: 'SE2',
            students: {
                connect: [
                    { studentID: student1.studentID },
                    { studentID: student2.studentID }
                ]
            }
        }
    });

    const group2 = await prisma.groups.upsert({
        where: { groupID: 2 },
        update: {},
        create: {
            groupID: 2,
            name: 'DT1',
            students: {
                connect: [
                    { studentID: student3.studentID },
                    { studentID: student4.studentID }
                ]
            }
        }
    });

    const group3 = await prisma.groups.upsert({
        where: { groupID: 3 },
        update: {},
        create: {
            groupID: 3,
            name: 'BI3',
            students: {
                connect: [
                    { studentID: student5.studentID }
                ]
            }
        }
    });

    const subject1 = await prisma.subjects.upsert({
        where: { subjectID: 1 },
        update: {},
        create: {
            subjectID: 1,
            name: 'Advanced-Programming'
        }
    });

    const subject2 = await prisma.subjects.upsert({
        where: { subjectID: 2 },
        update: {},
        create: {
            subjectID: 2,
            name: 'Machine-Learning'
        }
    });

    const subject3 = await prisma.subjects.upsert({
        where: { subjectID: 3 },
        update: {},
        create: {
            subjectID: 3,
            name: 'Security'
        }
    });

    const module1 = await prisma.modules.upsert({
        where: {moduleKey : {
            teacherID: teacher1.teacherID,
            subjectID: subject1.subjectID,
            groupID: group1.groupID
        }},
        update: {},
        create: {
            teacher: {
                connect: {
                    teacherID: teacher1.teacherID
                }
            },
            subject: {
                connect: {
                    subjectID: subject1.subjectID
                }
            },
            group: {
                connect: {
                    groupID: group1.groupID
                }
            }
        },
    });

    const module2 = await prisma.modules.upsert({
        where: {moduleKey : {
            teacherID: teacher2.teacherID,
            subjectID: subject2.subjectID,
            groupID: group2.groupID
        }},
        update: {},
        create: {
            teacher: {
                connect: {
                    teacherID: teacher2.teacherID
                }
            },
            subject: {
                connect: {
                    subjectID: subject2.subjectID
                }
            },
            group: {
                connect: {
                    groupID: group2.groupID
                }
            }
        },
    });

    const module3 = await prisma.modules.upsert({
        where: {moduleKey : {
            teacherID: teacher3.teacherID,
            subjectID: subject3.subjectID,
            groupID: group3.groupID
        }},
        update: {},
        create: {
            teacher: {
                connect: {
                    teacherID: teacher3.teacherID
                }
            },
            subject: {
                connect: {
                    subjectID: subject3.subjectID
                }
            },
            group: {
                connect: {
                    groupID: group3.groupID
                }
            }
        },
    });

    console.log({ questionTypes, newUser, newAdmin, student1, student2, student3, student4, student5, teacher1, teacher2, teacher3, group1, group2, group3, subject1, subject2, subject3, module1, module2, module3 });
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });