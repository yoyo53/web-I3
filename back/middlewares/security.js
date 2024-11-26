const jwt = require('jsonwebtoken');

exports.verifyToken = async (request, response, next) => {
    let token = request.get("Authorization");
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7);
    }
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
        return response.status(401).json({error: 'No token provided'});
    }
}
