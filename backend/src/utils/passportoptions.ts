import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../model/userModel";
import { sendTokenEmailLogin } from "./emailoptions";
import { authenticateToken } from "./tokengen";

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await UserModel.findOne({
                where: { username: username },
            });
            if (!user) {
                return done(null, false, { message: "Incorrect username." });
            }
            if (!(await user.comparePassword(password))) {
                return done(null, false, { message: "Incorrect password." });
            }
            const token = authenticateToken(user.secret);

            sendTokenEmailLogin(user.email, token);
            console.log(token);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findOne({ where: { id } });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;
