//ESTO REALMENTE NO SE SUBE NUNCA A NINGUN REPOSITORIO!!

const crypto = require("crypto");

const passwordSecret = "FullStack secret ed15 refresh";
const passwordSecret2 = "Mejorado el hash refresh";

const hash = crypto
  .createHmac("sha256", passwordSecret)
  .update(passwordSecret2)
  .digest("hex");

console.log(hash);
