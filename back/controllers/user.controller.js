const teacherQueries = require('../database/queries/teacher.queries.js');
const studentQueries = require('../database/queries/student.queries.js');
const userQueries = require('../database/queries/user.queries.js');


async function getUserData (req, res) {
    let user = null 
    let newUser = null
    if (req.user_type === 'Teacher') {
        user = await teacherQueries.getUserByTeacherID(req.user_id);
        newUser = {
            firstName: user.user.firstname,
            lastName: user.user.lastname,
            email: user.user.email,
            id: user.teacher_number
        }
    } else if (req.user_type === 'Student') {
        user = await studentQueries.getUserByStudentID(req.user_id);
        newUser = {
            firstName: user.user.firstname,
            lastName: user.user.lastname,
            email: user.user.email,
            id: user.student_number
        }
    } else {
        user = await userQueries.getUserById(req.user_id);
        newUser = {
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
        }
    }
    if (newUser !== null) {
        res.status(200).json(newUser);
    } else {
        res.status(500).send('Error');
    }
  };

module.exports = {
    getUserData
};