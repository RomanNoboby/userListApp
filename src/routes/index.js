import homeRouter from "./home";
import auth from "./auth";
import userRouter from './user'

const initRoutes = function(app, passport) {
    app.use('/', homeRouter);
    app.use('/user', userRouter);
    app.use('/',auth(passport));
}
export default initRoutes;