const teacherQueries = require("../database/queries/teacher.queries");
const studentQueries = require("../database/queries/student.queries");
const userQueries = require("../database/queries/user.queries");

async function getUserData(request, response) {
    if (request.user_type === "Admin") {
        let user = await userQueries.getUserById(request.user_id);
        if (user !== null) {
            response.status(200).json({ firstname: user.firstname, lastname: user.lastname, email: user.email });
        } else {
            response.status(500).json({ error: "invalid user account" });
        }
    } else if (request.user_type === "Teacher") {
        let user = await teacherQueries.getUserByTeacherID(request.user_id);
        if (user !== null) {
            response.status(200).json({
                firstname: user.user.firstname,
                lastname: user.user.lastname,
                email: user.user.email,
                id: user.teacher_number,
            });
        } else {
            response.status(500).json({ error: "invalid user account" });
        }
    } else if (request.user_type === "Student") {
        let user = await studentQueries.getUserByStudentID(request.user_id);
        if (user !== null) {
            response.status(200).json({
                firstname: user.user.firstname,
                lastname: user.user.lastname,
                email: user.user.email,
                id: user.student_number,
            });
        } else {
            response.status(500).json({ error: "invalid user account" });
        }
    } else {
        response.status(500).json({ error: "invalid user account" });
    }
}

module.exports = {
    getUserData,
};
