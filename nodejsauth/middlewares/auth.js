const { getUser } = require("../service/auth");
async function restrictToLoggedinUserOnly (req, res, next){
    const userUuid = req.cookies?.sessionID;

    if(!userUuid) {
        return res.status(401).redirect("/login");
    }

    const user = await getUser(userUuid);
    if(!user) {
        return res.status(401).redirect("/login");
    }
    req.user = user;
    next();
}




module.exports = {
    restrictToLoggedinUserOnly
}