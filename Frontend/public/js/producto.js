async function fetchProductos() {
    const response = await fetch('http://localhost:3000/producto');
    const productos = await response.json();
    return productos;
  }
  
  async function renderProductos() {
    const productos = await fetchProductos();
    const table = document.getElementById('productoTable');
    table.innerHTML = '<tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Foto</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th></tr>';
    productos.forEach(producto => {
      const row = table.insertRow();
      row.innerHTML = `<td>${producto.idproducto}</td><td>${producto.nombre}</td><td>${producto.descripcion}</td>
        <td>${producto.foto}</td><td>${producto.precio}</td><td>${producto.stock}</td><td>${producto.estado}</td>
        <td><button onclick="editProducto(${producto.idproducto})">Editar</button>
        <button onclick="deleteProducto(${producto.idproducto})">Eliminar</button></td>`;
    });
  }
  
  async function saveProducto() {
    const form = document.getElementById('productoForm');
    const nombre = form.elements['nombre'].value;
    const descripcion = form.elements['descripcion'].value;
    const foto = form.elements['foto'].value;
    const precio = form.elements['precio'].value;
    const stock = form.elements['stock'].value;
    const estado = form.elements['estado'].value;
  
    const response = await fetch('http://localhost:3000/producto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, descripcion, foto, precio, stock, estado }),
    });
  
    closeModal();
    renderProductos();
  }
  
  async function editProducto(id) {
    const response = await fetch(`http://localhost:3000/producto/${id}`);
    const producto = await response.json();
  
    const form = document.getElementById('productoForm');
    form.elements['nombre'].value = producto.nombre;
    form.elements['descripcion'].value = producto.descripcion;
    form.elements['foto'].value = producto.foto;
    form.elements['precio'].value = producto.precio;
    form.elements['stock'].value = producto.stock;
    form.elements['estado'].value = producto.estado;
  
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar';
    saveButton.addEventListener('click', async () => {
      const updatedProducto = {
        nombre: form.elements['nombre'].value,
        descripcion: form.elements['descripcion'].value,
        foto: form.elements['foto'].value,
        precio: form.elements['precio'].value,
        stock: form.elements['stock'].value,
        estado: form.elements['estado'].value
      };
  
      try {
        const updateResponse = await fetch(`http://localhost:3000/producto/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedProducto)
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
  
  
  async function deleteProducto(id) {
    const confirmDelete = confirm('¿Estás seguro de eliminar este producto?');
    if (confirmDelete) {
      const response = await fetch(`http://localhost:3000/producto/${id}`, {
        method: 'DELETE',
      });
  
      renderProductos();
    }
  }
  
  function openModal() {
    document.getElementById('productoModal').style.display = 'block';
  }
  
  function closeModal() {
    document.getElementById('productoModal').style.display = 'none';
  }
  
  window.onload = renderProductos;
  