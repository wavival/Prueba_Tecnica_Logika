# Buenas Acciones – Panel Admin (React)

Interfaz de administración para crear y gestionar **categorías/acciones**, con búsqueda, filtros, paginación y formularios con validación.  
Stack: **React + Vite + React Router + Tailwind CSS**.

---

## 🚀 Features

- Listado con **búsqueda, filtros, ordenamiento y paginación**
- **Crear** acción con formulario validado (nombre, descripción, color HEX, estado y logo como archivo)
- **Editar** / **Eliminar** registro
- **Toasts** y **modales** de feedback
- Integración con API REST (`/api/v1/actions/admin-list`, `/api/v1/actions/admin-add`)

---

## ✅ Requisitos

- **Node.js** ≥ 18
- **npm** ≥ 9 (o pnpm/yarn si prefieres)
- Acceso a la **API** (endpoint base y credenciales si aplica)

---

## 🧰 Instalación local

```bash
# 1) Clonar el repositorio
git clone https://github.com/<TU_USUARIO>/<TU_REPO>.git
cd <TU_REPO>

# 2) Instalar dependencias
npm install

# 3) Configurar variables de entorno
cp .env.example .env
# Edita .env con tu URL de API

# 4) Ejecutar en desarrollo
npm run dev

La app quedará disponible en la URL que imprime Vite (por defecto http://localhost:5173).

🔐 Variables de entorno

Crea un archivo .env basado en .env.example.

.env.example
# URL base de tu API
VITE_API_BASE_URL=http://localhost:3000

# opcional: claves adicionales
# VITE_SOME_KEY=...


La app usa import.meta.env.VITE_API_BASE_URL en el fetcher para apuntar a la API.

📦 Scripts disponibles
npm run dev       # desarrollo
npm run build     # build de producción
npm run preview   # sirve el build localmente
npm run lint      # lint

🗂️ Estructura del proyecto
src/
  api/
    actionsService.js
  components/
    ActionForm.jsx
    FeedbackModal.jsx
    Pagination.jsx
    SearchBar.jsx
    StatusBadge.jsx
    Table.jsx
    Toast.jsx
  pages/
    Create.jsx
    CategoriesPage.jsx
  utils/
    fetcher.js
    errorMapper.js
  assets/
    icons/
      more.svg
      edit.svg
      trash.svg

🔗 API usada
GET /api/v1/actions/admin-list

Query params:

Parámetro	Tipo	Descripción
pageNumber	number	Página (1-based)
pageSize	number	Tamaño de página
orderBy	string	Campo de ordenamiento (default: createdAt)
sort	string	ASC o DESC
POST /api/v1/actions/admin-add

Formato: multipart/form-data

Campo	Tipo	Descripción
name	string	Nombre de la acción
description	string	Descripción
color	string	Código HEX sin #
status	int	1 activo / 0 inactivo
icon	file	Imagen o logo de la acción
🧪 Comprobación rápida

En Crear categoría, llena todos los campos.

Sube un logo (.png o .jpg).

El color se envía como #RRGGBB desde el form, el service lo adapta si la API lo requiere sin #.

Verifica en consola que no haya errores 400 o 415.

⬆️ Cómo subir a GitHub

Crea un nuevo repositorio vacío en GitHub.

En tu proyecto local:

git init
git add .
git commit -m "feat: primera versión"
git branch -M main
git remote add origin https://github.com/<TU_USUARIO>/<TU_REPO>.git
git push -u origin main


Asegúrate de tener un .gitignore con al menos:

node_modules
dist
.env


El README.md (este archivo) debe estar en la raíz del repo.
GitHub lo renderizará automáticamente.

🖼️ Screenshots en el README (opcional)

Guarda las capturas en ./docs/ y referéncialas así:

![Crear categoría](./docs/crear-categoria.png)

🤝 Contribuir

Crea una rama:

git checkout -b feat/nueva-funcionalidad


Commit de tus cambios:

git commit -m "feat: agrega X"


Push:

git push origin feat/nueva-funcionalidad


Abre un Pull Request en GitHub.
```
