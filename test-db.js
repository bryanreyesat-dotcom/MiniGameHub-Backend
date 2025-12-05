const juegoDePrueba = {
    titulo: "Call of Duty",
    genero: "Shooter",
    puntuacion: 8.5
};

console.log("💾 Intentando guardar:", juegoDePrueba);

fetch('http://127.0.0.1:3000/games', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(juegoDePrueba)
})
.then(res => res.json())
.then(data => {
    console.log("✅ ¡RESPUESTA DEL SERVIDOR!");
    console.log(data);
    
    // Si ves un campo "_id", significa que MongoDB lo guardó de verdad
    if (data._id) {
        console.log("🎉 ¡ÉXITO! El juego tiene ID, ya está en la base de datos.");
    } else {
        console.log("⚠️ Algo raro pasó, no veo el ID.");
    }
})
.catch(err => console.error("❌ ERROR AL GUARDAR:", err));