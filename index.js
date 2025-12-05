require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;


const MONGO_URI = process.env.MONGO_URI;

// --- AGREGA ESTO ---
console.log("👀 MIREN TODOS, LA URI ES: [" + MONGO_URI + "]");
// -------------------

mongoose.connect(MONGO_URI);



app.use(express.json());
app.use(cors());

// Conexión a Base de Datos
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ Conectado a MongoDB Atlas");
    })
    .catch((error) => {
        console.error("❌ Error de conexión a MongoDB:", error);
    });

// Esquema y Modelo
const gameSchema = new mongoose.Schema({
    titulo: String,
    genero: String,
    puntuacion: Number,
    fecha: { type: Date, default: Date.now }
});

const Game = mongoose.model("Game", gameSchema);

// --- LÓGICA DE NEGOCIO (Analizar Datos) ---
function analizarDatos(numeros) {
    if (!numeros || !Array.isArray(numeros) || numeros.length === 0) {
        return null;
    }
    const suma = numeros.reduce((acum, val) => acum + val, 0);
    const promedio = suma / numeros.length;
    
    const counts = {};
    let moda = null;
    let maxRepeticiones = 0;
    for (const num of numeros) {
        counts[num] = (counts[num] || 0) + 1;
        if (counts[num] > maxRepeticiones) {
            maxRepeticiones = counts[num];
            moda = num;
        }
    }
    
    const unicos = [...new Set(numeros)];
    unicos.sort((a, b) => b - a);
    const segundoMayor = unicos.length > 1 ? unicos[1] : unicos[0];
    
    return { suma, promedio, moda: parseInt(moda), segundoMayor };
}

// --- RUTAS ---
app.get('/status', (req, res) => res.json({ ok: true }));

app.post('/analyze', (req, res) => {
    const losNumeros = req.body;
    if (!losNumeros || !Array.isArray(losNumeros)) return res.status(400).json({ error: "Requiere arreglo numérico" });
    res.json(analizarDatos(losNumeros));
});

// CRUD JUEGOS
app.get('/games', async (req, res) => {
    try {
        const todos = await Game.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: "Error al leer juegos" });
    }
});

app.post("/games", async (req, res) => {
    try {
        const { titulo, genero, puntuacion } = req.body;
        if (!titulo || !genero || !puntuacion) return res.status(400).json({ error: "Faltan datos" });
        const nuevoJuego = new Game({ titulo, genero, puntuacion });
        await nuevoJuego.save();
        res.json(nuevoJuego);
    } catch (error) {
        res.status(500).json({ error: "Error al guardar" });
    }
});

app.delete('/games/:id', async (req, res) => {
    try {
        await Game.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
});

// Encender Servidor
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});