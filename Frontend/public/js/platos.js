// Función para obtener la lista de platos desde el backend
async function fetchPlatos() {
    const response = await fetch('http://localhost:3000/plato');
    const platos = await response.json();
    return platos;
  }
  
  // Función para renderizar la tabla de platos en la interfaz
  async function renderPlatos() {
    const platos = await fetchPlatos();
    const table = document.getElementById('platoTable');
    table.innerHTML = '<tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Foto</th><th>Estado</th><th>ID Tipo de Plato</th><th>Acciones</th></tr>';
    platos.forEach(plato => {
      const row = table.insertRow();
      row.innerHTML = `<td>${plato.idplato}</td><td>${plato.nombre}</td><td>${plato.descripcion}</td>
        <td>${plato.foto}</td><td>${plato.estado}</td><td>${plato.idtipoplato}</td>
        <td><button onclick="editPlato(${plato.idplato})">Editar</button>
        <button onclick="deletePlato(${plato.idplato})">Eliminar</button></td>`;
    });
  }
  
  // Función para guardar un nuevo plato en el backend
  async function savePlato() {
    const form = document.getElementById('platoForm');
    const nombre = form.elements['nombre'].value;
    const descripcion = form.elements['descripcion'].value;
    const foto = form.elements['foto'].value;
    const estado = form.elements['estado'].value;
    const idTipoPlato = form.elements['idTipoPlato'].value;
  
    const response = await fetch('http://localhost:3000/plato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, descripcion, foto, estado, idTipoPlato }),
    });
  
    closeModal();
    renderPlatos();
  }
  
  // Función para editar un plato existente
  async function editPlato(id) {
    const response = await fetch(`http://localhost:3000/plato/${id}`);
    const plato = await response.json();
  
    const form = document.getElementById('platoForm');
    form.elements['nombre'].value = plato.nombre;
    form.elements['descripcion'].value = plato.descripcion;
    form.elements['foto'].value = plato.foto;
    form.elements['estado'].value = plato.estado;
    form.elements['idTipoPlato'].value = plato.idtipoplato;
  
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar';
    saveButton.addEventListener('click', async () => {
      const nombre = form.elements['nombre'].value;
      const descripcion = form.elements['descripcion'].value;
      const foto = form.elements['foto'].value;
      const estado = form.elements['estado'].value;
      const idTipoPlato = form.elements['idTipoPlato'].value;
  
      try {
        const updateResponse = await fetch(`http://localhost:3000/plato/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, descripcion, foto, estado, idTipoPlato }),
        });
  
        if (updateResponse.ok) {
          // Aquí puedes cerrar el modal o realizar otras acciones después de la actualización
          console.log('Plato actualizado correctamente');
        } else {
          console.error('Error al actualizar el plato:', updateResponse.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud de edición:', error);
      }
    });
  
    form.appendChild(saveButton);
    
    openModal(); // Abre el modal para editar el plato
  }
  
  
  // Función para eliminar un plato
  async function deletePlato(id) {
    const confirmDelete = confirm('¿Estás seguro de eliminar este plato?');
    if (confirmDelete) {
      const response = await fetch(`http://localhost:3000/plato/${id}`, {
        method: 'DELETE',
      });
  
      renderPlatos();
    }
  }
  
  // Función para abrir la ventana modal
  function openModal() {
    document.getElementById('platoModal').style.display = 'block';
  }
  
  // Función para cerrar la ventana modal
  function closeModal() {
    document.getElementById('platoModal').style.display = 'none';
  }
  
  // Llamamos a la función para renderizar los platos al cargar la página
  window.onload = renderPlatos;
  