const jwt = require('jsonwebtoken');

async function verifyToken(request, response, next) {
    let token = request.get("Authorization");
    if (!token || !token.startsWith('Bearer ')) {
        return response.status(401).json({error: 'Invalid token'});
    }
    else {
        token = token.slice(7);
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.SECRET_KEY);
                request.user_id = decoded.user_id;
                request.user_type = decoded.type;
                next();    
            }
            catch {
                return response.status(401).json({error: 'Invalid token'});
            }
        } else {
            return response.status(401).json({error: 'Invalid token'});
        }
    }
}

async function verifyAdminToken(request, response, next) {
    await verifyToken(request, response, () => {
        if (request.user_type === 'Admin') {
            next();
        } else {
            return response.status(401).json({error: 'You are not an admin'});
        }
    });
}

async function verifyTeacherToken(request, response, next) {
    await verifyToken(request, response, () => {
        if (request.user_type === 'Teacher') {
            next();
        } else {
            return response.status(401).json({error: 'You are not a teacher'});
        }
    });
}

async function verifyStudentToken(request, response, next) {
    await verifyToken(request, response, () => {
        if (request.user_type === 'Student') {
            next();
        } else {
            return response.status(401).json({error: 'You are not a student'});
        }
    });
}

module.exports = {
    verifyToken,
    verifyAdminToken,
    verifyTeacherToken,
    verifyStudentToken
};