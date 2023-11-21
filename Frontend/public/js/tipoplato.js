async function fetchTipoPlatos() {
    const response = await fetch('http://localhost:3000/tipoPlato');
    const tipoPlatos = await response.json();
    return tipoPlatos;
  }
  
  async function renderTipoPlatos() {
    const tipoPlatos = await fetchTipoPlatos();
    const table = document.getElementById('tipoPlatoTable');
    table.innerHTML = '<tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr>';
    tipoPlatos.forEach(tipoPlato => {
      const row = table.insertRow();
      row.innerHTML = `<td>${tipoPlato.idtipoplato}</td><td>${tipoPlato.nombre}</td><td>${tipoPlato.descripcion}</td>
        <td><button onclick="editTipoPlato(${tipoPlato.idtipoplato})">Editar</button>
        <button onclick="deleteTipoPlato(${tipoPlato.idtipoplato})">Eliminar</button></td>`;
    });
  }
  
  async function saveTipoPlato() {
    const form = document.getElementById('tipoPlatoForm');
    const nombre = form.elements['nombre'].value;
    const descripcion = form.elements['descripcion'].value;
    const tipoPlatoId = form.elements['tipoPlatoId'].value;
  
    if (tipoPlatoId !== undefined && tipoPlatoId !== '') {
      try {
        const response = await fetch(`http://localhost:3000/tipoPlato/${tipoPlatoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, descripcion }),
        });
  
        if (response.ok) {
          closeModal();
          renderTipoPlatos();
        } else {
          console.error('Error al editar el tipo de plato:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud de edición:', error);
      }
    } else {
      console.error('El ID del tipo de plato no es válido.');
    }
  }
  
  
  
  
  async function editTipoPlato(id) {
    const response = await fetch(`http://localhost:3000/tipoPlato/${id}`);
    const tipoPlato = await response.json();

    
  
    const form = document.getElementById('tipoPlatoForm');
    form.elements['nombre'].value = tipoPlato.nombre;
    form.elements['descripcion'].value = tipoPlato.descripcion;
  
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar';
    saveButton.addEventListener('click', async () => {
      const nombre = form.elements['nombre'].value;
      const descripcion = form.elements['descripcion'].value;
  
      try {
        const updateResponse = await fetch(`http://localhost:3000/tipoPlato/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, descripcion }),
        });
  
        if (updateResponse.ok) {
          closeModal();
          renderTipoPlatos();
        } else {
          console.error('Error al editar el tipo de plato:', updateResponse.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud de edición:', error);
      }
    });
  
    form.appendChild(saveButton); // Agregar el botón de "Guardar" al formulario
  
    openModal();
  }
  
  
  
  
  
  async function deleteTipoPlato(id) {
    const confirmDelete = confirm('¿Estás seguro de eliminar este tipo de plato?');
    if (confirmDelete) {
      const response = await fetch(`http://localhost:3000/tipoPlato/${id}`, {
        method: 'DELETE',
      });
  
      renderTipoPlatos();
    }
  }
  
  function openModal() {
    document.getElementById('tipoPlatoModal').style.display = 'block';
  }
  
  function closeModal() {
    document.getElementById('tipoPlatoModal').style.display = 'none';
  }
  
  window.onload = renderTipoPlatos;
  