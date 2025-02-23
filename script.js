let participantes = [];
let enfrentamientos = [];
let resultados = {};

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

    if (Object.keys(resultados).length === 2) {
        avanzarRonda();
    }
}

function avanzarRonda() {
    const ganador1 = resultados[1];
    const ganador2 = resultados[2];

    enfrentamientos = [
        { id: 3, participantes: [participantes[0], ganador1] },
        { id: 4, participantes: [participantes[5], ganador2] }
    ];

    resultados = {};
    mostrarEnfrentamientos();
}
