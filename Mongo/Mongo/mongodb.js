db.usuario.insertMany({ name: "ejemplo 2" });
//Insertar varios registros IMPORTANTE []
db.usuario.insertMany([
  { name: "Ejemplo 2", age: 35, country: "Francia" },
  { name: "Ejemplo 3", age: 30, country: "Alemania" },
  { name: "Ejemplo 4", age: 20, country: "España" },
  { name: "Ejemplo 5", age: 30, country: "Italia" },
  { name: "Ejemplo 6", age: 12, country: "Alemania" },
]);
