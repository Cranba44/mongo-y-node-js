// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("clinica_veterinaria");

// Create a new document in the collection.
// db.getCollection('animales').insertOne({

// });

db.animales.find();

// ! -1- Obtener los animales que sean de tipo Perro y tengan un precio de 50.

db.animales.find({ tipo: "Perro", precio: 50 });

// ! -2- Obtener el nombre y raza de los animales que sean mayores de 3 años y pesen menos de 10 kilos.

// db.animales.find(
//     {
//         "edad": { $gt: 3 },
//         "peso": { $lt: 10 }
//     },
//     {
//         "_id": 0,
//         "nombre": 1,
//         "raza": 1
//     }
// )

// ! -3- Obtener nombre y raza de los perros que se han vacunado 3 veces en nuestra clínica.

// db.animales.find(
//     {
//         "tipo": "Perro",
//         "historico_vacunas": { $size: 3 }
//     },
//     {
//         "_id": 0,
//         "nombre": 1,
//         "raza": 1
//     }
// )

// ! -4- Obtener el nombre de los animales que tengan una consulta con el texto "Le duele la pata derecha".

// db.animales.find (
//     {
//     "consulta": "Le duele la pata derecha"},
//     {
//     "_id": 0, "nombre": 1
//     }
// )

// ! -5- Obtener el nombre y raza de los animales que se han vacunado contra el Parvovirus.

// db.animales.find(
//   {
//     "historico_vacunas.tipo": "Parvovirus",
//   },
//   {
//     _id: 0,
//     nombre: 1,
//     raza: 1,
//   }
// );

// ! -6- Obtener el nombre y raza de los animales vacunados en el año 2023.

// db.animales.find(
//   {
//     "historico_vacunas.fechaVacuna": {
//         $gte: "2023-01-01",
//         $lt: "2023-12-31"
//     },
//   },
//   {
//     _id: 0,
//     nombre: 1,
//     raza: 1,
//   }
// );

// ! -7- Obtener la consulta más reciente.

// db.animales.find().sort({ fechaRegistro: -1 }).limit(1)

// ! -8- Obtener la cantidad de perros que se han vacunado contra el Moquillo.

// db.animales.count({
//     "tipo": "Perro",
//     "historico_vacunas.tipo": "Moquillo"
// })

// ! -9- Obtener el nombre y raza de los animales que tengan una consulta con el texto "Le duele la pata derecha" y tengan un precio de 50.

// db.animales.find (
//     {
//     "consulta": "Le duele la pata derecha",
//     "precio": 50
//     },
//     {
//     "_id": 0, "nombre": 1, "raza": 1
//     }
// )

// ! -10- Obtener el nombre y raza de los animales que tengan una edad superior a 5 años o un precio superior a 50.

// db.animales.find({ $or: [{ age: {$gt:5} }, {precio: {$gt:50}}]},
// {"_id":0, "nombre": 1, "raza": 1});

// ! -11- Obtener nombre y cantidad de animales por tipo.

// db.animales.aggregate([
//   {
//     $group: {
//       _id: "$tipo",
//       cantidad: { $sum: 1 },
//     },
//   },
//   {
//     $project: {
//       _id: 0,
//       tipo: "$_id",
//       cantidad: "$cantidad",
//     },
//   },
// ]);

// ! -12- Obtener la media del precio de consultas de los animales de tipo Perro y mostrarlo con el símbolo de euro.

// db.animales.aggregate([
//     {
//         $group: {
//             _id: "$tipo",
//             media: { $avg: "$precio" }
//         }
//     },
//     {
//         $match: {
//             _id: "Perro"
//         }
//     },
//     {
//         $project: {
//             _id: 0,
//             tipo: "$_id",
//             media: {
//                 $concat: [ { $toString: "$media" }, " €" ]
//             }
//         }
//     }
// ])

// ! -13- Obtener la media de edad de los gatos.

// db.animales.aggregate([
//     {
//         $match: {
//             tipo: "Gato"
//         },
//     },
//     {
//         $group: {
//             _id: 0,
//             media: { $avg: "$edad"},
//         },
//     },
//     {
//         $project: {
//             _id: "$tipo",
//             tipo: "Gato",
//             media: {$round: ["$media", 2]},
//         }
//     }
// ]);

// ! -14- Añadir un historial de vacunas a Paco con fecha actual y tipo de vacuna "Rabia Avanzada".

// db.animales.updateOne(
//     { "nombre": "Paco" },
//     {
//         $push: {
//             "historico_vacunas": {
//                 "fechaVacuna": new Date(),
//                 "tipo": "Rabia Avanzada"
//             }
//         }
//     }
// )

// ! -15- Hacer una rebaja de 10€ al precio de Paco.

// db.animales.updateOne({ nombre: "Paco" }, { $inc: { precio: -10 } });

// ! -16- Eliminar a Paco de la base de datos.

// db.animales.deleteOne({ nombre: "Paco" })

// ! -17- Obtener la media del historial de vacunas de los perros.

// db.animales.aggregate([
//     {
//         $match: { tipo: "Perro" }
//     },
//     {
//         $project: {
//             historico_vacunas: {$size: "$historico_vacunas"}
//         }
//     },
//     {
//         $group: {
//             _id: null,
//             media_vacunas: { $avg: "$historico_vacunas" }
//         }
//     },
//     {
//         $project: {
//             _id: 0,
//             media_vacunas: {$round: ["$media_vacunas", 2]},
//         }
//     }
// ])

// ! -18- Obtener el animal con más vacunas.

// db.animales.aggregate([
//   {
//     $project: {
//       _id: 0,
//       nombre: 1,
//       historico_vacunas: { $size: "$historico_vacunas" },
//     },
//   },
//   {
//     $sort: { total_vacunas: -1 },
//   },
//   {
//     $limit: 1,
//   },
// ]);

// ! -19- Buscar en notasAdicionales la palabra "dieta" y obtener el nombre y raza de los animales que la contengan.

// db.animales.find({ "notasAdicionales": { $regex: /dieta/, $options: "i"}},
//     { "_id": 0, "nombre": 1, raza: 1 }
// );

// ! -20- Obtener el penúltimo animal más viejo.

// db.animales.aggregate([
//   {
//     $sort: { edad: -1 },
//   },
//   {
//     $skip: 1,
//   },
//   {
//     $limit: 1,
//   },
// ]);

// ! -21- Obtener la cantidad de colores que hay de cada uno, donde la cantidad sea superior a 1.

// db.animales.aggregate([
//     {
//         $group: {
//             _id: "$color",
//             cantidad:  { $sum: 1}
//         }
//     },
//     {
//         $match: {
//             cantidad: { $gt: 1}
//         }
//     }
// ])

// ! -22- Encontrar todos los animales que tengan una edad entre 2 y 5 años.

// db.animales.find({edad:{$gte: 2, $lte: 5}},
//     {"_id": 0, "tipo": 1}
// );

// ! -23- Eliminar el atributo precio del animal "Firulais".

// db.animales.updateOne(
//     { "nombre": "Firulais" },
//     { $unset: { "precio": "" } }
// )

// ! -24- Calcular cuánto ha facturado la clínica en total.
// db.animales.aggregate([
//     {
//         $group: {
//             _id: null,
//             totalFacturado: { $sum: "$precio" }
//         }
//     },
// {
//     $project:
//     {
//         _id: 0
// },
// }
// ])

// ! -25- Encontrar la edad máxima y mínima de los perros.

// db.animales.aggregate([
//   { $match: { tipo: "Perro" } },
//   { $group: { _id: null, max: { $max: "$edad" }, min: { $min: "$edad" } }},

//   {
//   $project: {
//   _id: 0,
//   tipo: 1,
//   max: 1,
//   min: 1,
//   },
//   },
//  ]);

// ! -26- Encontrar todos los perros ordenados por peso de forma descendente.
// db.animales
//   .find({ tipo: "Perro" }, { _id: 0, tipo: 1, nombre: 1, peso: 1 })
//   .sort({ peso: -1 });

// ! -27- Encontrar el promedio del precio de consultas por tipo de animal, mostrando solo dos decimales.

// db.animales.aggregate([
//   {
//     $group: {
//       _id: "$tipo",
//       preciomedio: { $avg: "$precio" }
//     }
//   },
//   {
//     $project: {
//       _id: 0,
//       tipo: "$_id",
//       preciomedio: { $round: ["$preciomedio", 2] }
//     }
//   }
// ]);
