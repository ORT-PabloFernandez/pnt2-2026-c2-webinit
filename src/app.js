// Crear una tarjeta de usuario dinamicamente, con javascript
function createUser(user) {
    // Creamos un elemento li
    const li = document.createElement('li');
    li.className = 'user-item';

    const img = document.createElement('img');
    img.src = user.image;
    img.className = 'user-photo';
    img.alt = "Foto de " + user.name;

    const userInfo = document.createElement('div');
    userInfo.className = 'user-info';

    const name = document.createElement("h3");
    name.textContent = user.name;

    const role = document.createElement("p");
    role.textContent = user.role;

    userInfo.appendChild(name);
    userInfo.appendChild(role);

    li.appendChild(img);
    li.appendChild(userInfo);  
    
    //TODO: Agregar los demas elementos con los datos de role, location y description.
    //TODO: Agregar la seccion de User Actions

    return li;
}

// Iterar sobre el array de usuarios y llamar a createUser para cada uno
function  initializeApp() {
    const main = document.getElementById('main');
    const ul = document.createElement('ul');
    ul.className = 'user-list';
    const users = getUsers();
    
    // Recorremos el array de usuarios y creamos una tarjeta para cada uno
    users.forEach(user => {
        const userElement = createUser(user);
        // El createUser retorna un li, que agregamos al ul
        ul.appendChild(userElement);
    })

    main.appendChild(ul);
}

// es lo primiero que se ejecuta despues de cargar el DOM
document.addEventListener('DOMContentLoaded', initializeApp);