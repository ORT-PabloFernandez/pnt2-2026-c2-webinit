# Introducción al DOM con JavaScript

## Objetivo de esta guía

Al terminar esta introducción podrás:

- explicar qué es el DOM y por qué tiene forma de árbol;
- distinguir JavaScript, HTML y las API del navegador;
- seleccionar, crear, modificar e insertar elementos;
- escuchar eventos como `click` y `DOMContentLoaded`;
- entender el ejemplo **Directorio de Usuarios**;
- reconocer y corregir errores frecuentes al recorrer el DOM.

> **Idea central:** HTML describe la estructura inicial de una página. El navegador interpreta ese HTML y crea en memoria un árbol de objetos: el DOM. JavaScript usa esos objetos para leer y modificar la página.

---

## 1. ¿Qué es el DOM?

DOM significa **Document Object Model** o **Modelo de Objetos del Documento**. No es el archivo HTML ni es una parte del lenguaje JavaScript. Es una API que ofrece el navegador para representar e interactuar con un documento.

Por ejemplo, el navegador puede recibir este HTML:

```html
<body>
  <h1 id="titulo">Hola</h1>
  <p>Bienvenido al curso</p>
</body>
```

Y representarlo, de forma simplificada, así:

```text
document
└── html
    ├── head
    └── body
        ├── h1#titulo
        │   └── "Hola"
        └── p
            └── "Bienvenido al curso"
```

Cada parte del árbol es un **nodo**. Las etiquetas son nodos de tipo elemento y el texto contenido en ellas también puede estar representado por nodos de texto.

Gracias al DOM, JavaScript puede hacer esto:

```js
const titulo = document.getElementById('titulo');
titulo.textContent = '¡Hola, DOM!';
```

La primera línea busca un objeto del árbol. La segunda cambia su contenido. El navegador refleja ese cambio en la pantalla.

---

## 2. Tres capas que conviene distinguir

| Capa | Para qué sirve | Ejemplos |
|---|---|---|
| HTML | Define contenido y estructura | `<h1>`, `<p>`, `<ul>` |
| CSS | Define la presentación | colores, tamaños, distribución |
| JavaScript | Define comportamiento y lógica | funciones, variables, arrays |
| API del navegador | Permite que JavaScript interactúe con la página y el navegador | `document`, `Element`, `Event`, `console` |

JavaScript incluye objetos propios del lenguaje, por ejemplo `Array`, `Object`, `String`, `Number`, `Date`, `Math` y `JSON`. En cambio, `window`, `document`, los elementos HTML y los eventos son objetos proporcionados por el entorno del navegador.

---

## 3. Principales objetos relacionados con el DOM

### `window`

Representa la ventana o pestaña del navegador. Es el objeto global del JavaScript ejecutado en una página.

```js
console.log(window.innerWidth);
window.alert('Hola');
```

Muchas propiedades globales pueden escribirse sin el prefijo `window`:

```js
window.document === document; // true
```

### `document`

Representa la página cargada y es el punto de entrada principal al árbol DOM.

```js
document.getElementById('titulo');
document.querySelector('.user-item');
document.createElement('li');
```

### `Node`

Es una interfaz general compartida por los distintos tipos de nodo del árbol. Un documento, un elemento y un nodo de texto son nodos.

Algunas propiedades y métodos importantes:

- `parentNode`: nodo padre;
- `childNodes`: todos los nodos hijos, incluidos textos y comentarios;
- `appendChild(nodo)`: agrega un nodo hijo;
- `removeChild(nodo)`: quita un nodo hijo.

### `Element`

Representa una etiqueta HTML, como `<li>`, `<img>` o `<p>`. Hereda capacidades de `Node` y agrega herramientas específicas para elementos.

```js
element.children;
element.className;
element.classList.add('activo');
element.querySelector('.user-description');
element.setAttribute('aria-label', 'Usuario');
```

### Elementos HTML específicos

Cada etiqueta puede ofrecer propiedades relacionadas con su función. Por ejemplo:

```js
img.src = 'avatar.jpg';
img.alt = 'Retrato de Ada';
link.href = 'perfil.html?id=1';
```

Un `<img>` se representa normalmente mediante un objeto `HTMLImageElement`, y un `<a>` mediante un `HTMLAnchorElement`. Ambos siguen siendo también `Element` y `Node`.

### `Event`

Representa algo que ocurrió: un clic, una tecla presionada o la finalización de la construcción del DOM.

```js
element.addEventListener('click', event => {
  console.log(event.type);          // "click"
  console.log(event.target);        // origen exacto del clic
  console.log(event.currentTarget); // elemento que escucha el evento
});
```

La diferencia entre `target` y `currentTarget` es especialmente importante cuando un elemento contiene otros elementos.

### Colecciones: `HTMLCollection` y `NodeList`

Algunas búsquedas y propiedades devuelven grupos de nodos:

```js
const hijos = element.children;              // HTMLCollection
const tarjetas = document.querySelectorAll('.user-item'); // NodeList
```

No son exactamente arrays, aunque `NodeList` suele permitir `forEach`. Si necesitas métodos completos de array, puedes convertir una colección:

```js
const arrayDeHijos = Array.from(element.children);
```

### `console`

No forma parte del DOM, pero es una herramienta del navegador fundamental para observar y depurar el programa.

```js
console.log('Aplicación iniciada');
console.error('No se encontró #user-list');
```

---

## 4. Operaciones esenciales

### Seleccionar

```js
const porId = document.getElementById('user-list');
const primero = document.querySelector('.user-item');
const todos = document.querySelectorAll('.user-item');
```

`getElementById` busca un id. `querySelector` y `querySelectorAll` aceptan selectores CSS.

### Crear

```js
const li = document.createElement('li');
const nombre = document.createElement('h3');
```

En este momento los objetos existen en memoria, pero todavía no aparecen en la página.

### Configurar

```js
li.className = 'user-item';
nombre.textContent = 'Ada Lovelace';
```

Para texto común, `textContent` es una opción clara y segura. No interpreta el contenido como HTML.

### Insertar

```js
li.appendChild(nombre);
document.getElementById('user-list').appendChild(li);
```

`appendChild` agrega el nodo al final de los hijos del elemento padre. También existe la API moderna `append`, que admite varios nodos y cadenas.

### Escuchar eventos

```js
li.addEventListener('click', handlerClickCard);
```

`addEventListener` es la forma recomendada para registrar eventos porque permite varios manejadores y ofrece opciones adicionales.

---

## 5. Anatomía del Directorio de Usuarios

El programa construye para cada usuario un árbol como este:

```text
li.user-item
├── img.user-photo
└── div.user-info
    ├── h3
    ├── p.user-role
    ├── p.user-location
    ├── p.user-description
    └── div.user-actions
        ├── a  "Ver perfil"
        └── a  "Enviar email"
```

La función `createUser(...)` actúa como una pequeña fábrica: recibe datos, construye el árbol de elementos y devuelve su raíz, el `<li>`.

### Paso 1: crear el elemento principal

```js
const li = document.createElement('li');
li.className = 'user-item';
```

`li` es una referencia a un objeto DOM. Todavía no está dentro del documento.

### Paso 2: crear y configurar una imagen

```js
const img = document.createElement('img');
img.alt = 'Portrait of ' + name;
img.className = 'user-photo';
img.src = imageUrl;
```

Aquí se asignan propiedades del objeto `HTMLImageElement`. El navegador las refleja como atributos HTML.

Una versión completamente en español podría usar:

```js
img.alt = 'Retrato de ' + name;
```

### Paso 3: crear contenido de texto

```js
const h3 = document.createElement('h3');
h3.textContent = name;
```

La propiedad `textContent` cambia el texto contenido por el elemento. El mismo patrón se repite para el rol, la ubicación y la descripción.

### Paso 4: crear enlaces

```js
const linkProfile = document.createElement('a');
linkProfile.href = 'userProfile.html?id=' + userId;
linkProfile.textContent = 'Ver perfil';
```

El id se incorpora como parámetro de consulta. Si `userId` vale `25`, la URL resultante será:

```text
userProfile.html?id=25
```

En código moderno también puede escribirse con una plantilla de texto:

```js
linkProfile.href = `userProfile.html?id=${userId}`;
```

### Paso 5: construir de adentro hacia afuera

```js
actions.appendChild(linkProfile);
actions.appendChild(linkEmail);

userInfo.appendChild(h3);
userInfo.appendChild(pRole);
userInfo.appendChild(pLocation);
userInfo.appendChild(pDescription);
userInfo.appendChild(actions);

li.appendChild(img);
li.appendChild(userInfo);
```

El orden de `appendChild` determina el orden visual de los elementos dentro de cada padre.

### Paso 6: devolver la tarjeta terminada

```js
return li;
```

La función devuelve el nodo raíz con todos sus descendientes. Otra parte del programa decidirá dónde insertarlo.

---

## 6. Inicialización de la aplicación

```js
function initializeApp() {
  const userList = document.getElementById('user-list');
  const users = getUsers();

  users.forEach(user => {
    const userElement = createUser(
      user.name,
      user.role,
      user.location,
      user.description,
      user.image,
      user.id
    );

    userList.appendChild(userElement);
  });
}
```

El flujo es:

1. localizar la lista ya existente en el HTML;
2. obtener un array de objetos de usuario;
3. recorrer el array con `forEach`;
4. crear una tarjeta por cada objeto;
5. insertar cada tarjeta en la lista.

`getUsers()` no es una función del DOM ni una función incorporada de JavaScript: debe estar definida por la aplicación y devolver algo parecido a esto:

```js
[
  {
    id: 1,
    name: 'Ada Lovelace',
    role: 'Programadora',
    location: 'Londres',
    description: 'Pionera de la computación',
    image: 'ada.jpg'
  }
]
```

Conviene comprobar que el contenedor exista antes de usarlo:

```js
const userList = document.getElementById('user-list');

if (!userList) {
  console.error('No se encontró el elemento #user-list');
  return;
}
```

---

## 7. ¿Por qué se espera `DOMContentLoaded`?

```js
document.addEventListener('DOMContentLoaded', initializeApp);
```

El navegador procesa el HTML de arriba hacia abajo. Si JavaScript busca `#user-list` antes de que el navegador haya creado ese nodo, obtendrá `null`.

El evento `DOMContentLoaded` indica que el HTML ya fue analizado y el árbol DOM está construido. No necesita esperar a que terminen de cargar todas las imágenes.

La función no se ejecuta inmediatamente: se entrega como referencia para que el navegador la llame cuando ocurra el evento.

```js
// Correcto: registra la función
document.addEventListener('DOMContentLoaded', initializeApp);

// Incorrecto para este propósito: la ejecuta ahora
document.addEventListener('DOMContentLoaded', initializeApp());
```

---

## 8. El problema del manejador de clic del ejemplo

El código original combina estas dos partes:

```js
li.onclick = handlerClick_Card;

function handlerClick_Card(element) {
  const userInfo = element.children[1];
}
```

Esta combinación tiene un error conceptual: cuando ocurre el clic, el navegador llama al manejador pasando un objeto `Event` como primer argumento. Por lo tanto, la variable llamada `element` no contiene el `<li>` y `element.children` no funciona.

### Corrección mínima usando `this`

Con una función tradicional asignada a `onclick`, `this` referencia el elemento que posee el manejador:

```js
function handlerClick_Card() {
  const userInfo = this.children[1];
  const description = userInfo.children[3];
  // ...
}
```

Aunque funciona, depende de posiciones numéricas y resulta frágil.

### Corrección recomendada

```js
function handlerClickCard(event) {
  const card = event.currentTarget;
  const description = card.querySelector('.user-description');

  if (!description) return;

  description.clickCount = (description.clickCount ?? 0) + 1;
  description.textContent =
    `Descripción clickeada ${description.clickCount} veces`;
}

li.addEventListener('click', handlerClickCard);
```

Esta versión es más clara porque:

- `event.currentTarget` identifica la tarjeta que registró el manejador;
- `querySelector('.user-description')` expresa qué elemento se busca;
- el código no depende de que la descripción continúe en la posición `[3]`;
- `addEventListener` separa claramente la creación del elemento y el registro del evento;
- `?? 0` utiliza cero solamente cuando el contador todavía no existe.

> Si el usuario hace clic sobre la imagen o sobre un párrafo, `event.target` puede ser ese elemento interior. `event.currentTarget`, en cambio, seguirá siendo el `<li>` que escucha el evento.

---

## 9. Propiedades personalizadas en objetos DOM

El ejemplo agrega una propiedad propia:

```js
description.clickCount = 0;
```

JavaScript permite agregar propiedades a muchos objetos de forma dinámica. Para un ejercicio funciona, pero mezcla el estado de la aplicación con el objeto visual.

Una opción más explícita en el DOM es usar `dataset`:

```js
const currentCount = Number(description.dataset.clickCount ?? 0);
const newCount = currentCount + 1;

description.dataset.clickCount = String(newCount);
description.textContent = `Descripción clickeada ${newCount} veces`;
```

Esto crea o actualiza el atributo `data-click-count` en el HTML. En una aplicación mayor, el contador también podría guardarse en un objeto de estado separado.

---

## 10. Errores frecuentes

### Confundir un elemento con una cadena HTML

```js
const li = document.createElement('li'); // objeto Element
const texto = '<li></li>';               // string
```

Solo el primero tiene métodos como `appendChild` y `querySelector`.

### Usar una referencia antes de que exista

```js
const list = document.getElementById('user-list');
list.appendChild(li); // falla si list es null
```

### Depender demasiado de índices

```js
element.children[1].children[3];
```

Si alguien agrega otro párrafo antes de la descripción, el índice cambia. Un selector suele comunicar mejor la intención:

```js
element.querySelector('.user-description');
```

### Confundir `children` con `childNodes`

- `children` devuelve solo elementos HTML hijos.
- `childNodes` también puede incluir texto, espacios y comentarios.

### Ejecutar una función en vez de registrarla

```js
button.addEventListener('click', saveUser);   // referencia
button.addEventListener('click', saveUser()); // ejecución inmediata
```

---

## 11. Ejercicios propuestos

1. Cambia el texto de la descripción al hacer clic y agrega una clase CSS `selected` a la tarjeta.
2. Añade un botón **Eliminar** y usa `element.remove()` para quitar la tarjeta.
3. Sustituye `children[1].children[3]` por un selector de clase.
4. Evita que un clic sobre **Ver perfil** incremente el contador. Investiga `event.stopPropagation()`.
5. Cambia el enlace **Enviar email** para que use una dirección incluida en el objeto de usuario.
6. Muestra el total de tarjetas creadas usando `users.length`.

---

## 12. Resumen rápido

```text
HTML
  ↓ el navegador lo interpreta
DOM: árbol de objetos
  ↓ JavaScript usa la API
seleccionar → crear → configurar → insertar → escuchar eventos
```

- `document` es la entrada al DOM.
- `Node` representa cualquier nodo del árbol.
- `Element` representa una etiqueta.
- `createElement` crea un elemento en memoria.
- `textContent`, `className`, `src` y `href` modifican propiedades.
- `appendChild` o `append` insertan nodos dentro de otros.
- `addEventListener` registra funciones que reaccionan a eventos.
- `DOMContentLoaded` indica que el árbol inicial ya fue construido.
- `event.currentTarget` identifica el elemento que registró el manejador.

---

## Fuentes y lecturas recomendadas

- [MDN: Modelo de Objetos del Documento (DOM)](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model)
- [MDN: interfaz `Document`](https://developer.mozilla.org/es/docs/Web/API/Document)
- [MDN: interfaz `Element`](https://developer.mozilla.org/es/docs/Web/API/Element)
- [MDN: `Node.appendChild()`](https://developer.mozilla.org/es/docs/Web/API/Node/appendChild)
- [MDN: construcción y actualización del árbol DOM](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Building_and_updating_the_DOM_tree)
- [JavaScript.info: recorrido del DOM](https://es.javascript.info/dom-navigation)
- [JavaScript.info: introducción a los eventos del navegador](https://es.javascript.info/introduction-browser-events)

