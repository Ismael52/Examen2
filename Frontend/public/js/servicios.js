async function fetchServicios() {
    const response = await fetch('http://localhost:3000/servicio');
    const servicios = await response.json();
    return servicios;
  }
  
  async function renderServicios() {
    const servicios = await fetchServicios();
    const table = document.getElementById('servicioTable');
    table.innerHTML = '<tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Fecha de Inicio</th><th>Fecha de Fin</th><th>Cupo</th><th>Precio</th><th>Foto</th><th>ID Usuario</th><th>Acciones</th></tr>';
    servicios.forEach(servicio => {
      const row = table.insertRow();
      row.innerHTML = `<td>${servicio.idservicio}</td><td>${servicio.nombre}</td><td>${servicio.descripcion}</td>
        <td>${servicio.fechaini}</td><td>${servicio.fechafin}</td><td>${servicio.cupo}</td><td>${servicio.precio}</td>
        <td>${servicio.foto}</td><td>${servicio.idusuario}</td>
        <td><button onclick="editServicio(${servicio.idservicio})">Editar</button>
        <button onclick="deleteServicio(${servicio.idservicio})">Eliminar</button></td>`;
    });
  }
  
  async function saveServicio() {
    const form = document.getElementById('servicioForm');
    const nombre = form.elements['nombre'].value;
    const descripcion = form.elements['descripcion'].value;
    const fechaINI = form.elements['fechaINI'].value;
    const fechaFIN = form.elements['fechaFIN'].value;
    const cupo = form.elements['cupo'].value;
    const precio = form.elements['precio'].value;
    const foto = form.elements['foto'].value;
    const idusuario = form.elements['idusuario'].value;
  
    const response = await fetch('http://localhost:3000/servicio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, descripcion, fechaINI, fechaFIN, cupo, precio, foto, idusuario }),
    });
  
    closeServicioModal();
    renderServicios();
  }
  
  async function editServicio(id) {
    const response = await fetch(`http://localhost:3000/servicio/${id}`);
    const servicio = await response.json();
  
    const form = document.getElementById('servicioForm');
    form.elements['nombre'].value = servicio.nombre;
    form.elements['descripcion'].value = servicio.descripcion;
    form.elements['fechaINI'].value = servicio.fechaini;
    form.elements['fechaFIN'].value = servicio.fechafin;
    form.elements['cupo'].value = servicio.cupo;
    form.elements['precio'].value = servicio.precio;
    form.elements['foto'].value = servicio.foto;
    form.elements['idusuario'].value = servicio.idusuario;
  
    openServicioModal();
  }
  
  async function deleteServicio(id) {
    const confirmDelete = confirm('¿Estás seguro de eliminar este servicio?');
    if (confirmDelete) {
      const response = await fetch(`http://localhost:3000/servicio/${id}`, {
        method: 'DELETE',
      });
  
      renderServicios();
    }
  }
  
  function openServicioModal() {
    document.getElementById('servicioModal').style.display = 'block';
  }
  
  function closeServicioModal() {
    document.getElementById('servicioModal').style.display = 'none';
  }
  

  


  async function fetchServiciosPlato() {
    const response = await fetch('http://localhost:3000/servicioPlato');
    const serviciosPlato = await response.json();
    return serviciosPlato;
  }
  
  async function renderServiciosPlato() {
    const serviciosPlato = await fetchServiciosPlato();
    const table = document.getElementById('servicioPlatoTable');
    table.innerHTML = '<tr><th>ID</th><th>ID Servicio</th><th>ID Plato</th><th>Acciones</th></tr>';
    serviciosPlato.forEach(servicioPlato => {
      const row = table.insertRow();
      row.innerHTML = `<td>${servicioPlato.idservicioplato}</td><td>${servicioPlato.idservicio}</td><td>${servicioPlato.idplato}</td>
        <td><button onclick="deleteServicioPlato(${servicioPlato.idservicioplato})">Eliminar</button></td>`;
    });
  }
  
  async function saveServicioPlato() {
    const form = document.getElementById('servicioPlatoForm');
    const idServicio = form.elements['idServicio'].value;
    const idPlato = form.elements['idPlato'].value;
  
    const response = await fetch('http://localhost:3000/servicioPlato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idServicio, idPlato }),
    });
  
    closeServicioPlatoModal();
    renderServiciosPlato();
  }
  
  async function deleteServicioPlato(id) {
    const confirmDelete = confirm('¿Estás seguro de eliminar este ServicioPlato?');
    if (confirmDelete) {
      const response = await fetch(`http://localhost:3000/servicioPlato/${id}`, {
        method: 'DELETE',
      });
  
      renderServiciosPlato();
    }
  }
  
  function openServicioPlatoModal() {
    document.getElementById('servicioPlatoModal').style.display = 'block';
  }
  
  function closeServicioPlatoModal() {
    document.getElementById('servicioPlatoModal').style.display = 'none';
  }
  

  window.onload = async () => {
    await renderServicios();
    await renderServiciosPlato();
  };