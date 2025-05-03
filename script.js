const preguntas = [
    {
        pregunta: "¿Qué vitamina abunda en los cítricos?",
        respuestaCorrecta: "Vitamina C",
        opciones: ["Vitamina A", "Vitamina B12", "Vitamina D", "Vitamina C"],
        datoCurioso: "¿Sabias que? La vitamina C no solo fortalece el sistema inmunológico, también ayuda a absorber mejor el hierro de los alimentos vegetales."
    },
    {
        pregunta: "¿Cuál de estos alimentos es rico en omega-3?",
        respuestaCorrecta: "Salmón",
        opciones: ["Pollo", "Salmón", "Arroz", "Pan"],
        datoCurioso: "¿Sabias que? Los ácidos grasos omega-3 del salmón pueden ayudar a reducir la inflamación y mejorar la salud cerebral."
    },
    {
        pregunta: "¿Qué mineral ayuda a fortalecer los huesos?",
        respuestaCorrecta: "Calcio",
        opciones: ["Hierro", "Calcio", "Potasio", "Magnesio"],
        datoCurioso: "¿Sabias que? El cuerpo absorbe mejor el calcio cuando se consume junto con vitamina D."
    },
    {
        pregunta: "¿Qué alimento es fuente de proteína vegetal?",
        respuestaCorrecta: "Lentejas",
        opciones: ["Lentejas", "Manzana", "Pan blanco", "Azúcar"],
        datoCurioso: "¿Sabias que? Las lentejas combinadas con arroz forman una proteína completa comparable a la carne."
    },
    {
        pregunta: "¿La leche materna que aporta?",
        respuestaCorrecta: "Todos los nutrientes que necesita el bebe",
        opciones: ["No aporta nutrientes", "Todos los nutrientes que necesita el bebe", "Solo grasas", "Ninguna de las anteriores"],
        datoCurioso: "¿Sabias que? La leche materna contiene células vivas y anticuerpos que pueden adaptarse a las necesidades del bebé."
    },
    {
        pregunta: "¿Las fruta y vegetales aportan?",
        respuestaCorrecta: "Antioxidantes",
        opciones: ["Antioxidantes", "Grasas", "Azucares", "Sal"],
        datoCurioso: "¿Sabias que? Los tomates, aguacates y pepinos son considerados frutas botánicamente."
    },
    {
        pregunta: "¿El azucar aumenta el riesgo de?",
        respuestaCorrecta: "Todas las anteriores",
        opciones: ["Caries Dental", "Aumento de peso", "Aumento de enfermedades cardiovasculares", "Todas las anteriores"],
        datoCurioso: "¿Sabias que? El exceso de azúcar puede llevar a obesidad e inflamación."
    },
    {
        pregunta: "¿El Huevo debe consumirse porque?",
        respuestaCorrecta: "Todas las anteriores",
        opciones: ["Es una excelente proteina", "Contiene vitaminas y oligoelementos", "Todas las anteriores", "Es económica"],
        datoCurioso: "¿Sabias que? El color de la cáscara del huevo depende de la raza de la gallina."
    },
    {
        pregunta: "¿Cuál es el porcentaje de agua en el cuerpo humano?",
        respuestaCorrecta: "50-70%",
        opciones: ["50-70%", "10-20%", "100%", "Ninguna de las anteriores"],
        datoCurioso: "¿Sabias que? Los recién nacidos tienen hasta 78% de agua en su cuerpo que disminuye con la edad."
    },
    {
        pregunta: "¿Un ejemplo de transformación de alimentos es?",
        respuestaCorrecta: "Harina de yuca",
        opciones: ["Quesos", "Harina de yuca", "Huevos", "Manzana"],
        datoCurioso: "¿Sabias que? La harina de yuca es naturalmente libre de gluten."
    }
];

const iconosPreguntas = [
    "https://cdn-icons-png.flaticon.com/128/2909/2909653.png", // Vitamina C
    "https://cdn-icons-png.flaticon.com/128/3081/3081985.png", // Salmón
    "https://cdn-icons-png.flaticon.com/128/2489/2489756.png", // Huesos
    "https://cdn-icons-png.flaticon.com/128/2329/2329866.png", // Lentejas
    "https://cdn-icons-png.flaticon.com/128/3274/3274459.png", // Leche materna
    "https://cdn-icons-png.flaticon.com/128/135/135722.png",   // Manzana
    "https://cdn-icons-png.flaticon.com/128/2664/2664066.png", // Azúcar
    "https://cdn-icons-png.flaticon.com/128/2489/2489718.png", // Huevo
    "https://cdn-icons-png.flaticon.com/128/3066/3066978.png", // Agua
    "https://cdn-icons-png.flaticon.com/128/1046/1046857.png"  // Harina
];

// Sistema de sonidos mejorado
const sonidos = {
    click: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-modern-click-box-check-1120.mp3'),
    ruleta: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-slot-machine-spin-1930.mp3'),
    win: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3'),
    lose: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-lose-2027.mp3')
};

// Configuración de volúmenes
sonidos.click.volume = 0.3;
sonidos.ruleta.volume = 0.5;
sonidos.win.volume = 0.7;
sonidos.lose.volume = 0.7;

// Precargar sonidos
function precargarSonidos() {
    Object.values(sonidos).forEach(audio => {
        audio.load();
        // Intento de reproducción silenciosa para desbloquear audio
        audio.muted = true;
        audio.play().then(() => {
            audio.pause();
            audio.currentTime = 0;
            audio.muted = false;
        }).catch(e => console.log("Precarga de audio:", e));
    });
}

// Función mejorada para reproducir sonidos
function playSonido(tipo) {
    const audio = sonidos[tipo];
    if (!audio) return;
    
    // Clonamos el audio para permitir múltiples reproducciones
    const clone = audio.cloneNode(true);
    clone.volume = audio.volume;
    
    const promise = clone.play();
    
    if (promise !== undefined) {
        promise.catch(error => {
            console.log("Reproducción prevenida:", error);
            mostrarBotonActivarSonidos();
        });
    }
}

// Mostrar botón para activar sonidos
function mostrarBotonActivarSonidos() {
    const btn = document.getElementById('activar-sonidos');
    if (!btn) return;
    
    btn.style.display = 'block';
}

// Inicialización de sonidos
document.getElementById('activar-sonidos').addEventListener('click', function() {
    sonidos.click.play().then(() => {
        this.textContent = '✓ Sonidos Activados';
        setTimeout(() => {
            this.style.display = 'none';
        }, 2000);
    }).catch(e => {
        console.log("Error al activar sonidos:", e);
        this.textContent = '⚠ Haz clic en la pantalla primero';
    });
});

// Ocultar botón de sonidos al inicio
document.getElementById('activar-sonidos').style.display = 'none';

// Precargar sonidos cuando la página carga
window.addEventListener('DOMContentLoaded', precargarSonidos);

let aciertos = 0;
let errores = 0;
let preguntasMostradas = [];
let preguntaActual = null;

// Event listeners para botones
document.getElementById('boton-empezar').addEventListener('click', function() {
    playSonido('click');
    iniciarJuego();
});

document.getElementById('boton-siguiente').addEventListener('click', function() {
    playSonido('click');
    obtenerPreguntaAleatoria();
});

function iniciarJuego() {
    aciertos = 0;
    errores = 0;
    preguntasMostradas = [];
    document.getElementById('inicio').classList.add('hidden');
    mostrarRuleta();
}

function obtenerPreguntaAleatoria() {
    mostrarRuleta();
}

function mostrarRuleta() {
    document.getElementById('pregunta').classList.add('hidden');
    document.getElementById('opciones').classList.add('hidden');
    document.getElementById('resultado').classList.add('hidden');
    
    const ruletaContainer = document.getElementById('ruleta-container');
    const ruletaPlato = document.querySelector('.ruleta-plato');
    
    ruletaPlato.innerHTML = '';
    const preguntasDisponibles = preguntas.filter((_, index) => !preguntasMostradas.includes(index));
    
    if (preguntasDisponibles.length === 0) {
        mostrarResultados();
        return;
    }
    
    ruletaContainer.classList.remove('hidden');
    const totalSecciones = preguntas.length;
    const anguloSeccion = 360 / totalSecciones;
    
    for (let i = 0; i < totalSecciones; i++) {
        const seccion = document.createElement('div');
        seccion.className = `ruleta-seccion seccion-${i+1}`;
        seccion.style.transform = `rotate(${i * anguloSeccion}deg)`;
        
        const icono = document.createElement('img');
        icono.className = 'ruleta-icono';
        icono.src = iconosPreguntas[i];
        icono.alt = `Ícono pregunta ${i+1}`;
        
        if (preguntasMostradas.includes(i)) {
            seccion.classList.add('respondida');
        }
        
        seccion.appendChild(icono);
        ruletaPlato.appendChild(seccion);
    }
    
    const rotacionesCompletas = 5;
    const seccionAleatoria = Math.floor(Math.random() * preguntasDisponibles.length);
    const preguntaIndex = preguntas.indexOf(preguntasDisponibles[seccionAleatoria]);
    const anguloFinal = (rotacionesCompletas * 360) + (preguntaIndex * anguloSeccion) + (anguloSeccion / 2);
    
    ruletaPlato.style.transform = 'rotate(0deg)';
    void ruletaPlato.offsetWidth;
    
    playSonido('ruleta');
    ruletaPlato.style.transform = `rotate(${-anguloFinal}deg)`;
    
    setTimeout(() => {
        ruletaContainer.classList.add('hidden');
        preguntaActual = preguntasDisponibles[seccionAleatoria];
        preguntasMostradas.push(preguntas.indexOf(preguntaActual));
        mostrarPregunta(preguntaActual);
    }, 3000);
}

function mostrarPregunta(pregunta) {
    const preguntaDiv = document.getElementById('pregunta');
    preguntaDiv.textContent = pregunta.pregunta;
    preguntaDiv.classList.remove('hidden');
    
    const opcionesDiv = document.querySelector('.options-grid');
    opcionesDiv.innerHTML = '';
    
    pregunta.opciones.forEach((opcion, index) => {
        setTimeout(() => {
            const button = document.createElement('button');
            button.textContent = opcion;
            button.addEventListener('click', function() {
                playSonido('click');
                verificarRespuesta(opcion);
            });
            opcionesDiv.appendChild(button);
        }, index * 200);
    });
    
    document.getElementById('opciones').classList.remove('hidden');
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
        playSonido('win');
        lanzarConfeti();
    } else {
        errores++;
        mensajeResultados.innerHTML = `❌ <strong>Incorrecto.</strong> La respuesta correcta es: <strong>${preguntaActual.respuestaCorrecta}</strong><br>${preguntaActual.datoCurioso}`;
        imagenResultados.src = "https://cdn-icons-png.flaticon.com/128/16206/16206622.png";
        imagenResultados.className = "result-icon cara-triste";
        playSonido('lose');
    }

    document.getElementById('boton-siguiente').classList.remove('hidden');
}

function mostrarResultados() {
    const resultadoDiv = document.getElementById('resultado');
    const mensajeResultados = document.getElementById('mensaje-resultados');
    const imagenResultados = document.getElementById('imagen-resultados');

    document.getElementById('pregunta').classList.add('hidden');
    document.getElementById('opciones').classList.add('hidden');
    document.getElementById('boton-siguiente').classList.add('hidden');

    resultadoDiv.classList.remove('hidden');

    // Crear botón "Jugar otra vez"
    const botonReinicio = document.createElement('button');
    botonReinicio.textContent = 'Jugar otra vez';
    botonReinicio.className = 'btn-primary';
    botonReinicio.addEventListener('click', function() {
        playSonido('click');
        reiniciarJuego();
    });

    if (aciertos === preguntas.length) {
        playSonido('win');
        imagenResultados.src = "https://cdn-icons-png.flaticon.com/128/625/625398.png";
        mensajeResultados.innerHTML = `
            <h3>¡Perfecto! 🏆</h3>
            <p>Aciertos: <strong>${aciertos}/${preguntas.length}</strong></p>
            <p class="mensaje-final">¡Estás totalmente en la onda 4S!</p>
        `;
        lanzarConfetiExplosivo();
    } else if (aciertos >= Math.ceil(preguntas.length / 2)) {
        playSonido('win');
        imagenResultados.src = "https://cdn-icons-png.flaticon.com/128/166/166522.png";
        mensajeResultados.innerHTML = `
            <h3>¡Bien hecho! 👍</h3>
            <p>Aciertos: <strong>${aciertos}/${preguntas.length}</strong></p>
            <p class="mensaje-final">Vas por buen camino hacia la onda 4S</p>
        `;
    } else {
        playSonido('lose');
        imagenResultados.src = "https://cdn-icons-png.flaticon.com/128/166/166527.png";
        mensajeResultados.innerHTML = `
            <h3>¡Sigue practicando! 😊</h3>
            <p>Aciertos: <strong>${aciertos}/${preguntas.length}</strong></p>
            <p class="mensaje-final">La nutrición es un aprendizaje continuo. ¡Sigue así!</p>
        `;
    }

    resultadoDiv.appendChild(botonReinicio);
}

function reiniciarJuego() {
    document.getElementById('resultado').classList.add('hidden');
    document.getElementById('inicio').classList.remove('hidden');
}

function lanzarConfeti() {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
}

function lanzarConfetiExplosivo() {
    confetti({ particleCount: 300, spread: 100, origin: { y: 0.5 } });
}
