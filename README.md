# Prueba Técnica Lógika

Aplicación web para la administración de buenas acciones (categorías), que permite crear, listar y buscar registros conectándose a una API REST externa.

## 1. Descripción general

El proyecto consiste en un **panel administrativo** construido con **React** que se comunica con un servicio backend a través de endpoints REST.  
Incluye autenticación mediante token, rutas privadas protegidas y manejo de formularios con validaciones en cliente.

## 2. Características principales

- Inicio de sesión con persistencia de token
- Rutas privadas y públicas protegidas mediante contexto de autenticación
- Listado de acciones con paginación, filtros y ordenamiento
- Creación de acciones
- Validaciones dinámicas en formularios
- Envío de archivos mediante `FormData`
- Integración con API REST
- Feedback visual (modales, toasts y mensajes de error)
- Estilos con **Tailwind CSS**

## 3. Tecnologías utilizadas

- React
- Vite
- React Router DOM
- Tailwind CSS
- Context API
- Fetch API para consumo de endpoints
- Node.js (entorno de ejecución)

## 4. Requisitos previos

- Node.js versión 18 o superior
- npm versión 9 o superior
- Acceso a la API REST (endpoints disponibles de la prueba técnica)

## 5. Instalación local

Clonar el repositorio e instalar las dependencias:

```bash
git clone https://github.com/wavival/Prueba_Tecnica_Logika.git
cd Prueba_Tecnica_Logika
npm install
```

Configurar las variables de entorno:

```bash
cp .env.example .env
```

Editar el archivo .env con la URL base de la API:

```bash
VITE_AUTH_BASE_URL=https://dev.apinetbo.bekindnetwork.com
VITE_API_BASE_URL=https://dev.api.bekindnetwork.com
```

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en la URL que indique la consola (por defecto http://localhost:5173).

## 6. Variables de entorno

Archivo .env.example:

```bash
# URL base del backend
VITE_AUTH_BASE_URL=https://dev.apinetbo.bekindnetwork.com
VITE_API_BASE_URL=https://dev.api.bekindnetwork.com
```

## 7. Scripts disponibles

```bash
npm run dev       # Ejecuta el entorno de desarrollo

npm run build     # Genera el build de producción

npm run preview   # Sirve el build localmente

npm run lint      # Revisión de linting
```

## 8. Autenticación y rutas protegidas

El manejo de autenticación se realiza mediante un AuthContext que persiste el token en **localStorage (BK_TOKEN)**.
Las rutas privadas son controladas por el componente _PrivateRoute_, que redirige al usuario a _/login_ cuando no existe un token válido.

### Estructura de rutas:

- /login → acceso público

- /dashboard → acceso privado

- /create → acceso privado

## 9. Despliegue

Generar el build de producción:

```bash
npm run build
```

El contenido optimizado se encuentra en la carpeta dist/, lista para ser desplegada en cualquier servicio de hosting estático (Vercel, Netlify, Render, etc.).

## 10. Estructura general del proyecto

El proyecto sigue una organización modular típica de React:

- `src/api/` – servicios y funciones de comunicación con la API
- `src/components/` – componentes reutilizables
- `src/pages/` – páginas principales del enrutador
- `src/layout/` – layouts y rutas privadas/públicas
- `src/context/` – contexto global de autenticación
- `src/utils/` – utilidades compartidas

## 11. Contribución

Este proyecto fue realizado como parte de una prueba técnica, por lo que no se aceptan contribuciones externas.
Puede ser utilizado como referencia o base para proyectos similares en React.

## 12. Licencia

Este código se entrega únicamente para fines de evaluación técnica.
© 2025 – Prueba técnica desarrollada por Valentina Ramírez para Lógika.
