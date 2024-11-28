const userQueries = require('../database/queries/user.queries.js');
const teacherQueries = require('../database/queries/teacher.queries.js');
const studentQueries = require('../database/queries/student.queries.js');
const adminQueries = require('../database/queries/admin.queries.js');
const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

async function createUserAction(request, response) {
    if (!await userQueries.checkExistsUser(request.body.email)) {
        // Do not delete await here, it is necessary to wait for the hashed password to be generated
        const hashed_password = await hash(process.env.DEFAULT_PASSWORD, 10);
        // const userID = await userQueries.createUser(request.body.firstName, request.body.lastName, request.body.email, hashed_password);
        // if (userID != null) {
        //     console.log('[',request.ip,'] CREATED User: ', userID);
        // } else {
        //     response.status(400).json({error: "invalid request"});
        //     return;
        // }

        const userType = request.body.accountType === 'Teacher' ? 'Teacher' : 'Student';
        if (userType === 'Teacher') {
            if (! await teacherQueries.checkExistsTeacherNumber(request.body.accountNumber)) {
                const userID = await userQueries.createUser(request.body.firstName, request.body.lastName, request.body.email, hashed_password);
                if (userID != null) {
                    console.log('[',request.ip,'] CREATED User: ', userID);
                    const teacherID = await teacherQueries.createTeacher(userID, request.body.accountNumber);
                    if (teacherID != null) {
                        console.log('[',request.ip,'] CREATED Teacher: ', teacherID);
                        response.status(200).json({info: "user created successfully", created_user: await userQueries.getUserById(userID)});
                    } else {
                        response.status(400).json({error: "Impossible to create teacher"});
                        return;
                    }
                } else {
                    response.status(400).json({error: "Impossible to create user"});
                    return;
                }
            } else {
                response.status(400).json({error: "teacher number already taken"});
                return;
            }
        } else {
            if (! await studentQueries.checkExistsStudentNumber(request.body.accountNumber)) {
                const userID = await userQueries.createUser(request.body.firstName, request.body.lastName, request.body.email, hashed_password);
                if (userID != null) {
                    console.log('[',request.ip,'] CREATED User: ', userID);
                    const studentID = await studentQueries.createStudent(userID, request.body.accountNumber);
                    if (studentID != null) {
                        console.log('[',request.ip,'] CREATED Student: ', studentID);
                        response.status(200).json({info: "user created successfully", created_user: await userQueries.getUserById(userID)});
                    } else {
                        response.status(400).json({error: "Impossible to create student"});
                        return;
                    }
                } else {
                    response.status(400).json({error: "Impossible to create user"});
                    return;
                }
            } else {
                response.status(400).json({error: "student number already taken"});
                return;
            }
        }
    }
    else {
        response.status(400).json({error: "email already taken"});
    }
}

async function changePasswordAction(request, response) {
    const hashed_password = await hash(request.body.password, 10);
    const userID = await userQueries.updatePassword(request.user_id, hashed_password);
    if (userID != null) {
        console.log('[',request.ip,'] UPDATED User: ', userID);
        response.status(200).json({info: "password updated successfully"});
    }
    else {
        response.status(400).json({error: "invalid request"});
    }
}

async function loginUserAction(request, response) {
    const user = await userQueries.getUserByEmailwithPassword(request.body.email);
    if (user != null && await compare(request.body.password, user.hashed_password)) {
        // Check if the user is a teacher or a student or admin
        if (await teacherQueries.checkExistsTeacher(user.userID)){
            user.type = 'Teacher';
        } else if (await studentQueries.checkExistsStudent(user.userID)){
            user.type = 'Student';
        } else if (await adminQueries.checkExistsAdmin(user.userID)){
            user.type = 'Admin';
        } else {
            response.status(400).json({error: "invalid request"});
            return;
        }

        // Generate token
        const token = jwt.sign({user_id: user.userID, type: user.type}, process.env.SECRET_KEY, {expiresIn: '1h'});
        if (token != null) {
            console.log('[',request.ip,'] LOGGED IN User: ', user.userID, ' as ', user.type);
            response.status(200).json({info: "user logged in successfully", token: token, user_id: user.userID, type: user.type});
        }
        else {
            response.status(400).json({error: "invalid request"});
        }
    }
    else {
        response.status(400).json({token: null});
    }
}

async function verifyTokenAction(request, response) {
    return response.status(200).json({info: 'Valid token', user_id: request.user_id});
}

module.exports = {
    createUserAction,
    loginUserAction,
    changePasswordAction,
    verifyTokenAction
};
