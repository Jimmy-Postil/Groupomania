const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(' ')[1];
        console.log(token);
        const decodedToken = jwt.verify(token, 'RANDOM TOKEN SECRET');
        console.log(decodedToken);
        req.user = decodedToken;
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
    return next();
};