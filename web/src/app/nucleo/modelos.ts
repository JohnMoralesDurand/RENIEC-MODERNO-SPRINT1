// Modelos de datos del Sprint 1 (Épica 1). Equivalen a las tablas de PostgreSQL de la API Laravel (api/).

export type Rol = 'ciudadano' | 'operador' | 'administrador';
export type EstadoUsuario = 'activo' | 'inactivo';

export interface Usuario {
  id: number;
  dni: string;
  nombres: string;
  apellidos: string;
  correo: string;
  celular: string;
  rol: Rol;
  estado: EstadoUsuario;
  ventanilla: number | null;
  clave: string;              // hash (en Laravel: bcrypt)
  debeCambiarClave: boolean;  // contraseña temporal asignada por el administrador (HU-20)
  aceptaDatosFecha: string;   // consentimiento Ley N.º 29733 (HU-15)
  creado: string;
  ultimoAcceso: string | null;
}

export type UsuarioPublico = Omit<Usuario, 'clave'>;

/** Trámite del catálogo que se muestra en el inicio público. */
export interface Tramite {
  id: string;
  nombre: string;
  categoria: 'DNI mayores' | 'DNI menores' | 'Recojo de DNI' | 'Rectificaciones' | 'Otros';
  descripcion: string;
  duracionMin: number;
  costo: number | null;       // null = «Consultar en sede»
  icono: string;
  tono: '' | 'guinda' | 'verde' | 'naranja' | 'turquesa';
  requisitos: string[];
  publicado: boolean;
}

export interface Intento { identificador: string; exito: boolean; fecha: number; }
export interface TokenClave { token: string; usuarioId: number; creado: number; usado: boolean; }
export interface Sesion { token: string; usuarioId: number; ultimaActividad: number; }
export interface Correo { id: string; para: string; asunto: string; cuerpo: string; enlace?: string; fecha: string; }

export interface BaseDatos {
  version: number;
  dia: string;               // día de la demostración (AAAA-MM-DD)
  sigId: number;
  usuarios: Usuario[];       // users
  intentos: Intento[];       // intentos_acceso (HU-16)
  tokensClave: TokenClave[]; // password_reset_tokens (HU-17)
  sesiones: Sesion[];        // personal_access_tokens (Sanctum)
  buzon: Correo[];           // buzón de prueba (Mailtrap en Staging)
  tramites: Tramite[];       // catálogo de trámites del inicio público
}
