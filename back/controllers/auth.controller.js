const userQueries = require("../database/queries/user.queries");
const teacherQueries = require("../database/queries/teacher.queries");
const studentQueries = require("../database/queries/student.queries");
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

async function createUserAction(request, response) {
    const { email, firstname, lastname, account_number, account_type } = request.body;
    if (
        typeof email === "string" &&
        typeof firstname === "string" &&
        typeof lastname === "string" &&
        Number.isInteger(account_number) &&
        typeof account_type === "string"
    ) {
        if (!(await userQueries.checkExistsUser(email))) {
            const hashed_password = await hash(process.env.DEFAULT_PASSWORD, 10);
            if (account_type === "Teacher") {
                if (!(await teacherQueries.checkExistsTeacherNumber(account_number))) {
                    const userID = await teacherQueries.createTeacher(
                        account_number,
                        firstname,
                        lastname,
                        email,
                        hashed_password,
                    );
                    response.status(201).json({ userID: userID });
                } else {
                    response.status(409).json({ error: "teacher number already taken" });
                }
            } else if (account_type === "Student") {
                if (!(await studentQueries.checkExistsStudentNumber(account_number))) {
                    const userID = await studentQueries.createStudent(
                        account_number,
                        firstname,
                        lastname,
                        email,
                        hashed_password,
                    );
                    response.status(201).json({ userID: userID });
                } else {
                    response.status(409).json({ error: "student number already taken" });
                }
            } else {
                response.status(400).json({ error: "invalid account type" });
            }
        } else {
            response.status(409).json({ error: "email already taken" });
        }
    } else {
        response.status(400).json({ error: "invalid or missing required fields" });
    }
}

async function loginUserAction(request, response) {
    const { email, password } = request.body;
    if (typeof email === "string" && typeof password === "string") {
        const user = await userQueries.getUserByEmailwithPassword(email);
        if (user !== null && (await compare(password, user.hashed_password))) {
            const userType = await userQueries.getUserTypeById(user.userID);
            if (userType !== null) {
                const token = jwt.sign(
                    { user_id: user.userID, user_type: userType, hashed_password: user.hashed_password },
                    process.env.SECRET_KEY,
                    { expiresIn: process.env.TOKEN_EXPIRATION || "1h" },
                );
                response.status(200).json({ token: token, user_type: userType });
            } else {
                response.status(500).json({ error: "invalid user account" });
            }
        } else {
            response.status(401).json({ error: "invalid email or password" });
        }
    } else {
        response.status(400).json({ error: "invalid or missing required fields" });
    }
}

async function verifyTokenAction(request, response) {
    return response.status(200).json({ user_type: request.user_type });
}

module.exports = {
    createUserAction,
    loginUserAction,
    verifyTokenAction,
};
