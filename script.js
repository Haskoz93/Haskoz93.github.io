let participantes = [];
let enfrentamientos = [];
let resultados = {};
let rondaActual = 1;

function iniciarTorneo() {
    participantes = [
        document.getElementById('p1').value || 'P1',
        document.getElementById('p2').value || 'P2',
        document.getElementById('p3').value || 'P3',
        document.getElementById('p4').value || 'P4',
        document.getElementById('p5').value || 'P5',
        document.getElementById('p6').value || 'P6'
    ];

    document.getElementById('input-section').style.display = 'none';
    document.getElementById('torneo-section').style.display = 'block';

    enfrentamientos = [
        { id: 1, participantes: [participantes[1], participantes[2]] },
        { id: 2, participantes: [participantes[3], participantes[4]] }
    ];

    mostrarEnfrentamientos();
}

function mostrarEnfrentamientos() {
    const enfrentamientosDiv = document.getElementById('enfrentamientos');
    enfrentamientosDiv.innerHTML = '';

    enfrentamientos.forEach(enfrentamiento => {
        const enfrentamientoDiv = document.createElement('div');
        enfrentamientoDiv.innerHTML = `
            <p>Enfrentamiento ${enfrentamiento.id}: ${enfrentamiento.participantes[0]} vs ${enfrentamiento.participantes[1]}</p>
            <select id="resultado${enfrentamiento.id}">
                <option value="0">${enfrentamiento.participantes[0]}</option>
                <option value="1">${enfrentamiento.participantes[1]}</option>
            </select>
            <button onclick="registrarResultado(${enfrentamiento.id})">Registrar Resultado</button>
        `;
        enfrentamientosDiv.appendChild(enfrentamientoDiv);
    });
}

function registrarResultado(id) {
    const resultado = document.getElementById(`resultado${id}`).value;
    resultados[id] = enfrentamientos.find(e => e.id === id).participantes[resultado];

    if (Object.keys(resultados).length === enfrentamientos.length) {
        avanzarRonda();
    }
}

function avanzarRonda() {
    rondaActual++;
    if (rondaActual === 2) {
        const ganador1 = resultados[1];
        const ganador2 = resultados[2];
        enfrentamientos = [
            { id: 3, participantes: [participantes[0], ganador1] },
            { id: 4, participantes: [participantes[5], ganador2] }
        ];
    } else if (rondaActual === 3) {
        const ganador3 = resultados[3];
        const ganador4 = resultados[4];
        enfrentamientos = [
            { id: 5, participantes: [resultados[2], resultados[3]] },
            { id: 6, participantes: [resultados[1], resultados[4]] }
        ];
    } else if (rondaActual === 4) {
        const ganador5 = resultados[5];
        const ganador6 = resultados[6];
        enfrentamientos = [
            { id: 7, participantes: [resultados[3], resultados[4]] }
        ];
    } else if (rondaActual === 5) {
        const ganador7 = resultados[7];
        enfrentamientos = [
            { id: 8, participantes: [resultados[5], resultados[6]] }
        ];
    } else if (rondaActual === 6) {
        const ganador8 = resultados[8];
        enfrentamientos = [
            { id: 9, participantes: [resultados[7], resultados[8]] }
        ];
    } else if (rondaActual === 7) {
        const ganador9 = resultados[9];
        enfrentamientos = [
            { id: 10, participantes: [resultados[7], resultados[9]] }
        ];
    } else if (rondaActual === 8) {
        const ganador10 = resultados[10];
        if (ganador10 !== resultados[7]) {
            enfrentamientos = [
                { id: 11, participantes: [resultados[7], resultados[10]] }
            ];
        } else {
            alert(`El ganador del torneo es: ${resultados[10]}`);
            return;
        }
    } else if (rondaActual === 9) {
        alert(`El ganador del torneo es: ${resultados[11]}`);
        return;
    }

    resultados = {};
    mostrarEnfrentamientos();
}
