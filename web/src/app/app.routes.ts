import { Routes } from '@angular/router';
import { requiereRol, soloInvitado } from './nucleo/sesion/guardas';
import { PlantillaPublica } from './plantillas/publica/plantilla-publica';
import { PlantillaApp } from './plantillas/app/plantilla-app';

// Épica 1 · Autenticación y gestión de usuarios
import { Inicio } from './epicas/epica1-autenticacion/paginas/inicio/inicio';
import { Ingresar } from './epicas/epica1-autenticacion/paginas/ingresar/ingresar';
import { PaginaError } from './epicas/epica1-autenticacion/paginas/errores/pagina-error';
import { MiInicio } from './epicas/epica1-autenticacion/paginas/mi-inicio/mi-inicio';

// Las pantallas de las épicas 2 a 5 se agregan en los sprints siguientes.
export const routes: Routes = [
  // ---------- Páginas públicas ----------
  {
    path: '',
    component: PlantillaPublica,
    children: [
      { path: '', component: Inicio, title: 'CitaRENIEC Huánuco · Reserva tu cita sin hacer cola' },
      { path: '403', component: PaginaError, data: { codigo: 403 }, title: 'Acceso denegado · CitaRENIEC' },
    ],
  },
  { path: 'ingresar', component: Ingresar, canActivate: [soloInvitado], title: 'Ingresar · CitaRENIEC' },

  // ---------- Ciudadano ----------
  {
    path: 'ciudadano',
    component: PlantillaApp,
    canActivate: [requiereRol('ciudadano')],
    canActivateChild: [requiereRol('ciudadano')], // también al cambiar de página dentro de la sección
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'inicio' },
      { path: 'inicio', component: MiInicio, title: 'Mi inicio · CitaRENIEC' },
    ],
  },

  // ---------- 404 ----------
  { path: '**', component: PlantillaPublica, children: [{ path: '', component: PaginaError, data: { codigo: 404 }, title: 'Página no encontrada · CitaRENIEC' }] },
];
