import { Router } from "express";
import validacionProducto from "../middlewares/validacionProducto.js";
import validacionIdProducto from "../middlewares/validacionIdProducto.js";
import verificarJWT from "../middlewares/verificarToken.js";

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
router
  .route(`/`)
  .post([verificarJWT, validacionProducto], crearProducto)
  .get(listarProductos);
router
  .route(`/:id`)
  .get(validacionIdProducto, obtenerProducto)
  .delete([verificarJWT, validacionIdProducto], borrarProducto)
  .put(
    [verificarJWT, validacionIdProducto, validacionProducto],
    editarProductoPorID
  );

export default router;
