const preguntas = [
    {
        pregunta: "¿Qué vitamina abunda en los cítricos?",
        respuestaCorrecta: "Vitamina C",
        opciones: ["Vitamina A", "Vitamina B12", "Vitamina D", "Vitamina C"],
        datoCurioso: "La vitamina C no solo fortalece el sistema inmunológico, también ayuda a absorber mejor el hierro de los alimentos vegetales. Un solo kiwi contiene toda la vitamina C que necesitas en un día."
    },
    {
        pregunta: "¿Cuál de estos alimentos es rico en omega-3?",
        respuestaCorrecta: "Salmón",
        opciones: ["Pollo", "Salmón", "Arroz", "Pan"],
        datoCurioso: "Los ácidos grasos omega-3 del salmón pueden ayudar a reducir la inflamación y mejorar la salud cerebral. Se recomienda consumir pescado azul al menos 2 veces por semana."
    },
    {
        pregunta: "¿Qué mineral ayuda a fortalecer los huesos?",
        respuestaCorrecta: "Calcio",
        opciones: ["Hierro", "Calcio", "Potasio", "Magnesio"],
        datoCurioso: "El cuerpo absorbe mejor el calcio cuando se consume junto con vitamina D. ¡Por eso es importante tomar el sol con moderación! Los lácteos no son la única fuente, las almendras también son ricas en calcio."
    },
    {
        pregunta: "¿Qué alimento es fuente de proteína vegetal?",
        respuestaCorrecta: "Lentejas",
        opciones: ["Lentejas", "Manzana", "Pan blanco", "Azúcar"],
        datoCurioso: "Las lentejas no solo son ricas en proteínas (18g por cada 100g), también contienen mucha fibra que ayuda a la digestión. Combinadas con arroz forman una proteína completa comparable a la carne."
    }
];

let aciertos = 0;
let errores = 0;
let preguntasMostradas = [];
let preguntaActual = null;

document.getElementById('boton-empezar').addEventListener('click', iniciarJuego);
document.getElementById('boton-siguiente').addEventListener('click', obtenerPreguntaAleatoria);

function iniciarJuego() {
    aciertos = 0;
    errores = 0;
    preguntasMostradas = [];
    document.getElementById('inicio').classList.add('hidden');
    obtenerPreguntaAleatoria();
}

function obtenerPreguntaAleatoria() {
    const preguntasDisponibles = preguntas.filter((_, index) => !preguntasMostradas.includes(index));
    
    if (preguntasDisponibles.length === 0) {
        mostrarResultados();
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * preguntasDisponibles.length);
    preguntaActual = preguntasDisponibles[indiceAleatorio];
    preguntasMostradas.push(preguntas.indexOf(preguntaActual));
    
    mostrarPregunta(preguntaActual);
}

function mostrarPregunta(pregunta) {
    document.getElementById('resultado').classList.add('hidden');
    document.getElementById('pregunta').classList.remove('hidden');
    document.getElementById('opciones').classList.remove('hidden');

    document.getElementById('pregunta').textContent = pregunta.pregunta;
    const opcionesDiv = document.querySelector('.options-grid');
    opcionesDiv.innerHTML = '';

    pregunta.opciones.forEach(opcion => {
        const button = document.createElement('button');
        button.textContent = opcion;
        button.classList.add('animate__animated', 'animate__fadeInUp');
        button.addEventListener('click', () => {
            button.classList.add('animate__pulse');
            setTimeout(() => verificarRespuesta(opcion), 500);
        });
        opcionesDiv.appendChild(button);
    });
}

function verificarRespuesta(respuestaSeleccionada) {
    const resultadoDiv = document.getElementById('resultado');
    const mensajeResultados = document.getElementById('mensaje-resultados');
    const imagenResultados = document.getElementById('imagen-resultados');

    document.getElementById('opciones').classList.add('hidden');
    document.getElementById('pregunta').classList.add('hidden');
    resultadoDiv.classList.remove('hidden');

    if (respuestaSeleccionada === preguntaActual.respuestaCorrecta) {
        aciertos++;
        mensajeResultados.innerHTML = `✅ <strong>¡Correcto!</strong><br>${preguntaActual.datoCurioso}`;
        imagenResultados.src = "https://cdn-icons-png.flaticon.com/128/8888/8888205.png";
        imagenResultados.className = "result-icon trofeo-animado";
        lanzarConfeti();
    } else {
        errores++;
        mensajeResultados.innerHTML = `❌ <strong>Incorrecto.</strong> La respuesta correcta es: <strong>${preguntaActual.respuestaCorrecta}</strong><br>${preguntaActual.datoCurioso}`;
        imagenResultados.src = "https://cdn-icons-png.flaticon.com/128/16206/16206622.png";
        imagenResultados.className = "result-icon cara-triste";
    }

    document.getElementById('boton-siguiente').classList.remove('hidden');
}

function mostrarResultados() {
    const resultadoDiv = document.getElementById('resultado');
    const mensajeResultados = document.getElementById('mensaje-resultados');
    const imagenResultados = document.getElementById('imagen-resultados');

    resultadoDiv.classList.remove('hidden');
    document.getElementById('pregunta').classList.add('hidden');
    document.getElementById('opciones').classList.add('hidden');
    document.getElementById('boton-siguiente').classList.add('hidden');

    mensajeResultados.innerHTML = `
        <h3>Resultado Final</h3>
        <p>Aciertos: <strong>${aciertos}</strong></p>
        <p>Errores: <strong>${errores}</strong></p>
    `;

    if (errores === 0) {
        imagenResultados.src = "https://cdn-icons-png.flaticon.com/128/625/625398.png";
        imagenResultados.style.width = "150px";
        imagenResultados.className = "result-icon trofeo-animado";
        mensajeResultados.innerHTML += "<p>¡Perfecto! 🏆 Dominas la nutrición.</p>";
        lanzarConfetiExplosivo();
    } else {
        imagenResultados.src = "https://cdn-icons-png.flaticon.com/128/166/166527.png";
        imagenResultados.style.width = "120px";
        imagenResultados.className = "result-icon cara-triste";
        mensajeResultados.innerHTML += "<p>¡Sigue practicando! 😢 La próxima lo harás mejor.</p>";
    }
}

function lanzarConfeti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#4CAF50', '#FF5722']
    });
}

function lanzarConfetiExplosivo() {
    confetti({
        particleCount: 300,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#FFD700', '#4CAF50', '#FF5722'],
        shapes: ['circle', 'star']
    });
}