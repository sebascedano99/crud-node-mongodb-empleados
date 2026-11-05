const formulario = document.getElementById('formEmpleado');
const tabla = document.getElementById('tablaEmpleados');

// READ: consultar empleados
async function cargarEmpleados() {
    const respuesta = await fetch('/empleados');
    const datos = await respuesta.json();

    tabla.innerHTML = '';

    datos.forEach(empleado => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${empleado.nombre}</td>
            <td>${empleado.edad}</td>
            <td>${empleado.departamento}</td>
            <td>${empleado.salario}</td>
            <td>
                <button onclick="editarEmpleado('${empleado._id}')">Editar</button>
                <button onclick="eliminarEmpleado('${empleado._id}')">Eliminar</button>
            </td>
        `;

        tabla.appendChild(fila);
    });
}

// CREATE y UPDATE
formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('id').value;

    const empleado = {
        nombre: document.getElementById('nombre').value,
        edad: Number(document.getElementById('edad').value),
        departamento: document.getElementById('departamento').value,
        salario: Number(document.getElementById('salario').value)
    };

    let respuesta;

    if (id === '') {
        // CREATE
        respuesta = await fetch('/empleados', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(empleado)
        });
    } else {
        // UPDATE
        respuesta = await fetch('/empleados/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(empleado)
        });
    }

    if (!respuesta.ok) {
        alert('Error al guardar el empleado');
        return;
    }

    formulario.reset();
    document.getElementById('id').value = '';
    cargarEmpleados();
});

// Obtener datos de un empleado para modificarlo
async function editarEmpleado(id) {
    const respuesta = await fetch('/empleados');
    const datos = await respuesta.json();

    const empleado = datos.find(e => e._id === id);

    if (!empleado) return;

    document.getElementById('id').value = empleado._id;
    document.getElementById('nombre').value = empleado.nombre;
    document.getElementById('edad').value = empleado.edad;
    document.getElementById('departamento').value = empleado.departamento;
    document.getElementById('salario').value = empleado.salario;
}

// DELETE
async function eliminarEmpleado(id) {
    if (!confirm('¿Quieres eliminar este empleado?')) {
        return;
    }

    const respuesta = await fetch('/empleados/' + id, {
        method: 'DELETE'
    });

    if (!respuesta.ok) {
        alert('Error al eliminar');
        return;
    }

    cargarEmpleados();
}

// Cargar empleados al iniciar la página
cargarEmpleados();