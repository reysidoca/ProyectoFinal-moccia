Proyecto Final – Tienda Online con React
Introducción

Este proyecto es una tienda online desarrollada como trabajo final del curso de React. Permite navegar un catálogo de productos, filtrarlos por categoría, ver el detalle de cada uno y gestionarlos en un carrito de compras. El proceso de compra se completa con un formulario de checkout que genera una orden en Firebase Firestore.

Tecnologías utilizadas:
React con Vite
Firebase (Firestore)
React Router DOM
Bootstrap

Estructura del proyecto:
src/components: Componentes reutilizables (Navbar, ProductCard, ItemCount, etc.).
src/containers: Contenedores que gestionan datos y estados (ItemListContainer, ItemDetailContainer).
src/context: Manejo del estado global del carrito (CartContext).
src/firebase: Configuración y funciones de acceso a Firestore.
App.jsx: Configuración de rutas y context.
main.jsx: Punto de entrada.

Funcionalidades:
Navegación SPA con React Router.
Catálogo de productos desde Firestore y filtrado por categorías.
Detalle de producto con selección de cantidad y control de stock.
Carrito de compras: agregar, quitar, vaciar, mostrar total.
Formulario de checkout con validaciones básicas.
Generación de órdenes en Firestore, con ID autogenerado.

Cumplimiento de criterios:
Componentes bien separados y reutilizables.
Uso de Context API para manejar el carrito.
Navegación SPA con rutas dinámicas.
Manejo de estados de carga, errores y validación de formularios.
Estilos responsivos con Bootstrap.

Instrucciones para correr el proyecto.

Clonar el repositorio:

git clone https://github.com/reysidoca/ProyectoFinal-moccia.git


Entrar a la carpeta my-app:

cd ProyectoFinal-moccia/my-app


Instalar dependencias:

npm install


Ejecutar en desarrollo:

npm run dev


Abrir en el navegador la URL indicada (por defecto http://localhost:5173).