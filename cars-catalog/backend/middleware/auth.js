module.exports = {
    ensureAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect(`${process.env.FRONTEND_HOST}/`);
        }
    }, 
    // if user login => don't show login page
    ensureGuest: (req, res, next) => {
        if(req.isAuthenticated()){
            res.redirect(`${process.env.FRONTEND_HOST}/dashboard`);
        }else {
            return next();
        }
    }
};