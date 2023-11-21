async function fetchConsumos() {
  const response = await fetch('http://localhost:3000/consumo');
  const consumos = await response.json();
  return consumos;
}

async function renderConsumos() {
  const consumos = await fetchConsumos();
  const table = document.getElementById('consumoTable');
  table.innerHTML = '<tr><th>ID</th><th>Fecha</th><th>Estado</th><th>Total</th><th>ID Reserva</th><th>Acciones</th></tr>';
  consumos.forEach(consumo => {
    const row = table.insertRow();
    row.innerHTML = `<td>${consumo.idconsumo}</td><td>${consumo.fecha_formateada}</td><td>${consumo.estado}</td>
      <td>${consumo.total}</td><td>${consumo.idreserva}</td>
      <td><button onclick="editConsumo(${consumo.idconsumo})">Editar</button>
      <button onclick="deleteConsumo(${consumo.idconsumo})">Eliminar</button></td>`;
  });
}

async function saveConsumo() {
  const form = document.getElementById('consumoForm');
  const fecha = form.elements['fecha'].value;
  const estado = form.elements['estado'].value;
  const total = form.elements['total'].value;
  const idReserva = form.elements['idReserva'].value;

  const response = await fetch('http://localhost:3000/consumo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fecha, estado, total, idReserva }),
  });

  closeConsumoModal();
  renderConsumos();
}

async function editConsumo(id) {
  const response = await fetch(`http://localhost:3000/consumo/${id}`);
  const consumo = await response.json();

  const form = document.getElementById('consumoForm');
  form.elements['fecha'].value = consumo.fecha;
  form.elements['estado'].value = consumo.estado;
  form.elements['total'].value = consumo.total;
  form.elements['idReserva'].value = consumo.idreserva;

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Guardar';
  saveButton.addEventListener('click', async () => {
    const fecha = form.elements['fecha'].value;
    const estado = form.elements['estado'].value;
    const total = form.elements['total'].value;
    const idReserva = form.elements['idReserva'].value;

    try {
      const updateResponse = await fetch(`http://localhost:3000/consumo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fecha, estado, total, idReserva }),
      });

      if (updateResponse.ok) {
        // Aquí puedes cerrar el modal o realizar otras acciones después de la actualización
        console.log('Consumo actualizado correctamente');
      } else {
        console.error('Error al actualizar el consumo:', updateResponse.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud de edición:', error);
    }
  });

  form.appendChild(saveButton); // Agregar el botón de "Guardar" al formulario

  openConsumoModal(); // Abre el modal para editar el consumo
}


async function deleteConsumo(id) {
  const confirmDelete = confirm('¿Estás seguro de eliminar este consumo?');
  if (confirmDelete) {
    const response = await fetch(`http://localhost:3000/consumo/${id}`, {
      method: 'DELETE',
    });

    renderConsumos();
  }
}

function openConsumoModal() {
  document.getElementById('consumoModal').style.display = 'block';
}

function closeConsumoModal() {
  document.getElementById('consumoModal').style.display = 'none';
}





//DetalleConsumo
async function fetchConsumosDetalle() {
  const response = await fetch('http://localhost:3000/consumoDetalle');
  const consumosDetalle = await response.json();
  return consumosDetalle;
}

async function renderConsumosDetalle() {
  const consumosDetalle = await fetchConsumosDetalle();
  const table = document.getElementById('consumoDetalleTable');
  table.innerHTML = '<tr><th>ID</th><th>Cantidad</th><th>Subtotal</th><th>ID Consumo</th><th>ID Producto</th><th>Acciones</th></tr>';
  consumosDetalle.forEach(consumoDetalle => {
    const row = table.insertRow();
    row.innerHTML = `<td>${consumoDetalle.idconsumodetalle}</td><td>${consumoDetalle.cantidad}</td><td>${consumoDetalle.subtotal}</td>
      <td>${consumoDetalle.idconsumo}</td><td>${consumoDetalle.idproducto}</td>
      <td><button onclick="editConsumoDetalle(${consumoDetalle.idconsumodetalle})">Editar</button>
      <button onclick="deleteConsumoDetalle(${consumoDetalle.idconsumodetalle})">Eliminar</button></td>`;
  });
}

async function saveConsumoDetalle() {
  const form = document.getElementById('consumoDetalleForm');
  const cantidad = form.elements['cantidad'].value;
  const subtotal = form.elements['subtotal'].value;
  const idConsumo = form.elements['idConsumo'].value;
  const idProducto = form.elements['idProducto'].value;

  const response = await fetch('http://localhost:3000/consumoDetalle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cantidad, subtotal, idConsumo, idProducto }),
  });

  closeConsumoDetalleModal();
  renderConsumosDetalle();
}

async function editConsumoDetalle(id) {
  const response = await fetch(`http://localhost:3000/consumoDetalle/${id}`);
  const consumoDetalle = await response.json();

  const form = document.getElementById('consumoDetalleForm');
  form.elements['cantidad'].value = consumoDetalle.cantidad;
  form.elements['subtotal'].value = consumoDetalle.subtotal;
  form.elements['idConsumo'].value = consumoDetalle.idconsumo;
  form.elements['idProducto'].value = consumoDetalle.idproducto;

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Guardar';
  saveButton.addEventListener('click', async () => {
    const cantidad = form.elements['cantidad'].value;
    const subtotal = form.elements['subtotal'].value;
    const idConsumo = form.elements['idConsumo'].value;
    const idProducto = form.elements['idProducto'].value;

    try {
      const updateResponse = await fetch(`http://localhost:3000/consumoDetalle/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cantidad, subtotal, idConsumo, idProducto }),
      });

      if (updateResponse.ok) {
        // Aquí puedes cerrar el modal o realizar otras acciones después de la actualización
        console.log('Detalle de consumo actualizado correctamente');
      } else {
        console.error('Error al actualizar el detalle de consumo:', updateResponse.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud de edición:', error);
    }
  });

  form.appendChild(saveButton);

  openModal(); // Abre el modal para editar el detalle de consumo
}


async function deleteConsumoDetalle(id) {
  const confirmDelete = confirm('¿Estás seguro de eliminar este ConsumoDetalle?');
  if (confirmDelete) {
    const response = await fetch(`http://localhost:3000/consumoDetalle/${id}`, {
      method: 'DELETE',
    });

    renderConsumosDetalle();
  }
}

function openConsumoDetalleModal() {
  document.getElementById('consumoDetalleModal').style.display = 'block';
}

function closeConsumoDetalleModal() {
  document.getElementById('consumoDetalleModal').style.display = 'none';
}

window.onload = async () => {
  await renderConsumos();
  await renderConsumosDetalle();
};
