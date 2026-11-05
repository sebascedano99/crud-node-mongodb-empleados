# Gestión de empleados · CRUD con Node.js y MongoDB

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

Aplicación para gestionar los empleados de una empresa con las cuatro operaciones **CRUD** (crear, consultar, modificar y eliminar). La misma aplicación está desarrollada de **dos formas distintas** para comparar arquitecturas:

- **Opción A:** script de Node.js que se ejecuta en la **consola**, sin servidor web.
- **Opción B:** servidor **Express** con una **API REST** y una **interfaz web** en HTML, CSS y JavaScript.

Las dos versiones usan el driver oficial de MongoDB y funcionan tanto con **MongoDB Community Server (local)** como con **MongoDB Atlas (nube)**, cambiando solo la cadena de conexión.

> Proyecto realizado como práctica académica del módulo **Big Data Aplicado** del **Máster en Inteligencia Artificial y Big Data** · **Digitech FP** (Madrid, España) · Curso **2026-2027**.

---

## Demo

![Demo de la aplicación web](capturas/demo.gif)

*Interfaz web (Opción B): creación, edición y eliminación de empleados.*

---

## Funcionalidades

**Opción A · Consola**
- Menú interactivo en la terminal.
- Insertar, listar, modificar el departamento y eliminar empleados por su `_id`.

**Opción B · Web**
- API REST con Express (`GET`, `POST`, `PUT`, `DELETE`).
- Interfaz web con formulario y tabla que se comunica con la API mediante `fetch()`.
- Un mismo formulario para crear y para editar empleados.

**Configuración**
- Cadena de conexión en un archivo `.env`, de modo que las credenciales no aparecen en el código.
- Si no existe `.env`, la aplicación usa MongoDB local automáticamente.

---

## Arquitectura

**Opción A · Node.js sin servidor HTTP**

```
USUARIO (consola)
      │
      ▼
NODE.JS (script.js) ──── Driver MongoDB ────► MONGODB (empresa.empleados)
```

**Opción B · Node.js como servidor HTTP**

```
NAVEGADOR (HTML + CSS + JS)
      │  HTTP · puerto 3000
      ▼
NODE.JS + EXPRESS (server.js)
      │  Protocolo MongoDB · puerto 27017
      ▼
MONGODB (empresa.empleados)
```

El navegador **nunca** se conecta directamente a MongoDB: siempre pasa por el servidor Express.

---

## Estructura del proyecto

```
ProyectoMongoNode/
├── crearBD.js        # Crea la base de datos e inserta empleados de ejemplo
├── script.js         # Opción A: CRUD por consola
├── server.js         # Opción B: servidor Express y API REST
├── public/           # Opción B: interfaz web
│   ├── index.html
│   ├── estilos.css
│   └── app.js        # Comunicación con la API mediante fetch()
├── capturas/         # Capturas y demo del README
├── .env.example      # Plantilla de configuración
├── .gitignore
├── package.json
└── README.md
```

---

## Modelo de datos

Base de datos: `empresa` · Colección: `empleados`

| Campo          | Tipo     | Descripción                          |
|----------------|----------|--------------------------------------|
| `_id`          | ObjectId | Identificador único (lo crea MongoDB) |
| `nombre`       | String   | Nombre del empleado                  |
| `edad`         | Number   | Edad                                 |
| `departamento` | String   | Departamento                         |
| `salario`      | Number   | Salario                              |

---

## Requisitos

- [Node.js](https://nodejs.org/) 20.19 o superior
- MongoDB Community Server en local **o** una cuenta de [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## Instalación

```bash
git clone https://github.com/sebascedano99/crud-node-mongodb-empleados.git
cd crud-node-mongodb-empleados
npm install
```

### Configuración (opcional, solo para MongoDB Atlas)

Copia `.env.example` con el nombre `.env` y escribe tu cadena de conexión:

```
MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

Si no creas el archivo `.env`, la aplicación se conecta a `mongodb://localhost:27017`.

---

## Uso

**1. Crear la base de datos con datos de ejemplo** (ejecutar una sola vez):

```bash
node crearBD.js
```

**2. Opción A · CRUD por consola:**

```bash
node script.js
```

**3. Opción B · Aplicación web:**

```bash
node server.js
```

Después abre [http://localhost:3000](http://localhost:3000) en el navegador.

---

## API REST

| Método | Ruta              | Operación                 | Método de MongoDB |
|--------|-------------------|---------------------------|-------------------|
| GET    | `/empleados`      | Listar todos los empleados | `find()`          |
| POST   | `/empleados`      | Crear un empleado          | `insertOne()`     |
| PUT    | `/empleados/:id`  | Modificar un empleado      | `updateOne()`     |
| DELETE | `/empleados/:id`  | Eliminar un empleado       | `deleteOne()`     |

Ejemplo de cuerpo JSON para `POST` y `PUT`:

```json
{
  "nombre": "Ana",
  "edad": 30,
  "departamento": "Informática",
  "salario": 2500
}
```

---

## Capturas

**Opción A · Consola**

![CRUD por consola](capturas/consola.png)

**Opción B · Interfaz web**

![Interfaz web](capturas/web.png)

**MongoDB Atlas · Datos en la nube**

![Datos en MongoDB Atlas](capturas/atlas.png)

---

## Qué he aprendido

- Node.js puede conectarse a MongoDB directamente con el driver oficial, **sin necesidad de Express**.
- Express convierte Node.js en un **servidor HTTP** capaz de atender peticiones de un navegador.
- Una **API REST** separa la interfaz de la lógica y del acceso a datos: la misma ruta (`/empleados`) realiza operaciones distintas según el método HTTP.
- Diferencias con una base de datos relacional: en MongoDB la base de datos y la colección se crean automáticamente con la primera escritura y no existe un esquema fijo.
- Pasar de MongoDB local a **MongoDB Atlas** solo requiere cambiar la cadena de conexión y configurar el usuario y el acceso de red en Atlas.
- Buenas prácticas de seguridad básicas: guardar las credenciales en variables de entorno (`.env`) y excluirlas del repositorio con `.gitignore`.

---

## Posibles mejoras

- Validar los datos en el servidor antes de insertarlos o modificarlos.
- Validar el formato del `_id` en la versión de consola con `ObjectId.isValid()`, para que un ID mal escrito no cierre el programa.
- Añadir una ruta `GET /empleados/:id` para obtener un solo empleado al editar.
- Escapar los datos al mostrarlos en la tabla para evitar inyección de HTML (XSS).
- Evitar que `crearBD.js` duplique los datos si se ejecuta más de una vez.

---

## Autor

**David Sebastián Cedano Barbosa** · [GitHub](https://github.com/sebascedano99) · [LinkedIn](https://www.linkedin.com/in/sebastian-cedano99/)
