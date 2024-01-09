const sessionCheck = (req, res, next) => {
    if (req.session.userID) {
        
        next()
    } else {
        return res.json({valid:false})
    }
}

export default sessionCheck