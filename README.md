# RENIEC-MODERNO-SPRINT1 · CitaRENIEC Huánuco

Web de citas y turnos digitales para la Oficina Regional de RENIEC Huánuco.
Proyecto académico del curso **Gestión de Proyectos II** (Universidad de Huánuco), Grupo G1.
**No es un sitio oficial de RENIEC.**

Este repositorio contiene **solo el Sprint 1**: la **Épica 1 · Autenticación y gestión de usuarios**.

## Sprint 1

- **Fechas:** 26/11/2026 – 09/12/2026
- **Objetivo:** que ciudadanos, operadores y administradores puedan crear su cuenta, ingresar de forma segura según su rol, recuperar su contraseña y gestionar su perfil; y que el administrador gestione los usuarios de la sede.
- **Historias:** HU-15, HU-16, HU-17, HU-18 y HU-20 (13 SP). La HU-19 «Eliminar cuenta» queda para el Sprint 2.
- **Planificación:** Jira, proyecto `CITA` (CitaRENIEC Huánuco).

## Equipo, ramas y tareas

Cada integrante trabaja en su rama lo que tiene asignado en Jira. Cada commit lleva la clave de su tarea de Jira.

| Integrante | Rol Scrum | Rama | Tareas de Jira |
|---|---|---|---|
| Morales Durand, Jhon Arnold | Scrum Master | `John` | CITA-6 Base del proyecto · CITA-14 HU-16 Inicio de sesión y acceso por rol |
| Verde Inocencio, Stibhen Jherark | Developer | `Stibhen-V.I` | CITA-18 HU-17 Recuperar contraseña · CITA-22 HU-18 Perfil y cambio de contraseña |
| Cuya Vargas, Joan Bradley | Product Owner | `Joan` | CITA-26 HU-20 Gestión de usuarios |
| Chavez Figueredo, Grover | Developer | `Grover` | CITA-10 HU-15 Registro de ciudadano |

Flujo de trabajo: **1)** planificar en Jira → **2)** programar cada uno su parte en su rama → **3)** subir la rama y unirla a `main`.

Formato de commit: `CITA-n tipo(HU-xx): descripción` (por ejemplo `CITA-15 feat(HU-16): inicio de sesión con DNI o correo`).

## Cómo verlo funcionando

El frontend (`web/`, Angular 21) trae una **API simulada en el navegador**, así que funciona sin Docker, PHP ni base de datos:

```bash
cd web
npm install
npm start
```

Abre **http://localhost:4200**.

### Usuarios de prueba (datos ficticios)

| Rol | DNI o correo | Contraseña |
|---|---|---|
| Ciudadano | `41234578` · luis.ramos@gmail.com | `Ciudadano2026!` |
| Operador (ventanilla 1) | `43710245` · jorge.paredes@sede.demo | `Operador2026!` |
| Administradora | `42190876` · rosa.huaman@sede.demo | `Admin2026!` |

Los datos se guardan en el navegador. Para volver a los datos de ejemplo: en la consola del navegador `localStorage.clear()` y recarga.

## Estructura

```
RENIEC-MODERNO-SPRINT1/
├── web/                      Frontend Angular 21
│   └── src/
│       ├── estilos/          colores, tipografía y componentes visuales
│       └── app/
│           ├── nucleo/       modelos, base de datos simulada, sesión y guardas por rol
│           ├── datos/        datos de ejemplo
│           ├── compartido/   icono, logo, modal, avisos (toast), campo de contraseña
│           ├── plantillas/   pública, de acceso y panel con menú por rol
│           └── epicas/
│               └── epica1-autenticacion/   HU-15, HU-16, HU-17, HU-18, HU-20
├── docs/pruebas/             pruebas de cada historia
├── api/                      base Laravel del curso (API REST; se conecta en los siguientes sprints)
└── docker/ · compose.yaml    entorno con Docker del curso
```

Cada archivo de `web/src/app/epicas/epica1-autenticacion/api/` indica qué endpoint de Laravel simula
(por ejemplo `POST /api/v1/auth/login`), para reemplazarlo luego por la API real de `api/` sin cambiar las pantallas.

---

# Entorno de desarrollo (base del curso)

Local development stack for **CitaRENIEC Huánuco**: Laravel API (`api/`), Angular SPA (`web/`), and PostgreSQL.

## English

### Requirements

- Docker Desktop with Compose V2 (`docker compose version`)
- Optional (native run): PHP 8.4+, Composer 2, Node 22+, PostgreSQL 16.15 (or use only the `db` service)

### Ports

| Service | URL / host port |
|---------|-----------------|
| Web (Angular) | http://localhost:14200 |
| API (Laravel) | http://localhost:18080 |
| PostgreSQL | localhost:15432 |

### Run with Docker (recommended)

```bash
cp .env.example .env
docker compose up --build
```

Stop:

```bash
docker compose down
```

Useful commands:

```bash
docker compose up -d --build   # detached
docker compose logs -f api     # API logs
docker compose exec api php artisan migrate
```

Compose wires `DB_HOST=db` inside the API container. App code lives in `api/` and `web/` and is mounted as volumes.

### Run natively (without Docker for api/web)

1. Start PostgreSQL (native **or** only the DB container):

```bash
docker compose up -d db
```

2. Backend:

```bash
cd api
cp .env.example .env
# set APP_KEY if empty: php artisan key:generate
composer install
php artisan serve --host=127.0.0.1 --port=18080
```

`.env.example` points to `127.0.0.1:15432` with user `reniec` / db `reniec_huanuco` / password `reniec_dev`.

3. Frontend (another terminal):

```bash
cd web
npm install
npm start
```

Open http://localhost:4200 (port 14200 is only used with Docker). The Angular proxy sends `/api` to the API. For a fully native API on the host, change `web/proxy.conf.json` target to `http://127.0.0.1:18080`.

### Environment

Root `.env` / `.env.example` control Compose ports and DB credentials. Mail variables are placeholders (provider TBD).

---

## Español

### Requisitos

- Docker Desktop con Compose V2 (`docker compose version`)
- Opcional (nativo): PHP 8.4+, Composer 2, Node 22+, PostgreSQL 16.15 (o solo el servicio `db`)

### Puertos

| Servicio | URL / puerto host |
|----------|-------------------|
| Web (Angular) | http://localhost:14200 |
| API (Laravel) | http://localhost:18080 |
| PostgreSQL | localhost:15432 |

### Con Docker (recomendado)

```bash
cp .env.example .env
docker compose up --build
```

Detener:

```bash
docker compose down
```

Comandos útiles:

```bash
docker compose up -d --build
docker compose logs -f api
docker compose exec api php artisan migrate
```

Dentro del contenedor API, `DB_HOST=db`. El código en `api/` y `web/` se monta como volúmenes.

### Nativo (sin Docker para api/web)

1. Levantar PostgreSQL (nativo **o** solo el contenedor DB):

```bash
docker compose up -d db
```

2. Backend:

```bash
cd api
cp .env.example .env
# si APP_KEY está vacío: php artisan key:generate
composer install
php artisan serve --host=127.0.0.1 --port=18080
```

3. Frontend (otra terminal):

```bash
cd web
npm install
npm start
```

Abre http://localhost:4200 (el puerto 14200 solo se usa con Docker). El proxy de Angular envía `/api` a la API. Si la API corre en el host, cambia el `target` de `web/proxy.conf.json` a `http://127.0.0.1:18080`.

### Variables de entorno

`.env` / `.env.example` en la raíz controlan puertos de Compose y credenciales de DB. Las variables de correo son placeholders (proveedor por definir).
