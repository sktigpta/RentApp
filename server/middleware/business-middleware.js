const businessMiddleware = async (req, res, next) => {
    try {
        const isBusiness = req.user.isBusiness;

        if (!isBusiness) {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = businessMiddleware;
