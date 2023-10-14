const Producto = require('../Models/Productos');

const getProductos = async (req, res) => {
    const vendedorId = req.params.id;
    console.log(vendedorId);
    try{
        const productos = await Producto.find({id_vendedor: vendedorId});
        return res.json({
            success: true,
            data: productos
        });

    }catch(error){
        return res.jason({
            success: true,
            data: error.message,
            message: "Productos no traidos"
        })
    }
}

const getProductosStore = async (req, res) => {
    const vendedorId = req.params.id;
    console.log(vendedorId);
    try{
        const productos = await Producto.find();
        return res.json({
            success: true,
            data: productos
        });

    }catch(error){
        return res.jason({
            success: true,
            data: error.message,
            message: "Productos no traidos"
        })
    }
}

const getOneProducto = async (req, res) => {
    const IdProducto = req.params.id;
    try{
        const productos = await Producto.find({_id: IdProducto});
        return res.json({
            success: true,
            data: productos
        });

    }catch(error){
        return res.jason({
            success: true,
            data: error.message,
            message: "Productos no traidos"
        })
    }
}

const createProducto = async (req, res) => {
    try{
        const producto = req.body
        const newProducto = await Producto.create(producto);
        
        return res.json({
            success: true,
            data: newProducto,
            message: "Producto creado exitosamente"
        })
    }catch(error) {
        console.log(error);
        return res.json({
            success: false,
            message: "El producto no se pudo crear",
            error: error
        });
    }
}

const updateProducto = async (req, res) => {
    try {
        const actualizarProducto = await Producto.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json({
            success: true,
            data: actualizarProducto,
            message: "Producto actualizado exitosamente"
        })
    }catch(error){
        return res.json({
            success: false,
            message: `No se pudo actualizar el producto ${error.message}`
        })
    }
}

const deleteProducto = async (req, res) => {
    try{
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);

        return res.json({
            success: true,
            message: `El producto con id(${req.params.id}) se ha eliminado correctamente`
        })
    }catch(error){
        return res.json({
            success: false,
            message: `EL producto no pudo ser eliminado por: ${error.message}`
        })
    }
}

const updateStok = async (req, res) => {
   const productos = req.body.productos
   if (!Array.isArray(productos)) {
    return res.status(400).json({
      success: false,
      message: "La solicitud debe contener una matriz de productos en el campo 'productos'."
    });
  }

    try {
        for (const item of productos){
            const producto = await Producto.findById(item.idProducto);
            if(producto) {
                producto.stok -= item.qty;
                await producto.save();
            }
        }
        
        return res.json({
            success: true,
            message: "El stock se actualizo correctamente"
        })
    }catch (error){
        return res.json({
            success: false,
            message: "El producto no se pudo actualizar el stock" + error,
            error: error
        })
    }
}



module.exports = {
    createProducto,
    getProductos,
    updateProducto,
    deleteProducto,
    getProductosStore,
    getOneProducto,
    updateStok
}