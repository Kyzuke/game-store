import { Request, Response, NextFunction } from "express";

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        console.log(req.isAuthenticated());
        return next();
    }
    console.log(req.isAuthenticated());
    return res.status(401).redirect("/account/login");
}
export { ensureAuthenticated };
