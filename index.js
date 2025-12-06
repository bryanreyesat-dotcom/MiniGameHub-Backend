require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB Atlas"))
    .catch((error) => console.error("❌ Error Mongo:", error));

const gameSchema = new mongoose.Schema({
    titulo: String,
    genero: String,
    puntuacion: Number,
    fecha: { type: Date, default: Date.now }
});

const Game = mongoose.model("Game", gameSchema);

// --- RUTAS ---

// LEER (GET)
app.get('/games', async (req, res) => {
    try {
        const todos = await Game.find();
        res.json(todos);
    } catch (error) { res.status(500).json({ error: "Error al leer" }); }
});

// CREAR (POST)
app.post("/games", async (req, res) => {
    try {
        const { titulo, genero, puntuacion } = req.body;
        if (!titulo || !genero || !puntuacion) return res.status(400).json({ error: "Faltan datos" });
        const nuevo = new Game({ titulo, genero, puntuacion });
        await nuevo.save();
        res.json(nuevo);
    } catch (error) { res.status(500).json({ error: "Error al guardar" }); }
});

// EDITAR (PUT) - ¡ESTA ES LA NUEVA!
app.put("/games/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, genero, puntuacion } = req.body;
        
        // Buscamos y actualizamos. { new: true } devuelve el juego ya cambiado.
        const juegoActualizado = await Game.findByIdAndUpdate(id, { titulo, genero, puntuacion }, { new: true });
        
        res.json(juegoActualizado);
    } catch (error) { res.status(500).json({ error: "Error al editar" }); }
});

// BORRAR (DELETE)
app.delete('/games/:id', async (req, res) => {
    try {
        await Game.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Eliminado" });
    } catch (error) { res.status(500).json({ error: "Error al eliminar" }); }
});

// LÓGICA DE API (Para la prueba 2)
app.post('/analyze', (req, res) => {
    const n = req.body;
    if (!n || !Array.isArray(n)) return res.status(400).json({ error: "Array requerido" });
    
    const sum = n.reduce((a, b) => a + b, 0);
    const avg = sum / n.length;
    const counts = {};
    let moda = null, max = 0;
    n.forEach(x => { counts[x] = (counts[x] || 0) + 1; if(counts[x] > max) { max = counts[x]; moda = x; } });
    const uniq = [...new Set(n)].sort((a,b) => b - a);
    
    res.json({ suma: sum, promedio: avg, moda: parseInt(moda), segundoMayor: uniq[1] || uniq[0] });
});

app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Servidor en puerto ${PORT}`));