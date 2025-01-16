const { prisma } = require("./db.connection");
const { hash } = require("bcrypt");

async function hashPassword(password) {
    return await hash(password, 10);
}

async function main() {
    const questionTypes = await prisma.question_types.createManyAndReturn({
        data: [
            { question_type: "text" },
            { question_type: "radio" },
            { question_type: "checkbox" },
            { question_type: "score" },
        ],
        skipDuplicates: true,
    });

    const adminHashedPassword = await hashPassword("admin");
    const usersHashedPassword = await hashPassword("password");

    const user1 = await prisma.users.upsert({
        where: { email: "admin@mail.com" },
        update: {},
        create: {
            firstname: "Admin",
            lastname: "Admin",
            email: "admin@mail.com",
            hashed_password: adminHashedPassword,
        },
    });

    const admin1 = await prisma.admins.upsert({
        where: { adminID: user1.userID },
        update: {},
        create: { user: { connect: { userID: user1.userID } } },
    });

    const user2 = await prisma.users.upsert({
        where: { email: "lucas@mail.com" },
        update: {},
        create: {
            firstname: "Lucas",
            lastname: "Brancolini",
            email: "lucas@mail.com",
            hashed_password: usersHashedPassword,
        },
    });

    const student1 = await prisma.students.upsert({
        where: { studentID: user2.userID },
        update: {},
        create: { student_number: 20210790, user: { connect: { userID: user2.userID } } },
    });

    const user3 = await prisma.users.upsert({
        where: { email: "ludovic@mail.com" },
        update: {},
        create: {
            firstname: "Ludovic",
            lastname: "Liu Chi Pioa",
            email: "ludovic@mail.com",
            hashed_password: usersHashedPassword,
        },
    });

    const student2 = await prisma.students.upsert({
        where: { studentID: user3.userID },
        update: {},
        create: { student_number: 20200545, user: { connect: { userID: user3.userID } } },
    });

    const user4 = await prisma.users.upsert({
        where: { email: "yohan@mail.com" },
        update: {},
        create: {
            firstname: "Yohan",
            lastname: "Villiers",
            email: "yohan@mail.com",
            hashed_password: usersHashedPassword,
        },
    });

    const student3 = await prisma.students.upsert({
        where: { studentID: user4.userID },
        update: {},
        create: { student_number: 20200430, user: { connect: { userID: user4.userID } } },
    });

    const user5 = await prisma.users.upsert({
        where: { email: "hugo@mail.com" },
        update: {},
        create: {
            firstname: "Hugo",
            lastname: "Parmentier",
            email: "hugo@mail.com",
            hashed_password: usersHashedPassword,
        },
    });

    const student4 = await prisma.students.upsert({
        where: { studentID: user5.userID },
        update: {},
        create: { student_number: 20200817, user: { connect: { userID: user5.userID } } },
        select: { studentID: true },
    });

    const user6 = await prisma.users.upsert({
        where: { email: "arnaud@mail.com" },
        update: {},
        create: {
            firstname: "Arnaud",
            lastname: "Kohler",
            email: "arnaud@mail.com",
            hashed_password: usersHashedPassword,
        },
    });

    const student5 = await prisma.students.upsert({
        where: { studentID: user6.userID },
        update: {},
        create: { student_number: 20210351, user: { connect: { userID: user6.userID } } },
    });

    const user7 = await prisma.users.upsert({
        where: { email: "jacques@mail.com" },
        update: {},
        create: {
            firstname: "Jacques",
            lastname: "Augustin",
            email: "jacques@mail.com",
            hashed_password: usersHashedPassword,
        },
    });

    const teacher1 = await prisma.teachers.upsert({
        where: { teacherID: user7.userID },
        update: {},
        create: { teacher_number: 19906578, user: { connect: { userID: user7.userID } } },
    });

    const user8 = await prisma.users.upsert({
        where: { email: "data@mail.com" },
        update: {},
        create: {
            firstname: "Data",
            lastname: "Teacher",
            email: "data@mail.com",
            hashed_password: usersHashedPassword,
        },
    });

    const teacher2 = await prisma.teachers.upsert({
        where: { teacherID: user8.userID },
        update: {},
        create: { teacher_number: 19906579, user: { connect: { userID: user8.userID } } },
    });

    const user9 = await prisma.users.upsert({
        where: { email: "sec@mail.com" },
        update: {},
        create: { firstname: "Sec", lastname: "Teacher", email: "sec@mail.com", hashed_password: usersHashedPassword },
    });

    const teacher3 = await prisma.teachers.upsert({
        where: { teacherID: user9.userID },
        update: {},
        create: { teacher_number: 19906580, user: { connect: { userID: user9.userID } } },
    });

    const group1 = await prisma.groups.upsert({
        where: { groupID: 1 },
        update: {},
        create: {
            groupID: 1,
            name: "SE2",
            students: { connect: [{ studentID: student1.studentID }, { studentID: student2.studentID }] },
        },
    });

    const group2 = await prisma.groups.upsert({
        where: { groupID: 2 },
        update: {},
        create: {
            groupID: 2,
            name: "DT1",
            students: { connect: [{ studentID: student3.studentID }, { studentID: student4.studentID }] },
        },
    });

    const group3 = await prisma.groups.upsert({
        where: { groupID: 3 },
        update: {},
        create: { groupID: 3, name: "BI3", students: { connect: [{ studentID: student5.studentID }] } },
    });

    const subject1 = await prisma.subjects.upsert({
        where: { subjectID: 1 },
        update: {},
        create: { subjectID: 1, name: "Advanced-Programming" },
    });

    const subject2 = await prisma.subjects.upsert({
        where: { subjectID: 2 },
        update: {},
        create: { subjectID: 2, name: "Machine-Learning" },
    });

    const subject3 = await prisma.subjects.upsert({
        where: { subjectID: 3 },
        update: {},
        create: { subjectID: 3, name: "Security" },
    });

    const module1 = await prisma.modules.upsert({
        where: { moduleKey: { teacherID: teacher1.teacherID, subjectID: subject1.subjectID, groupID: group1.groupID } },
        update: {},
        create: {
            teacher: { connect: { teacherID: teacher1.teacherID } },
            subject: { connect: { subjectID: subject1.subjectID } },
            group: { connect: { groupID: group1.groupID } },
        },
    });

    const module2 = await prisma.modules.upsert({
        where: { moduleKey: { teacherID: teacher2.teacherID, subjectID: subject2.subjectID, groupID: group2.groupID } },
        update: {},
        create: {
            teacher: { connect: { teacherID: teacher2.teacherID } },
            subject: { connect: { subjectID: subject2.subjectID } },
            group: { connect: { groupID: group2.groupID } },
        },
    });

    const module3 = await prisma.modules.upsert({
        where: { moduleKey: { teacherID: teacher3.teacherID, subjectID: subject3.subjectID, groupID: group3.groupID } },
        update: {},
        create: {
            teacher: { connect: { teacherID: teacher3.teacherID } },
            subject: { connect: { subjectID: subject3.subjectID } },
            group: { connect: { groupID: group3.groupID } },
        },
    });

    console.log({
        questionTypes,
        user1,
        admin1,
        user2,
        student1,
        user3,
        student2,
        user4,
        student3,
        user5,
        student4,
        user6,
        teacher1,
        user7,
        teacher2,
        user8,
        teacher3,
        group1,
        group2,
        group3,
        subject1,
        subject2,
        subject3,
        module1,
        module2,
        module3,
    });
}
main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
