async function login() {
  const correo = document.getElementById('correo').value;
  const contraseña = document.getElementById('contraseña').value;

  try {
    const response = await fetch('http://localhost:3000/usuario/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo, contraseña }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('¿Es admin?', data.usuario.esadmin); // Verificar si es admin o no

      const esAdmin = data.usuario.esadmin; // Guardar el estado de administrador

      if (esAdmin) {
        redirectToAdminPanel();
      } else {
        redirectToUserPanel();
      }
    } else {
      // Manejo de errores, mostrar mensaje de error, etc.
      console.log('Error en el inicio de sesión:', data.error);
    }
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
  }
}

function redirectToAdminPanel() {
  window.location.href = '../views/panelAdmin.html';
}

function redirectToUserPanel() {
  window.location.href = '../views/panelUsuario.html';
}





async function register() {
  const nombres = document.getElementById('nombres').value;
  const apellidos = document.getElementById('apellidos').value;
  const correo = document.getElementById('correoRegistro').value;
  const contraseña = document.getElementById('contraseñaRegistro').value;
  const telefono = document.getElementById('telefono').value;
  const estado = document.getElementById('estado').value;
  const foto = document.getElementById('foto').value;

  try {
    const response = await fetch('http://localhost:3000/usuario/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombres, apellidos, correo, contraseña, telefono, estado, foto }),
    });

    const data = await response.json();

    console.log(data); // Manejar la respuesta según sea necesario

    closeModal(); // Cerrar el modal después del registro exitoso
  } catch (error) {
    console.error('Error durante el registro:', error);
  }
}

function openModal() {
  document.getElementById('registerModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('registerModal').style.display = 'none';
}