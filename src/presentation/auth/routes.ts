import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middleware/auth.middleware";




export class AuthRoutes{


    static get routes(): Router{
        
        const router = Router();
        const dataSource = new AuthDataSourceImpl;
        const authRepository = new AuthRepositoryImpl(dataSource);
        const controller = new AuthController(authRepository);

        //RUTAS PRINCIPALES
        router.post('/login', controller.loginUser)
        router.post('/register', controller.registerUser)
        router.get('/', [AuthMiddleware.validateJWT], controller.getUser)

        return router;
    }

}