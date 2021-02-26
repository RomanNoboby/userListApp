import homeRouter from "./home";
import userApiRouter from "./userApi";

const initRoutes = function(app) {
    app.use('/', homeRouter);
    app.use('/api/users', userApiRouter);
}
export default initRoutes;