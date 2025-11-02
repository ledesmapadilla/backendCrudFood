import Usuario from "../models/usuarios.js";
import bcrypt from "bcryptjs";

export const creaUsuario = async (req, res) => {
  try {
    const saltos = bcrypt.genSaltSync(10);
    const passwordEncriptado = bcrypt.hashSync(req.body.password, saltos);

    req.body.password = passwordEncriptado;

    const usuarioNuevo = new Usuario(req.body);
    await usuarioNuevo.save();
    res.status(201).json({
      mensaje: `Usuario creado con exito`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Ocurrio un error, no se pudo crear el usuario",
    });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Ocurrio un error, no se pudo lista los usuarios",
    });
  }
};
