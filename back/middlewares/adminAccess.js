const jwt = require('jsonwebtoken');

exports.adminToken = async (request, response, next) => {
    let token = request.get("Authorization");
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7);
    }
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            request.user_id = decoded.user_id;
            request.user_type = decoded.type;
            if (request.user_type === 'Admin') {
                next();
            } else {
                return response.status(401).json({error: 'You are not an admin'});
            }
        }
        catch {
            return response.status(401).json({error: 'Invalid token'});
        }
    } else {
        return response.status(401).json({error: 'No token provided'});
    }
}
