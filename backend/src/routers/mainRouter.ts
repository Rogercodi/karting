import { NextFunction, Request, Response, Router } from "express";
import { mainController } from "../controllers/mainControllers";
import { SignupController } from "../controllers/signupController";
import { LoginController } from "../controllers/loginController";
import { checkToken } from "../middlewares/checkToken";

const router = Router();

const mainRouterController = new mainController()
router.get('/home', checkToken, mainRouterController.getTest.bind(mainRouterController));

const postUserController = new SignupController();
router.post('/postuser', postUserController.postUser.bind(postUserController));

const getUserController = new LoginController();
router.post('/getuser', getUserController.login.bind(getUserController))

export default router