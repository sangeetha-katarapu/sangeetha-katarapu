import { Router } from 'express';
import commonController from '../controllers/commonController';

class commonRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/commonUrl', commonController.commonFunctions);
        this.router.post('/users', commonController.userFunctions);
    }
}

const commonRouters = new commonRoutes();
export default commonRouters.router