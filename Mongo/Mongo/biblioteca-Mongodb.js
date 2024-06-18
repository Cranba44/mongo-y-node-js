// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// * $eq Matches values that are equal to a specified value.
// * $gt Matches values that are greater than a specified value.
// * $gte Matches values that are greater than or equal to a specified value.
// * $in Matches any of the values specified in an array.
// * $lt Matches values that are less than a specified value.
// * $lte Matches values that are less than or equal to a specified value.
// * $ne Matches all values that are not equal to a specified value.
// * $nin Matches none of the values specified in an array.

// ! -1- The current database to use.
use("cinema");

// ! -2- Obtener todos los registros.
db.usuario.find();

// ! -3- Obtener un registro con filtro y mostrar nombre:
// db.usuario.find({age:35}, {_id:0, name:1});

// ! -4- Obtener un solo registro con limit:
// db.usuario.find().limit(1);

// ! -5- Obtener un intervalo de registro usando skip y limit:
// db.usuario.find().skip(1).limit(1);

// ! -6- Insertar un registro:
// db.usuario.insertOne({ name: "Héctor Mariscal", age: 12});

// ! -7- Insertar varios usuarios:
// db.usuario.insertMany([
// {name: "Ejemplo 3", age:10},
// {name: "Ejemplo 4", age:40},
// ]);

// ! -8- Actualizar un registro ---> RECORDAD: Actualiza el primer registro de la condición:
// db.usuario.updateOne({ age: 10}, {$set: {name: "Soy el nombre nuevo"}});

// ! -9- Actualizar varios registros:
// db.usuario.updateMany({ age: 10}, { $set: {name: "Soy el nombre many"}});

// ! -10- Ordenar registros por edad de menor a mayor:
// db.usuario.find().sort({age:1});

// ! -11- Ordenar los usuarios entre un rango de dos fechas:
// db.usuario.find({age:{$gte: 20, $lte: 30}});

// ! -12- Operador AND en este caso obtener los usuarios que sean mayor o igual que 30 y de Alemania
// db.usuario.find({ $and: [{ age: {$gte:30} }, {country: "Alemania"}]});

// ! -13- Operador OR en este caso obtener los usuarios que sean mayor o igual que 30 o de Alemania
// db.usuario.find({ $or: [{ age: {$gte:30} }, {country: "Alemania"}]});

// ! -14- Suma 4 años al usuario que tenga 30 años:
// db.usuario.updateMany({ age:30 }, { $inc:{age: + 4 }});

// ! -15- Resta 4 años al usuario que tenga 30 años:
// db.usuario.updateMany({ age:34}, { $inc: { age: -4}});

// ! -16- Encuentra un elemento y también modificalo. El parámetro New:true nos lo devuelve actualizado:
// db.usuario.findOneAndUpdate (
//     {name: "Ejemplo 2"},
//     {$set: { age: 50}},
//     {new: true}
// )

// ! -17- Uso de la función aggregate (en este caso usamos $unwind para desgranar el array platos)
// db.restaurante.aggregate([
//     {
//         $unwind: "$platos"
//     },
//     {
//         $project: {
//             _id:0,
//             nombre:1,
//             plato:"$platos",
//         }
//     },
//     {
//         $limit: 6
//     }
// ]);

// ! -18- Usar la funcion aggregate con group by

// db.restaurante.aggregate([
//     {
//         $group: {
//             _id: "$tipo",
//             cantidad_rest: { $sum: 1}
//         }
//     },
// ]);

// db.restaurante.aggregate([
//     {
//         $group: {
//             _id: "$tipo",
//             avg: { $avg:"$puntuacion"}
//         }
//     }
// ])

// ! -19- Obtener la cantidad de platos por tipo de plato y por tipo de restaurante que no sean tiramisu y la cantidad sea mayor o igual a 3.
// db.restaurante.aggregate([
//     {
//         $group: {
//             _id: { tipo:"$tipo", plato:"$platos"}, cantidad: {$sum: 1}
//         }
//     },
//     {
//         $match: {
//             platos: {she:"Tiramisú"}
//         }
//     },
//     {
//         $project: {
//             _id: 0,
//             tipo: "$_id.tipo",
//             plato:"$_id.plato",
//             cantidad:"$cantidad"
//         }
//     },
//     {
//         $sort: {cantidad:-1 , tipo:1, plato:1}
//     }
// ]);

// ! -20- Obtener resultados que empiecen por "It", usando $regex y options "i" para que no sea sensible a mayus ni minus
// db.restaurante.find({tipo: { $regex: /^It/ , $options:"i" }})

// ! -21- Obtener resultados que contienen "ali" en un string:
// db.restaurante.find({ tipo: { $regex: /ali/, $options: "i" } });

// ! -22- Obtener los resultados que terminan en "ano":
// db.restaurante.find({ tipo: { $regex: /ano$/, $options: "i" } });

// ! -23- Obtener los resultados que contengan México
// db.restaurante.find({ "direccion.calle": { $regex: /México/, $options: "i"}});

// ! -24- Añade // elimina valores sustituyendo los existentes:
// $set
// $unset
// ! -25- Añade a un array si no existe:
// $addToSet
// ! -26- añade un valor al array exista o no:
// $push
// ! -27- Quita el valor que le indiquemos:
// $pull

// ! -28- Redondear y como opcion pasarle la cantidad de decimales en el caso que no, se redondea.
// {$round: ["$variable"]}  (Redondeado normal)
// {$round: ["$variable", 2]} (redondeado con 2 decimales)
