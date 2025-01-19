const { prisma } = require("../../../../database/db.connection");
const modulesQueries = require("../../../../database/queries/modules.queries");

beforeAll(async () => {
    await prisma.students.create({
        data: {
            student_number: -1,
            user: {
                create: {
                    userID: -1,
                    firstname: "John",
                    lastname: "Doe",
                    email: "john.doe@mail.com",
                    hashed_password: "password",
                },
            },
        },
    });
    await prisma.teachers.create({
        data: {
            teacher_number: -1,
            user: {
                create: {
                    userID: -2,
                    firstname: "Jane",
                    lastname: "Doe",
                    email: "jane.doe@mail.com",
                    hashed_password: "password",
                },
            },
        },
    });
    await prisma.subjects.create({
        data: {
            subjectID: -1,
            name: "Subject 1",
        },
    });
    await prisma.groups.create({
        data: {
            groupID: -1,
            name: "Group 1",
            students: { connect: { student_number: -1 } },
        },
    });
    await prisma.modules.createMany({
        data: {
            moduleID: -1,
            teacherID: -2,
            subjectID: -1,
            groupID: -1,
        },
    });
});

afterAll(async () => {
    await prisma.modules.delete({ where: { moduleID: -1 } });
    await prisma.groups.delete({ where: { groupID: -1 } });
    await prisma.subjects.delete({ where: { subjectID: -1 } });
    await prisma.users.deleteMany({ where: { userID: { in: [-1, -2] } } });
    await prisma.$disconnect();
});

describe("Get all modules", () => {
    it("should return all modules", async () => {
        const response = await modulesQueries.getAllModules();
        expect(response).toEqual(
            expect.arrayContaining([
                {
                    moduleID: -1,
                    teacher: {
                        firstname: "Jane",
                        lastname: "Doe",
                    },
                    subject: "Subject 1",
                    group: "Group 1",
                },
            ]),
        );
    });
});
