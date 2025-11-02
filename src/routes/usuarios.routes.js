import { Router } from "express";
import { creaUsuario, listarUsuarios } from "../controllers/usuarios.controllers.js";



const router = Router();

router.route(`/`).post(creaUsuario).get(listarUsuarios);

export default router;
