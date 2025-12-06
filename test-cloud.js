const mongoose = require('mongoose');

// PEGA AQUÍ TU LINK DE MONGO ATLAS (El mismo de Render, sin comillas)
const MONGO_URI = "mongodb+srv://bryanreyesat_db_user:F1NuUEYDyGhZpTMg@cluster0.hzd3lxi.mongodb.net/minigamehub?retryWrites=true&w=majority";

console.log("⏳ Intentando conectar a la nube...");

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ ¡EXITO! La IP 0.0.0.0/0 está funcionando."))
    .catch(err => console.error("❌ ERROR: Sigues bloqueado.", err));