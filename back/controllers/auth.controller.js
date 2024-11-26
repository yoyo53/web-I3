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
        // const userid = await userQueries.createUser(request.body.lastName, request.body.email, request.body.firstName, hashed_password);
        // if (userid != null) {
        //     console.log('[',request.ip,'] CREATED User: ', userid);
        // } else {
        //     response.status(400).json({error: "invalid request"});
        //     return;
        // }

        const userType = request.body.accountType === 'Teacher' ? 'Teacher' : 'Student';
        if (userType === 'Teacher') {
            if (! await teacherQueries.checkExistsTeacherNumber(request.body.accountNumber)) {
                const userid = await userQueries.createUser(request.body.lastName, request.body.email, request.body.firstName, hashed_password);
                if (userid != null) {
                    console.log('[',request.ip,'] CREATED User: ', userid);
                    const teacherid = await teacherQueries.createTeacher(userid, request.body.accountNumber);
                    if (teacherid != null) {
                        console.log('[',request.ip,'] CREATED Teacher: ', teacherid);
                        response.status(200).json({info: "user created successfully", created_user: await userQueries.getUserById(userid)});
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
                const userid = await userQueries.createUser(request.body.lastName, request.body.email, request.body.firstName, hashed_password);
                if (userid != null) {
                    console.log('[',request.ip,'] CREATED User: ', userid);
                    const studentid = await studentQueries.createStudent(userid, request.body.accountNumber);
                    if (studentid != null) {
                        console.log('[',request.ip,'] CREATED Student: ', studentid);
                        response.status(200).json({info: "user created successfully", created_user: await userQueries.getUserById(userid)});
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
    const userid = await userQueries.updatePassword(request.user_id, hashed_password);
    if (userid != null) {
        console.log('[',request.ip,'] UPDATED User: ', userid);
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
        if (await teacherQueries.checkExistsTeacher(user.userid)){
            user.type = 'Teacher';
        } else if (await studentQueries.checkExistsStudent(user.userid)){
            user.type = 'Student';
        } else if (await adminQueries.checkExistsAdmin(user.userid)){
            user.type = 'Admin';
        } else {
            response.status(400).json({error: "invalid request"});
            return;
        }

        // Generate token
        const token = jwt.sign({user_id: user.userid, type: user.type}, process.env.SECRET_KEY, {expiresIn: '1h'});
        if (token != null) {
            console.log('[',request.ip,'] LOGGED IN User: ', user.userid, ' as ', user.type);
            response.status(200).json({info: "user logged in successfully", token: token, user_id: user.userid, type: user.type});
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
