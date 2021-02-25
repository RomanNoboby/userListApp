import indexRouter from "./home";
import userApiRouter from "./userApi";

const initRoutes = function(app) {
    app.use('/', indexRouter);
    app.use('/api/users', userApiRouter);
}
export default initRoutes;