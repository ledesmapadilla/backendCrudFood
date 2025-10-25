import { Router } from "express";
import {
  prueba,
  crearProducto,
  listarProductos,
  obtenerProducto,
  borrarProducto,
  editarProductoPorID,
} from "../controllers/productos.controllers.js";

const router = Router();

router.route(`/test`).get(prueba);
router.route(`/`).post(crearProducto).get(listarProductos);
router.route(`/:id`).get(obtenerProducto).delete(borrarProducto).put(editarProductoPorID)

export default router;
