// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("restaurantes");

// Create a new document in the collection.
// db.getCollection('restaurante').insertOne({

// });

// db.restaurante.find();

// 1- Encuentra todos los restaurantes italianos.
// db.restaurante.find({ tipo: "Italiano"});

// 2- Encuentra el restaurante con la puntuación más alta.
// ! RECUERDA!!! -1 busca el mayor y 1 busca el menor!
// db.restaurante.find().sort({puntuacion:-1}).limit(1)

// 3- Encuentra todos los restaurantes que estén abiertos los sábados.
// ! RECUERDA!! Para concatenar utilizamos las " y el . "
// db.restaurante.find({"horario.sabado": {$ne:"Cerrado"}})

// 4- Encuentra todos los restaurantes que sirvan pizza.
// db.restaurante.find({ platos: { $in: ["Pasta Carbonara"] } });
// db.restaurante.find({ platos: "Pizza Margherita" });

// 5- Encuentra los nombres y direcciones de los restaurantes que estén en la provincia "Provincia A".
// db.restaurante.find(
//   { "direccion.provincia": "Provincia A" },
//   { _id: 0, nombre: 1, "direccion.calle": 1 }
// );

// db.restaurante.find()
// -----------------

// 4- Cuantos restaurantes hay por ciudad

// db.restaurante.find({},{_id:0, nombre:1, "direccion.ciudad":1})

// db.restaurante.aggregate([
//   {
//     $group: {
//       _id: "$direccion.ciudad",
//       cantidad: { $sum: 1 },
//     },
//   },
//   {
//     $project: {
//       _id: 0,
//       ciudad: "$_id",
//       cantidad: "$cantidad",
//     },
//   },
// ]);

// 5- Obtener los nombres y puntuaciones de los restaurantes que tienen una puntuacion superior a 4.5. Usando operador aggregate

// db.restaurante.aggregate([
//   {
//     $unwind: "$puntuacion",
//   },
//   {
//     $match: {
//         puntuacion: { $gt: 4.5 }
//     }
//   },
//   {
//     $project: {
//       _id: 0,
//       nombre: 1,
//       puntuacion: "$puntuacion",
//     },
//   },
//   {
//     $sort: {
//         puntuacion:-1}
//     }
// ]);

// 6- Obtener el numero de restaurantes italianos usando el operador aggregate , donde nos devuelva el tipo y la cantidad.

// db.restaurante.aggregate([
//     {
//         $match: {
//             tipo:"Italiano"
//         }
//     },
//     {
//         $group: {
//             _id: "$tipo",
//             cantidad: { $sum:1}
//         }
//     },
//     {
//         $project: {
//             _id:0,
//             tipo:"$_id",
//             cantidad: "$cantidad"
//         }
//     }
// ])

db.restaurante.find({ "direccion.calle": { $regex: /México|sabor/ } });

// Contar la cantidad de platos que tiene un array y filtrar con el $match
// db.restaurante.aggregate([
//   {
//     $project: {
//       nombre: 1,
//       numPlatos: { $size: "$platos" },
//     },
//   },
//   {
//     $match: {
//       numPlatos: { $gt: 3 },
//     },
//   },
// ]);

// concatenar valores
// db.restaurante.aggregate([
//   {
//     $project: {
//       nombre_calle: {
//         $concat: ["$nombre", " ", "$direccion.calle"],
//       },
//     },
//   },
// ]);

// db.restaurante.find(
//   {},
//   {
//     nombre_completo: {
//       $concat: ["$nombre", " Moreno"],
//     },
//   }
// );

// Crear un array con todos los platos de todos los restaurantes en este caso lo añade aunque si no existe

// $addToSet -> Añade a un array si no existe
// $push añade un valor al array exista o no
// $pull Quita el valor que le indiquemos

// db.restaurante.aggregate([
//     {
//         $unwind: "$platos"
//     },
//   {
//     $group: {
//       _id: null,
//       totalPlatos: { $addToSet: "$platos" },
//     },
//   },
// ]);
