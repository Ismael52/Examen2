async function fetchUsuarios() {
    const response = await fetch('http://localhost:3000/usuario');
    const usuarios = await response.json();
    return usuarios;
  }
  
  async function renderUsuarios() {
    const usuarios = await fetchUsuarios();
    const table = document.getElementById('usuarioTable');
    table.innerHTML = '<tr><th>ID</th><th>Nombres</th><th>Apellidos</th><th>Correo</th><th>Teléfono</th><th>Estado</th><th>Es Admin</th><th>Es Anfitrión</th><th>Foto</th><th>Acciones</th></tr>';
    usuarios.forEach(usuario => {
      const row = table.insertRow();
      row.innerHTML = `<td>${usuario.idusuario}</td><td>${usuario.nombres}</td><td>${usuario.apellidos}</td>
        <td>${usuario.correo}</td><td>${usuario.telefono}</td><td>${usuario.estado}</td><td>${usuario.esadmin ? 'Sí' : 'No'}</td>
        <td>${usuario.esanfitrion ? 'Sí' : 'No'}</td><td>${usuario.foto}</td>
        <td><button onclick="editUsuario(${usuario.idusuario})">Editar</button>
        <button onclick="deleteUsuario(${usuario.idusuario})">Eliminar</button></td>`;
    });
  }
  
  async function saveUsuario() {
    const form = document.getElementById('usuarioForm');
    const nombres = form.elements['nombres'].value;
    const apellidos = form.elements['apellidos'].value;
    const correo = form.elements['correo'].value;
    const contraseña = form.elements['contraseña'].value;
    const telefono = form.elements['telefono'].value;
    const estado = form.elements['estado'].value;
    const esAdmin = form.elements['esAdmin'].checked;
    const esAnfitrion = form.elements['esAnfitrion'].checked;
    const foto = form.elements['foto'].value;
  
    const response = await fetch('http://localhost:3000/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombres, apellidos, correo, contraseña, telefono, estado, esAdmin, esAnfitrion, foto }),
    });
  
    closeModal();
    renderUsuarios();
  }
  
  async function editUsuario(id) {
    const response = await fetch(`http://localhost:3000/usuario/${id}`);
    const usuario = await response.json();
  
    const form = document.getElementById('usuarioForm');
    form.elements['nombres'].value = usuario.nombres;
    form.elements['apellidos'].value = usuario.apellidos;
    form.elements['correo'].value = usuario.correo;
    // Asegúrate de manejar adecuadamente la contraseña en un entorno real
    form.elements['contraseña'].value = ''; 
    form.elements['telefono'].value = usuario.telefono;
    form.elements['estado'].value = usuario.estado;
    form.elements['esAdmin'].checked = usuario.esadmin;
    form.elements['esAnfitrion'].checked = usuario.esanfitrion;
    form.elements['foto'].value = usuario.foto;
  
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar';
    saveButton.addEventListener('click', async () => {
      const updatedUsuario = {
        nombres: form.elements['nombres'].value,
        apellidos: form.elements['apellidos'].value,
        correo: form.elements['correo'].value,
        telefono: form.elements['telefono'].value,
        estado: form.elements['estado'].value,
        esadmin: form.elements['esAdmin'].checked,
        esanfitrion: form.elements['esAnfitrion'].checked,
        foto: form.elements['foto'].value
      };
  
      try {
        const updateResponse = await fetch(`http://localhost:3000/usuario/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedUsuario)
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
  
  
  async function deleteUsuario(id) {
    const confirmDelete = confirm('¿Estás seguro de eliminar este usuario?');
    if (confirmDelete) {
      const response = await fetch(`http://localhost:3000/usuario/${id}`, {
        method: 'DELETE',
      });
  
      renderUsuarios();
    }
  }
  
  function openModal() {
    document.getElementById('usuarioModal').style.display = 'block';
  }
  
  function closeModal() {
    document.getElementById('usuarioModal').style.display = 'none';
  }
  
  window.onload = renderUsuarios;
  