function analizarDatos(numeros) {
    // 1. Validar si está vacío
    if (numeros.length === 0) {
        return { error: "La lista está vacía" };
    }

    // --- A. SUMA ---
    // (Tu reduce estaba casi bien, pero usa 'numeros', no 'Array')
    const suma = numeros.reduce((acum, val) => acum + val, 0);

    // --- B. PROMEDIO ---
    const promedio = suma / numeros.length;

    // --- C. MODA (Tu lógica estaba BIEN, solo adaptémosla) ---
    const counts = {};
    let moda = null;
    let maxRepeticiones = 0;

    for (const num of numeros) {
        // Tu lógica de conteo aquí
        counts[num] = (counts[num] || 0) + 1;
        
        // Truco: Comprobar al vuelo si es el nuevo ganador
        if (counts[num] > maxRepeticiones) {
            maxRepeticiones = counts[num];
            moda = num;
        }
    }

    // --- D. SEGUNDO MAYOR ---
    // CORRECCIÓN: Usamos 'new Set' para quitar duplicados, no 'setInterval'
    const unicos = [...new Set(numeros)]; 
    
    // Ordenamos de mayor a menor
    unicos.sort((a, b) => b - a);
    
    // Tomamos el segundo (posición 1)
    const segundoMayor = unicos[1];

    // --- RESULTADO FINAL ---
    return {
        suma: suma,
        promedio: promedio,
        moda: moda,
        segundoMayor: segundoMayor
    };
}

// --- ZONA DE PRUEBAS ---
const miLista = [10, 20, 10, 50, 10]; 
console.log("Resultados:", analizarDatos(miLista));