import mongoose, { Schema } from "mongoose";

const productoSchema = new Schema(
  {
    nombreProducto: {
      type: String,
      minLength: 2,
      maxLength: 100,
      required: true,
      unique: true,
    },
    precio: {
      type: Number,
      min: 100,
      max: 1000000,
      required: true,
    },
    categoria: {
      type: String,
      enum: [
        "Acompañamientos",
        "Ensaladas",
        "Hamburguesas",
        "Postres",
        "Pizzas",
        "Sándwiches y Wraps",
        "Veggie/Veganas",
      ],
      required: true,
    },
    descripcion_breve: {
      type: String,
      minLength: 5,
      maxLength: 250,
      required: true,
    },

    descripcion_amplia: {
      type: String,
      minLength: 10,
      maxLength: 500,
      required: true,
    },
    imagen: {
      type: String,
      required: true,
      validate: {
        validator: (valor) => {
          return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\.(jpg|jpeg|png|webp))$/.test(
            valor
          );
        },
      },
    },
  },

  {
    timestamps: true,
  }
);

const Producto = mongoose.model(`producto`, productoSchema);

export default Producto;
