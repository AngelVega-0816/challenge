## Challenge ELdar

Este proyecto es una aplicación creada con React y TypeScript usando Vite. Incluye una integración con Supabase y JSONPlaceholder. Supabase se usa para autenticación de usuarios, roles y para almacenar posts, mientras que JSONPlaceholder se utiliza para traer datos simulados de posts.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```bash
├── public
├── src
│   ├── components # Componentes reutilizables de la aplicación
│   ├── pages # Páginas principales de la aplicación
│   ├── section # Secciones de las páginas
│   ├── service # Servicios de conexión a Supabase y JSONPlaceholder
│   ├── store # Stores de Zustand para gestionar el estado global
│   ├── theme # Themes de MUI
│   ├── utils # Misc
├── .env # Variables de entorno
```

## Instrucciones para iniciar la aplicación

1. Clona el repositorio desde GitHub:

```bash
git clone https://github.com/AngelVega-0816/challenge.git
```

2. Accede al directorio del proyecto:

```bash
cd challenge
npm install
npm run dev
```

## Variables de Entorno

Asegúrate de configurar las siguientes variables de entorno en tu archivo `.env`:

```bash
VITE_API_URL="https://jsonplaceholder.typicode.com/"
VITE_SUPABASE_URL="https://***.supabase.co"
VITE_SUPABASE_ANON_KEY="xxx"
```

- **VITE_API_URL**: URL base para la API de JSONPlaceholder, utilizada para obtener datos de ejemplo.
- **VITE_SUPABASE_URL**: URL del proyecto en Supabase, necesaria para la conexión a la base de datos y autenticación.
- **VITE_SUPABASE_ANON_KEY**: Clave anónima para autenticar las solicitudes a Supabase
