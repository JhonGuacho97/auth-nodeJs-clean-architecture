import { Router } from "express";
import { AuthController } from "./controller";




export class AuthRoutes{


    static get routes(): Router{
        
        const router = Router();
        const controller = new AuthController();

        //TODO: definir todas las rutas principales
        router.post('/login', controller.loginUser)
        router.post('/register', controller.registerUser)

        return router;
    }

}