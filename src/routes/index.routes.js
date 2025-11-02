import { Router } from "express";
import productosRoutes from "./productos.routes.js"
import usuariosRouter from "./usuarios.routes.js";


const router = Router()

router.use (`/productos`, productosRoutes)
router.use (`/usuarios`, usuariosRouter)

export default router