import { Router } from "express";
import validacionProducto from "../middlewares/validacionIdProducto.js";
import validacionIdProducto from "../middlewares/validacionIdProducto.js";

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
router.route(`/`).post(validacionProducto, crearProducto).get(listarProductos);
router
  .route(`/:id`)
  .get(validacionIdProducto, obtenerProducto)
  .delete(validacionIdProducto, borrarProducto)
  .put([validacionIdProducto, validacionProducto], editarProductoPorID);

export default router;
