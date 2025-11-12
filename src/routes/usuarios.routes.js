import { Router } from "express";
import { creaUsuario, listarUsuarios, loguin } from "../controllers/usuarios.controllers.js";



const router = Router();

router.route(`/`).post(creaUsuario).get(listarUsuarios);
router.route(`/login`).post(loguin)

export default router;
