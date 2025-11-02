import Producto from "../models/producto.js";

export const prueba = (req, res) => {
  console.log(" Desde el controlador de prueba");

  res.send(`Prueba desde controlador`);
};

export const crearProducto = async (req, res) => {
  try {
    /*1- verificar que llegar los datos validados 
2- Pedir al modelo Producto crear el objeto en la base de datos*/
    console.log(req.body);

    const productoNuevo = new Producto(req.body);

    await productoNuevo.save();

    res.status(201).json({
      mensaje: ` El producto fue creado exitosamente`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: `Ocurrio un error al crear el producto`,
    });
  }
};

export const listarProductos = async (req, res) => {
  try {
    /* Busco todos los productos que estan en el modelo Producto  */
    const producto= await Producto.find()
/* envio al cuerpo del postman el array con los productos encontrados */
    res.status(200).json (producto)

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: `Ocurrio un error al listar los productos`,
    });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const productoBuscado= await Producto.findById (req.params.id)
    if(!productoBuscado){
      return res.status (404).json({
        mensaje: "no se encontro el producto buscado"
      })
    }

    res.status(200).json (productoBuscado)

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: `Ocurrio un error al buscar el producto`,
    });
  }
};

export const borrarProducto = async (req, res) => {
  try {
    const productoBuscado= await Producto.findById (req.params.id)
    if(!productoBuscado){
      return res.status (404).json({
        mensaje: "no se encontro el producto buscado"
      })
    }

    await Producto.findByIdAndDelete(req.params.id)
    res.status(200).json({mensaje:`el producto se borro exitosamente`})

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: `Ocurrio un error al buscar el producto`,
    });
  }
};

export const editarProductoPorID= async (req, res) => {
  try {
    const productoBuscado= await Producto.findById (req.params.id)
    if(!productoBuscado){
      return res.status (404).json({
        mensaje: "no se encontro el producto buscado"
      })
    }

    await Producto.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({mensaje:`el producto se edito exitosamente`})

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: `Ocurrio un error al editar el producto`,
    });
  }
};