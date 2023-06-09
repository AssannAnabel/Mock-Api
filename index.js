const BASE_URL= "https://647dd4d6af984710854a6fcc.mockapi.io/users"
//capturo modal para poder abrirlo y cerrarlo
const modal = document.getElementById("modal");
//capturo formulario para escuchar su imput submit
const form = document.getElementById("form");
//capturo boton closeModal
const closeModal = document.getElementById("closeModal")
//capturo input del modal
let nuevoName = document.getElementById("nombre");
let nuevoEmail = document.getElementById("emails");
let nuevoPhone = document.getElementById("telefono");

function getUsers() {// conseguir
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
         data.sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));//metodo sort para ordenar "es"(español) y sensitivy(no distingue entre Mayúscula y Minúscula) son opcionales.
        const table = document.getElementById("usersTable");
        table.innerHTML = ""; // Limpiar la tabla antes de volver a cargar los datos.
        data.forEach(user => {
          const row = table.insertRow();
          row.insertCell().textContent = user.id;
          row.insertCell().textContent = user.name;
          row.insertCell().textContent = user.email;
          row.insertCell().textContent = user.phone;
          row.insertCell().innerHTML = `<button onclick="deleteOne(${user.id})"><i class="fa-sharp fa-solid fa-trash"></i></button>`;
          row.insertCell().innerHTML = `<button onclick="upDateOne(${user.id})"><i class="fa-solid fa-user-pen"></i></button>`;
        });
      })
      .catch(err => console.error(err));
  }
  function createUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const user = {
      name: name,
      email: email,
      phone: phone,
    };
    //primer parametro url base,el segundo es un objeto que lleva tipo de petición es "POST"(crear y mandar informacion al body)
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },//control de seguridad
      body: JSON.stringify(user),// de javascript se pasa a json
    })
      .then((res) => res.json())
      .then(() => {
        getUsers();
        document.getElementById("name").value="";
        document.getElementById("email").value="";
        document.getElementById("phone").value="";
      })
      .catch((error) => console.error(error));
  }
  
  function deleteOne(id) {// tanto "PUT" como "DELETE" van con ID
    fetch(BASE_URL + `/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        getUsers();
      })
      .catch((err) => console.error(err));
  }
  /*function userModified() {
    const user = {
      name: nuevoName.value,
      email: nuevoEmail.value,
      phone: nuevoPhone.value,
    };
    return user;
  }
  
  function upDateOne(id) {
    let user1 = undefined;
    modal.showModal();
    closeModal.addEventListener("click", () => {
      modal.close();
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      user1 = userModified();
      modifier(id, user1);
    });
  }
    function modifier(id, usuario) {
    fetch(BASE_URL + `/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then(() => {
        getUsers();
        modal.close();
       
      })
      .catch((err) => console.error(err));
  }
  
  getUsers();//carga página*/

  function getUserUrl(id) {// creo funcion que me trae la data
    return fetch(BASE_URL + `/${id}`)
      .then(res => res.json())
      .catch(err => console.error(err));
  }
  
  function userModified() {
    const user = {
      name: nuevoName.value,
      email: nuevoEmail.value,
      phone: nuevoPhone.value,
    };
    return user;
  }
  function upDateOne(id) {
    let user1 = undefined;
    modal.showModal();
        getUserUrl(id) // Obtener el usuario por su ID
      .then(user => {
        nuevoName.value = user.name;
        nuevoEmail.value = user.email;
        nuevoPhone.value = user.phone;
        closeModal.addEventListener("click", () => {
          modal.close();
          
        });
  
        form.addEventListener("submit", (event) => {
          user1 = userModified();
          modifier(id, user1);
          
        });
      })
      .catch(err => console.error(err));
  }
  
  function modifier(id, usuario) {
    fetch(BASE_URL + `/${id}`, {
      method: "PUT",// modifica y envia datos.
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then(() => {
        getUsers();
        modal.close();
      })
      .catch((err) => console.error(err));
  }
  
  getUsers();
  
  
  
  
  
  
  