const URL_NUBE = "https://api-minigame-bryan.onrender.com/games";

const juegosIniciales = [
    { titulo: "Super Mario Bros", genero: "Plataformas", puntuacion: 10, fecha: new Date('2023-01-01') },
    { titulo: "The Legend of Zelda", genero: "Aventura", puntuacion: 9.8, fecha: new Date('2023-05-12') },
    { titulo: "FIFA 24", genero: "Deportes", puntuacion: 7.5, fecha: new Date('2023-09-20') },
    { titulo: "Call of Duty", genero: "Shooter", puntuacion: 8.5, fecha: new Date('2023-11-10') },
    { titulo: "Minecraft", genero: "Aventura", puntuacion: 9.0, fecha: new Date('2011-11-18') }
];

console.log("🚀 Iniciando carga de datos a:", URL_NUBE);

juegosIniciales.forEach(juego => {
    fetch(URL_NUBE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(juego)
    })
    .then(res => res.json())
    .then(data => {
        if(data._id) console.log(`✅ Guardado: ${data.titulo}`);
        else console.log(`❌ Error con ${juego.titulo}`, data);
    })
    .catch(err => console.error("🔥 Error de red:", err));
});