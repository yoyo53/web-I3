const jwt = require("jsonwebtoken");
const userQueries = require("../database/queries/user.queries");

async function verifyToken(request, response, next) {
    let token = request.get("Authorization");
    if (token && token.startsWith("Bearer ") && token.length > 7) {
        token = token.slice(7);
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const hashed_password = await userQueries.getUserPasswordById(decoded.user_id);
            if (hashed_password !== null && hashed_password === decoded.hashed_password) {
                const userType = await userQueries.getUserTypeById(decoded.user_id);
                if (userType !== null && userType === decoded.user_type) {
                    request.user_id = decoded.user_id;
                    request.user_type = decoded.user_type;
                    next();
                } else {
                    return response.status(401).json({ error: "invalid token" });
                }
            } else {
                return response.status(401).json({ error: "invalid token" });
            }
        } catch {
            return response.status(401).json({ error: "invalid token" });
        }
    } else {
        return response.status(401).json({ error: "invalid token" });
    }
}

async function verifyAdminToken(request, response, next) {
    await verifyToken(request, response, () => {
        if (request.user_type === "Admin") {
            next();
        } else {
            return response.status(403).json({ error: "not an admin" });
        }
    });
}

async function verifyTeacherToken(request, response, next) {
    await verifyToken(request, response, () => {
        if (request.user_type === "Teacher") {
            next();
        } else {
            return response.status(403).json({ error: "not a teacher" });
        }
    });
}

async function verifyStudentToken(request, response, next) {
    await verifyToken(request, response, () => {
        if (request.user_type === "Student") {
            next();
        } else {
            return response.status(403).json({ error: "not a student" });
        }
    });
}

module.exports = {
    verifyToken,
    verifyAdminToken,
    verifyTeacherToken,
    verifyStudentToken,
};
