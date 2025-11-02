import { param } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
/* import Producto from "../models/producto.js"; */

const validacionIdProducto = [
  param("id")
    .isMongoId()
    .withMessage("El ID no corresponde a un formato de mongoDB"),

  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionIdProducto;
