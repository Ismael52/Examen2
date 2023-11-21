async function fetchReservas() {
    const response = await fetch('http://localhost:3000/reserva');
    const reservas = await response.json();
    return reservas;
  }
  
  async function renderReservas() {
    const reservas = await fetchReservas();
    const table = document.getElementById('reservaTable');
    table.innerHTML = '<tr><th>ID</th><th>Fecha Reserva</th><th>Fecha Servicio</th><th>Cupo</th><th>Observación</th><th>Estado</th><th>Total</th><th>ID Usuario</th><th>Acciones</th></tr>';
    reservas.forEach(reserva => {
      const row = table.insertRow();
      row.innerHTML = `<td>${reserva.idreserva}</td><td>${reserva.fecha_reserva}</td><td>${reserva.fecha_servicio}</td>
        <td>${reserva.cupo}</td><td>${reserva.observacion}</td><td>${reserva.estado}</td>
        <td>${reserva.total}</td><td>${reserva.idusuario}</td>
        <td><button onclick="editReserva(${reserva.idreserva})">Editar</button>
        <button onclick="deleteReserva(${reserva.idreserva})">Eliminar</button></td>`;
    });
  }
  
  async function saveReserva() {
    const form = document.getElementById('reservaForm');
    const fecha_reserva = form.elements['fecha_reserva'].value;
    const fecha_servicio = form.elements['fecha_servicio'].value;
    const cupo = form.elements['cupo'].value;
    const observacion = form.elements['observacion'].value;
    const estado = form.elements['estado'].value;
    const total = form.elements['total'].value;
    const idusuario = form.elements['idusuario'].value;
  
    const response = await fetch('http://localhost:3000/reserva', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fecha_reserva, fecha_servicio, cupo, observacion, estado, total, idusuario }),
    });
  
    closeModal();
    renderReservas();
  }
  
  async function editReserva(id) {
    const response = await fetch(`http://localhost:3000/reserva/${id}`);
    const reserva = await response.json();
  
    const form = document.getElementById('reservaForm');
    form.elements['fecha_reserva'].value = reserva.fecha_reserva;
    form.elements['fecha_servicio'].value = reserva.fecha_servicio;
    form.elements['cupo'].value = reserva.cupo;
    form.elements['observacion'].value = reserva.observacion;
    form.elements['estado'].value = reserva.estado;
    form.elements['total'].value = reserva.total;
    form.elements['idusuario'].value = reserva.idusuario;
  
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar';
    saveButton.addEventListener('click', async () => {
      const updatedReserva = {
        fecha_reserva: form.elements['fecha_reserva'].value,
        fecha_servicio: form.elements['fecha_servicio'].value,
        cupo: form.elements['cupo'].value,
        observacion: form.elements['observacion'].value,
        estado: form.elements['estado'].value,
        total: form.elements['total'].value,
        idusuario: form.elements['idusuario'].value
      };
  
      try {
        const updateResponse = await fetch(`http://localhost:3000/reserva/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedReserva)
        });
  
        if (updateResponse.ok) {
          // Manejar éxito
        } else {
          // Manejar error
        }
      } catch (error) {
        // Manejar error
      }
    });
  
    form.appendChild(saveButton);
    openModal();
  }
  
  
  async function deleteReserva(id) {
    const confirmDelete = confirm('¿Estás seguro de eliminar esta reserva?');
    if (confirmDelete) {
      const response = await fetch(`http://localhost:3000/reserva/${id}`, {
        method: 'DELETE',
      });
  
      renderReservas();
    }
  }
  
  function openModal() {
    document.getElementById('reservaModal').style.display = 'block';
  }
  
  function closeModal() {
    document.getElementById('reservaModal').style.display = 'none';
  }
  
  window.onload = renderReservas;
  