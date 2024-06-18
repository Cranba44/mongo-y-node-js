/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// const database = 'tienda';
// const collection = 'NEW_COLLECTION_NAME';

// The current database to use.
use("tienda");

// Create a new collection.
// db.createCollection(collection);

db.moviles.find();

// ! EJ 1. Encuentra todos los productos con un precio mayor a 1000.

// db.moviles.find({ precio: { $gt: 1000 } });

// ! EJ 2. Obtén el producto con el precio más alto de la colección "productos"

// db.moviles.find().sort({ precio: -1 }).limit(1);

// ! EJ 3. Obtén todos los productos de la marca "Samsung" y que tenga 3 colores disponibles.

// db.moviles.find({ marca: "Samsung", coloresDisponibles: { $size: 3 } });

// ! EJ 4. Obtener la marca y modelo de los productos que tengan una cámara frontal con una resolución de 20MP, investiga “$elemMatch” .

// db.moviles.find(
//   {
//     "especificaciones.camaras": {
//       $elemMatch: {
//         tipo: "Frontal",
//         resolucion: "20MP",
//       },
//     },
//   },
//   {
//     marca: 1,
//     modelo: 1,
//     _id: 0,
//   }
// );

// ! EJ 5. Obtener los productos que cuesten más de 600 y tenga un tamaño de pantalla de 6.67

// db.moviles.find(
//     {
//       precio: { $gt: 600 },
//       "especificaciones.pantalla.tamaño": 6.67,
//     },
//     {
//       marca: 1,
//       modelo: 1,
//       _id: 0,
//       tamaño: "$especificaciones.pantalla.tamaño",
//       precio: 1,
//     }
//   );

// ! EJ 6. Obtener la cantidad de Iphone que hay en la coleccion.

// db.moviles.find( {marca: "Apple" }).count();

// ! EJ 7. Obtener la cantidad de productos que hay por cada marca, nombrado por Marca y cantidad.

// db.moviles.aggregate([
//   {
//     $group: {
//       _id: "$marca",
//       cantidad: { $sum: 1 },
//     },
//   },
//   {
//     $project: {
//       _id: 0,
//       Marca: "$_id",
//       cantidad: "$cantidad",
//     },
//   },
//   {
//     $sort: {
//       cantidad: -1,
//     },
//   },
// ]);

// ! EJ 8. Obtener la media de precio por marca, nombrado por marca y media.

// db.moviles.aggregate([
//     {
//         $group: {
//             _id: "$marca",
//             media: { $avg: "$precio" },
//         },
//     },
//     {
//         $project: {
//             _id: 0,
//             Marca: "$_id",
//             media: {$round: ["$media", 2] },
//         },
//     },
// ])

// ! EJ 9. Añadir a todos los “Samsung” un color nuevo (Violeta);

// db.moviles.updateMany(
//   { marca: "Samsung" },
//   {
//     $addToSet: { coloresDisponibles: "Violeta" },
//   }
// );
// db.moviles.find();

// ! EJ 10. Obtener todos los productos que tengan 12GB de RAM y color Azul

// db.moviles.find({"especificaciones.RAM": "12GB", coloresDisponibles: "Azul" });

// ! EJ 11. Cambiar los colores [ 'Negro', 'Blanco', 'Azul' ] del modelo “Find X5” de la marca “Oppo” por [”Verde”,”Amarillo”,”Rosa”].

// db.moviles.updateOne(
//   {
//     modelo: "Find X5",
//   },
//   {
//     $set: { coloresDisponibles: ["Verde", "Amarillo", "Rosa"] },
//   }
// );

// ! EJ 12. Obtener un listado con todos los comentarios que sean por encima o igual del 4.9
db.moviles.find();

// db.moviles.find({
//     "opiniones.puntuacion": {"$gte": 4.9}
// })

//-------2ª opcion-----

// db.moviles.aggregate([
//   {
//     $unwind: "$opiniones",
//   },
//   {
//     $match: {
//       "opiniones.puntuacion": { $gte: 4.9 },
//     },
//   },
//   {
//     $project: {
//       _id: 0,
//       usuario: "$opiniones.comentario",
//       comentario: "$opiniones.comentario",
//     },
//   },
// ]);

// ! EJ 13. Obten la cantidad de valoraciones del usuario "techenthusiast".

// db.moviles.find({ "opiniones.usuario": "techenthusiast" });

db.moviles.aggregate([
  {
    $match: {
      "opiniones.usuario": "techenthusiast",
    },
  },
  {
    $group: {
      _id: null,
      total_opiniones: {
        $sum: 1,
      },
    },
  },
]);

// ! EJ 14. Suma 200€ al precio de todos los productos de Apple.

db.moviles.updateMany({ marca: "Apple" }, { $inc: { precio: 200 } });

//database tienda: PARA CREARLA EN CASA.

// db.moviles.insertMany(
//     [
//       {
//         "nombre": "Smartphone",
//         "marca": "Samsung",
//         "modelo": "Galaxy S22",
//         "precio": 800,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.5,
//             "resolucion": "QHD+"
//           },
//           "sistemaOperativo": "Android",
//           "almacenamientoInterno": "128GB",
//           "camaras": [
//             { "tipo": "Principal", "resolucion": "48MP" },
//             { "tipo": "Frontal", "resolucion": "20MP" }
//           ],
//           "bateria": "5000mAh"
//         },
//         "coloresDisponibles": ["Negro", "Azul", "Blanco"],
//         "opiniones": [
//           {
//             "usuario": "user789",
//             "puntuacion": 4.5,
//             "comentario": "Gran calidad de la cámara"
//           },
//           {
//             "usuario": "mobilelover",
//             "puntuacion": 5,
//             "comentario": "Excelente rendimiento y duración de batería"
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "Apple",
//         "modelo": "iPhone 13",
//         "precio": 1000,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.1,
//             "resolucion": "Liquid Retina HD"
//           },
//           "sistemaOperativo": "iOS",
//           "almacenamientoInterno": "256GB",
//           "camaras": [
//             { "tipo": "Principal", "resolucion": "12MP" },
//             { "tipo": "Frontal", "resolucion": "12MP" }
//           ],
//           "bateria": "3046mAh"
//         },
//         "coloresDisponibles": ["Negro", "Blanco", "Verde"],
//         "opiniones": [
//           {
//             "usuario": "applefan",
//             "puntuacion": 4.8,
//             "comentario": "Increíble rendimiento y calidad de construcción."
//           },
//           {
//             "usuario": "techgeek",
//             "puntuacion": 4.5,
//             "comentario": "El ecosistema de Apple hace que valga la pena cada centavo."
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "Google",
//         "modelo": "Pixel 6",
//         "precio": 900,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.3,
//             "resolucion": "OLED"
//           },
//           "sistemaOperativo": "Android",
//           "almacenamientoInterno": "128GB",
//           "camaras": [
//             { "tipo": "Principal", "resolucion": "12.2MP" },
//             { "tipo": "Frontal", "resolucion": "8MP" }
//           ],
//           "bateria": "3700mAh"
//         },
//         "coloresDisponibles": ["Negro", "Plata"],
//         "opiniones": [
//           {
//             "usuario": "androidlover",
//             "puntuacion": 4.6,
//             "comentario": "El software de Google ofrece una experiencia excepcional."
//           },
//           {
//             "usuario": "techguru",
//             "puntuacion": 4.4,
//             "comentario": "Cámara de calidad y rendimiento fluido."
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "OnePlus",
//         "modelo": "9 Pro",
//         "precio": 850,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.78,
//             "resolucion": "Fluid AMOLED"
//           },
//           "sistemaOperativo": "Android",
//           "almacenamientoInterno": "256GB",
//           "camaras": [
//             { "tipo": "Principal", "resolucion": "48MP" },
//             { "tipo": "Frontal", "resolucion": "16MP" }
//           ],
//           "bateria": "4510mAh"
//         },
//         "coloresDisponibles": ["Negro", "Plata"],
//         "opiniones": [
//           {
//             "usuario": "onepluslover",
//             "puntuacion": 4.7,
//             "comentario": "Increíble relación calidad-precio y rendimiento."
//           },
//           {
//             "usuario": "techenthusiast",
//             "puntuacion": 4.5,
//             "comentario": "OxygenOS proporciona una experiencia suave y personalizable."
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "Xiaomi",
//         "modelo": "Mi 11",
//         "precio": 700,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.67,
//             "resolucion": "AMOLED"
//           },
//           "sistemaOperativo": "Android",
//           "almacenamientoInterno": "256GB",
//           "camaras": [
//             { "tipo": "Principal", "resolucion": "108MP" },
//             { "tipo": "Frontal", "resolucion": "20MP" }
//           ],
//           "bateria": "5000mAh"
//         },
//         "coloresDisponibles": ["Negro", "Azul", "Gris"],
//         "opiniones": [
//           {
//             "usuario": "miuser",
//             "puntuacion": 4.6,
//             "comentario": "Increíble cámara y rendimiento a un precio asequible."
//           },
//           {
//             "usuario": "techlover",
//             "puntuacion": 4.4,
//             "comentario": "MIUI ofrece muchas características útiles."
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "Apple",
//         "modelo": "iPhone 14",
//         "precio": 1199,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.1,
//             "resolucion": "Super Retina XDR"
//           },
//           "sistemaOperativo": "iOS 16",
//           "almacenamientoInterno": "256GB",
//           "RAM": "6GB",
//           "camara": { "principal": "12MP", "frontal": "12MP" },
//           "bateria": "3095mAh"
//         },
//         "coloresDisponibles": ["Gris espacial", "Oro", "Plata"],
//         "opiniones": [
//           {
//             "usuario": "applefan",
//             "puntuacion": 4.9,
//             "comentario": "Diseño premium y rendimiento excepcional."
//           },
//           {
//             "usuario": "techreviewer",
//             "puntuacion": 4.7,
//             "comentario": "Cámara increíble y duración de la batería mejorada."
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "Samsung",
//         "modelo": "Galaxy S23",
//         "precio": 1199,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.8,
//             "resolucion": "Quad HD+"
//           },
//           "sistemaOperativo": "One UI 4.0",
//           "almacenamientoInterno": "512GB",
//           "RAM": "12GB",
//           "camara": { "principal": "108MP", "frontal": "40MP" },
//           "bateria": "5000mAh"
//         },
//         "coloresDisponibles": ["Negro", "Blanco", "Verde"],
//         "opiniones": [
//           {
//             "usuario": "samsunglover",
//             "puntuacion": 4.8,
//             "comentario": "Diseño elegante y funciones innovadoras."
//           },
//           {
//             "usuario": "techenthusiast",
//             "puntuacion": 4.6,
//             "comentario": "Excelente rendimiento y cámara versátil."
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "Xiaomi",
//         "modelo": "Mi 12",
//         "precio": 1099,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.81,
//             "resolucion": "AMOLED"
//           },
//           "sistemaOperativo": "MIUI 14",
//           "almacenamientoInterno": "512GB",
//           "RAM": "16GB",
//           "camara": { "principal": "200MP", "frontal": "32MP" },
//           "bateria": "5000mAh"
//         },
//         "coloresDisponibles": ["Negro", "Blanco", "Azul"],
//         "opiniones": [
//           {
//             "usuario": "miuser",
//             "puntuacion": 4.9,
//             "comentario": "Increíble potencia y calidad de la cámara."
//           },
//           {
//             "usuario": "techlover",
//             "puntuacion": 4.7,
//             "comentario": "Pantalla impresionante y rendimiento rápido."
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "OnePlus",
//         "modelo": "10 Pro",
//         "precio": 999,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.7,
//             "resolucion": "QHD+"
//           },
//           "sistemaOperativo": "OxygenOS 12",
//           "almacenamientoInterno": "256GB",
//           "RAM": "12GB",
//           "camara": { "principal": "108MP", "frontal": "32MP" },
//           "bateria": "5000mAh"
//         },
//         "coloresDisponibles": ["Negro", "Plata"],
//         "opiniones": [
//           {
//             "usuario": "oneplusfan",
//             "puntuacion": 4.8,
//             "comentario": "Diseño elegante y potente rendimiento."
//           },
//           {
//             "usuario": "techreviewer",
//             "puntuacion": 4.6,
//             "comentario": "Cámara impresionante y experiencia de usuario fluida."
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "Google",
//         "modelo": "Pixel 7",
//         "precio": 899,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.4,
//             "resolucion": "FHD+"
//           },
//           "sistemaOperativo": "Android 12",
//           "almacenamientoInterno": "128GB",
//           "RAM": "8GB",
//           "camara": { "principal": "50MP", "frontal": "8MP" },
//           "bateria": "4614mAh"
//         },
//         "coloresDisponibles": ["Blanco", "Negro", "Verde"],
//         "opiniones": [
//           {
//             "usuario": "pixellover",
//             "puntuacion": 4.7,
//             "comentario": "Experiencia Android pura y cámara impresionante."
//           },
//           {
//             "usuario": "techenthusiast",
//             "puntuacion": 4.5,
//             "comentario": "Rendimiento sólido y actualizaciones rápidas."
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "LG",
//         "modelo": "G9",
//         "precio": 799,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.8,
//             "resolucion": "OLED"
//           },
//           "sistemaOperativo": "Android 10",
//           "almacenamientoInterno": "128GB",
//           "RAM": "8GB",
//           "camara": { "principal": "48MP", "frontal": "16MP" },
//           "bateria": "4300mAh"
//         },
//         "coloresDisponibles": ["Gris", "Blanco", "Verde"],
//         "opiniones": [
//           {
//             "usuario": "lglover",
//             "puntuacion": 4.6,
//             "comentario": "Diseño elegante y experiencia de usuario intuitiva."
//           },
//           {
//             "usuario": "techenthusiast",
//             "puntuacion": 4.4,
//             "comentario": "Cámara versátil y pantalla vibrante."
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "ASUS",
//         "modelo": "ROG Phone 5",
//         "precio": 999,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.78,
//             "resolucion": "AMOLED"
//           },
//           "sistemaOperativo": "ROG UI (basado en Android 11)",
//           "almacenamientoInterno": "512GB",
//           "RAM": "16GB",
//           "camara": { "principal": "64MP", "frontal": "24MP" },
//           "bateria": "6000mAh"
//         },
//         "coloresDisponibles": ["Negro", "Blanco"],
//         "opiniones": [
//           {
//             "usuario": "roglover",
//             "puntuacion": 4.9,
//             "comentario": "Potente para juegos y duración de la batería impresionante."
//           },
//           {
//             "usuario": "gamingenthusiast",
//             "puntuacion": 4.7,
//             "comentario": "Diseño robusto y altavoces estéreo excepcionales."
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "Motorola",
//         "modelo": "Edge 30 Pro",
//         "precio": 899,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.7,
//             "resolucion": "OLED"
//           },
//           "sistemaOperativo": "Android 11",
//           "almacenamientoInterno": "256GB",
//           "RAM": "12GB",
//           "camara": { "principal": "108MP", "frontal": "32MP" },
//           "bateria": "5000mAh"
//         },
//         "coloresDisponibles": ["Gris", "Azul", "Burdeos"],
//         "opiniones": [
//           {
//             "usuario": "motorolafan",
//             "puntuacion": 4.8,
//             "comentario": "Excelente relación calidad-precio y batería duradera."
//           },
//           {
//             "usuario": "techenthusiast",
//             "puntuacion": 4.6,
//             "comentario": "Diseño atractivo y rendimiento sólido."
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "Huawei",
//         "modelo": "P50 Pro",
//         "precio": 1099,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.6,
//             "resolucion": "OLED"
//           },
//           "sistemaOperativo": "HarmonyOS 2.0",
//           "almacenamientoInterno": "256GB",
//           "RAM": "8GB",
//           "camara": { "principal": "50MP", "frontal": "32MP" },
//           "bateria": "4360mAh"
//         },
//         "coloresDisponibles": ["Negro", "Blanco", "Oro"],
//         "opiniones": [
//           {
//             "usuario": "huaweilover",
//             "puntuacion": 4.7,
//             "comentario": "Cámara excepcional y rendimiento suave."
//           },
//           {
//             "usuario": "techreviewer",
//             "puntuacion": 4.5,
//             "comentario": "Diseño premium y calidad de construcción."
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "Sony",
//         "modelo": "Xperia 2",
//         "precio": 999,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.1,
//             "resolucion": "FHD+"
//           },
//           "sistemaOperativo": "Android 11",
//           "almacenamientoInterno": "256GB",
//           "RAM": "8GB",
//           "camara": { "principal": "12MP", "frontal": "8MP" },
//           "bateria": "4500mAh"
//         },
//         "coloresDisponibles": ["Negro", "Verde", "Rosa"],
//         "opiniones": [
//           {
//             "usuario": "sonylover",
//             "puntuacion": 4.6,
//             "comentario": "Diseño elegante y funciones multimedia impresionantes."
//           },
//           {
//             "usuario": "techenthusiast",
//             "puntuacion": 4.4,
//             "comentario": "Rendimiento sólido y experiencia de usuario intuitiva."
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "Lenovo",
//         "modelo": "Legion Phone 3",
//         "precio": 899,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.92,
//             "resolucion": "AMOLED"
//           },
//           "sistemaOperativo": "ZUI 13 (basado en Android 12)",
//           "almacenamientoInterno": "512GB",
//           "RAM": "18GB",
//           "camara": { "principal": "64MP", "frontal": "44MP" },
//           "bateria": "5500mAh"
//         },
//         "coloresDisponibles": ["Negro", "Blanco"],
//         "opiniones": [
//           {
//             "usuario": "lenovolover",
//             "puntuacion": 4.7,
//             "comentario": "Excelente para juegos y diseño innovador."
//           },
//           {
//             "usuario": "techenthusiast",
//             "puntuacion": 4.5,
//             "comentario": "Rendimiento potente y batería de larga duración."
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "Vivo",
//         "modelo": "X90",
//         "precio": 999,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.78,
//             "resolucion": "AMOLED"
//           },
//           "sistemaOperativo": "OriginOS (basado en Android 12)",
//           "almacenamientoInterno": "512GB",
//           "RAM": "12GB",
//           "camara": { "principal": "50MP", "frontal": "32MP" },
//           "bateria": "5000mAh"
//         },
//         "coloresDisponibles": ["Negro", "Azul", "Gris"],
//         "opiniones": [
//           {
//             "usuario": "vivolover",
//             "puntuacion": 4.8,
//             "comentario": "Excelente rendimiento y diseño atractivo."
//           },
//           {
//             "usuario": "techenthusiast",
//             "puntuacion": 4.6,
//             "comentario": "Pantalla vibrante y carga rápida."
//           }
//         ]
//       },
//       {
//         "nombre": "Smartphone",
//         "marca": "Oppo",
//         "modelo": "Find X5",
//         "precio": 899,
//         "especificaciones": {
//           "pantalla": {
//             "tamaño": 6.7,
//             "resolucion": "AMOLED"
//           },
//           "sistemaOperativo": "ColorOS 13 (basado en Android 12)",
//           "almacenamientoInterno": "256GB",
//           "RAM": "12GB",
//           "camara": { "principal": "50MP", "frontal": "32MP" },
//           "bateria": "5000mAh"
//         },
//         "coloresDisponibles": ["Negro", "Blanco", "Azul"],
//         "opiniones": [
//           {
//             "usuario": "oppolover",
//             "puntuacion": 4.7,
//             "comentario": "Diseño premium y experiencia de usuario fluida."
//           },
//           {
//             "usuario": "techenthusiast",
//             "puntuacion": 4.5,
//             "comentario": "Rendimiento sólido y carga rápida."
//           }
//         ]
//       }
//     ]

//     );
