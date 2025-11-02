import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import Producto from "../models/producto.js";

const validacionProducto = [
  body("nombreProducto")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres")
    .custom(async (valor, { req }) => {
      const productoExistente = await Producto.findOne({
        nombreProducto: valor,
      });

      if (!productoExistente) {
        return true;
      }

      if (
        req.params?.id &&
        productoExistente._id.toString() === req.params.id
      ) {
        return true;
      }

      throw new Error("El nombre del producto ya existe");
    }),

  body("precio")
    .notEmpty()
    .withMessage("El precio del producto es obligatorio")
    .isNumeric()
    .withMessage("El precio del producto debe ser un número")
    .isFloat({ min: 100, max: 1000000 })
    .withMessage(
      "El precio del producto de estar entreo 100 y 1000000 pesos argentinos"
    ),

  body("descripcion_breve")
    .notEmpty()
    .withMessage("La desccripcion breve es un  dato obligatorio")
    .isLength({ min: 5, max: 250 })
    .withMessage("La descripcion breve debe tener entre 5 y 250 caracteres"),

  body("descripcion_amplia")
    .notEmpty()
    .withMessage("La desccripcion amplia es un  dato obligatorio")
    .isLength({ min: 5, max: 250 })
    .withMessage("La descripcion amplia debe tener entre 10 y 500 caracteres"),

  body("categoria")
    .notEmpty()
    .withMessage("La categoria es un  dato obligatorio")
    .isIn([
      "Acompañamientos",
      "Ensaladas",
      "Hamburguesas",
      "Postres",
      "Pizzas",
      "Sándwiches y Wraps",
      "Veggie/Veganas",
    ])
    .withMessage("La categoria debe ser uno de los terminos predeterminado")

    .isLength({ min: 5, max: 250 })
    .withMessage("La descripcion amplia debe tener entre 10 y 500 caracteres"),

  body("imagen")
    .notEmpty()
    .withMessage("La imagen es un dato obligatorio")
    .matches(
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\.(jpg|jpeg|png|webp))$/
    )
    .withMessage(
      "La imagen debe cumplir con la url de una imagen, terminada en jpg, jpeg, png o webp"
    ),

  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionProducto;
