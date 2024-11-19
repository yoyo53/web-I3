const userQueries = require('../database/queries/user.queries.js');
const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createUserAction(request, response) {
    if (!await userQueries.checkExistsUser(request.body.email)) {
        const hashed_password = await hash(request.body.password, 10);
        const userid = await userQueries.createUser(request.body.name, request.body.email, request.body.firstname, hashed_password);
        if (userid != null) {
            console.log('[',request.ip,'] CREATED User: ', userid);
            response.status(200).json({info: "user created successfully", created_user: await userQueries.getUserById(userid)});
        }
        else {
            response.status(400).json({error: "invalid request"});
        }
    }
    else {
        response.status(400).json({error: "email already taken"});
    }
}

async function loginUserAction(request, response) {
    const user = await userQueries.getUserByEmailwithPassword(request.body.email);
    if (user != null && await compare(request.body.password, user.hashed_password)) {
        const token = jwt.sign({user_id: user.userid}, process.env.SECRET_KEY, { expiresIn: '1h' });
        if (token != null) {
            console.log('[',request.ip,'] LOGGED IN User: ', user.userid);
            response.status(200).json({info: "user logged in successfully", token: token, user_id: user.userid, admin: user.admin});
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
    verifyTokenAction
};
