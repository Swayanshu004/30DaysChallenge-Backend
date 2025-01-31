import jwt from "jsonwebtoken";

function authMiddlewareAdmin(req, res, next){
    const authHeader = req.header("authorization");
    try {
        const decoded = jwt.verify(authHeader,process.env.JWT_SECRET_ADMIN);
        if(decoded.adminId){
            req.adminId = decoded.adminId;            
            return next();
        } else {
            return res.status(401).json({mesasage: "no admin found ! !"});
        }
    } catch (error) {
        return res.status(401).json({mesasage: "no admin found ! !"});
    }
}
function authMiddlewareUser(req, res, next){
    const authHeader = req.headers["authorization"];
    try {
        const decodedCreator = jwt.verify(authHeader, process.env.JWT_SECRET_USER);
        if(decodedCreator.userId){
            req.userId = decodedCreator.userId;
            return next();
        } else {
            return res.status(401).json({mesasage: "no user found ! "});
        }
    } catch (error) {
        return res.status(401).json({mesasage: "no user found ! !"});
    }
}

export {
    authMiddlewareAdmin,
    authMiddlewareUser
}