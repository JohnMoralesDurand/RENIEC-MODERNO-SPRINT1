# Épica 1 · Autenticación y gestión de usuarios

Sprint 1 (26/11/2026 – 09/12/2026) · Jira: CITA-5.
La HU-19 «Eliminar cuenta» queda para el Sprint 2.

| Historia | Jira | Responsable | Rama | API (`api/`) | Pantallas (`paginas/`) |
|---|---|---|---|---|---|
| Base del proyecto | CITA-6 | Morales | `John` | — | núcleo, plantillas, componentes compartidos |
| HU-16 Inicio de sesión y acceso por rol | CITA-14 | Morales | `John` | `auth.api.ts` (login, logout, bloqueo, sesión) | `inicio`, `ingresar`, `mi-inicio`, `errores` · componente `tarjeta-ingreso` |
| HU-17 Recuperar contraseña | CITA-18 | Verde | `Stibhen-V.I` | `auth.api.ts` (recuperación) | `recuperar`, `buzon-demo`, `nueva-clave` |
| HU-18 Perfil y cambio de contraseña | CITA-22 | Verde | `Stibhen-V.I` | `perfil.api.ts` | `mi-cuenta`, `perfil-operador` |
| HU-20 Gestión de usuarios | CITA-26 | Cuya | `Joan` | `usuarios.api.ts` | `admin-usuarios` |
| HU-15 Registro de ciudadano | CITA-10 | Chávez | `Grover` | `auth.api.ts` (registro) | `registro`, `privacidad` |

Cada archivo de `api/` indica qué endpoint de la API Laravel simula.
Las pruebas de cada historia están en `docs/pruebas/`.
