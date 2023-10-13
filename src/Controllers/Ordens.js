const Ordens = require("../Models/Ordens");

const createOrden = async (req, res) => {
    try{
        const Orden = req.body
        const newProducto = await Ordens.create(Orden);
        
        return res.json({
            success: true,
            data: newProducto,
            message: "Orden Guardada exitosamente"
        })
    }catch(error) {
        console.log(error);
        return res.json({
            success: false,
            message: "La orden no se pudo crear",
            error: error
        });
    }
}

const getUserOrden = async (req, res) => {
    const IdProducto = req.params.id;
    try{
        const productos = await Ordens.find({idUsuario: IdProducto});
        return res.json({
            success: true,
            data: productos
        });

    }catch(error){
        return res.jason({
            success: true,
            data: error.message,
            message: "Ordenes no traidos"
        })
    }
}


const deleteOrden = async (req, res) => {
    try{
        const ordenEliminada = await Ordens.findByIdAndDelete(req.params.id);

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

module.exports = {createOrden,getUserOrden,deleteOrden}