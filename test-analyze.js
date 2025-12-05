// Archivo: test-analyze.js

// 1. Estos son los datos que le vamos a enviar al servidor
const numerosDePrueba = [10, 20, 10, 50, 10];

console.log("📡 Enviando estos datos al servidor:", numerosDePrueba);

// 2. Hacemos la petición POST a tu servidor local
fetch('http://localhost:3000/analyze', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json' // Avisamos que enviamos JSON
    },
    body: JSON.stringify(numerosDePrueba) // Convertimos el array a texto JSON
})
.then(response => response.json()) // Convertimos la respuesta a objeto
.then(datos => {
    // 3. Mostramos lo que respondió el servidor
    console.log("✅ ¡RESPUESTA RECIBIDA!");
    console.log(datos);
})
.catch(error => {
    console.error("❌ ERROR: ¿Seguro que el servidor está prendido?", error);
});