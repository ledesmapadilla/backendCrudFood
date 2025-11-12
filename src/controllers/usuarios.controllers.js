import Usuario from "../models/usuarios.js";
import bcrypt from "bcryptjs";
import  generarJWT  from "../middlewares/generarjwt.js";

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

export const loguin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuarioBuscado = await Usuario.findOne({ email: req.body.email });
    /* si no encuentra al usuario  */
    if (!usuarioBuscado) {
      return res.status(404).json({
        mensaje: "El usuario no existe",
      });
    }
    /* si el usuario existe, entonces verificamos la contraseña */

    const passwordValido = bcrypt.compareSync(
      password,
      usuarioBuscado.password
    );

    /* si la contraseña no es valida  */
    if (!passwordValido) {
      return res.status(401).json({
        mensaje: "Contraseña invalida",
      });
    }

    /* aca voy a generar el token */
    const token = generarJWT(usuarioBuscado.nombreUsuario, email);

    /* si el email existe y la contraseña es valida */

    res.status(200).json({
      mensaje: "Usuario logueado correctamente",
      usuario: usuarioBuscado.nombreUsuario,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Ocurrio un error, no se pudo loguear el usuario",
    });
  }
};
