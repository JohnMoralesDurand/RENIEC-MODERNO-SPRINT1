// Épica 1 · Autenticación. Simula los endpoints de la API Laravel (Sanctum):
// POST /api/v1/auth/login · POST /auth/logout · GET /auth/me (HU-16)
import { ApiError } from '../../../nucleo/api/api-error';
import { bd, cifrar, esperar, guardar, publico, tokenAleatorio } from '../../../nucleo/api/base-datos';
import { Usuario, UsuarioPublico } from '../../../nucleo/modelos';

export const MINUTOS_SESION = 30;   // la sesión vence tras 30 min sin actividad (HU-16)
export const MAX_INTENTOS = 5;      // bloqueo tras 5 intentos fallidos (HU-16)
export const MINUTOS_BLOQUEO = 15;

export const RX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const RX_DNI = /^\d{8}$/;
export const RX_CELULAR = /^9\d{8}$/;

export function validarClave(clave: string): string | null {
  if (!clave || clave.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
  return null;
}

function buscarPorIdentificador(id: string): Usuario | undefined {
  const t = id.trim().toLowerCase();
  return bd().usuarios.find((u) => u.dni === t || u.correo.toLowerCase() === t);
}

function crearSesion(usuario: Usuario): string {
  const token = tokenAleatorio(40);
  bd().sesiones.push({ token, usuarioId: usuario.id, ultimaActividad: Date.now() });
  usuario.ultimoAcceso = new Date().toISOString();
  return token;
}

// Los intentos se cuentan por cuenta: entrar con el DNI o con el correo de la misma persona suma al mismo contador.
function claveIntentos(id: string): string {
  const u = buscarPorIdentificador(id);
  return u ? 'usuario:' + u.id : id.trim().toLowerCase();
}

function fallosRecientes(clave: string) {
  const db = bd();
  const ahora = Date.now();
  const exitos = db.intentos.filter((i) => i.identificador === clave && i.exito).map((i) => i.fecha);
  const desde = Math.max(ahora - MINUTOS_BLOQUEO * 60000, exitos.length ? Math.max(...exitos) : 0);
  return db.intentos.filter((i) => i.identificador === clave && !i.exito && i.fecha > desde);
}

/** Hora (ms) hasta la que la cuenta queda bloqueada, o 0 si no lo está. */
export function bloqueadoHasta(identificador: string): number {
  const fallos = fallosRecientes(claveIntentos(identificador));
  if (fallos.length < MAX_INTENTOS) return 0;
  return Math.max(...fallos.map((i) => i.fecha)) + MINUTOS_BLOQUEO * 60000;
}

/** HU-16 · Inicio de sesión con DNI o correo */
export async function ingresar(identificador: string, clave: string): Promise<{ token: string; usuario: UsuarioPublico }> {
  await esperar();
  const db = bd();
  const claveCuenta = claveIntentos(identificador);
  const hasta = bloqueadoHasta(identificador);
  if (hasta > Date.now()) {
    throw new ApiError(429, 'Cuenta bloqueada por 15 minutos.', { hasta: String(hasta) });
  }
  const u = buscarPorIdentificador(identificador);
  const claveCorrecta = !!u && u.clave === cifrar(clave || '');
  const ok = claveCorrecta && u!.estado === 'activo';
  db.intentos.push({ identificador: claveCuenta, exito: ok, fecha: Date.now() });
  if (!ok) {
    guardar();
    const usados = fallosRecientes(claveCuenta).length;
    if (usados >= MAX_INTENTOS) {
      throw new ApiError(429, 'Cuenta bloqueada por 15 minutos.', { hasta: String(Date.now() + MINUTOS_BLOQUEO * 60000) });
    }
    // Solo se dice que la cuenta está desactivada si la contraseña es correcta:
    // así nadie puede averiguar qué DNI o correo existen probando claves al azar.
    if (claveCorrecta) throw new ApiError(403, 'Tu cuenta está desactivada. Comunícate con el administrador de la sede.');
    throw new ApiError(401, 'Datos incorrectos.', { intento: String(usados), quedan: String(MAX_INTENTOS - usados) });
  }
  const token = crearSesion(u!);
  guardar();
  return { token, usuario: publico(u!) };
}

/** GET /auth/me · valida el token y el vencimiento por inactividad. */
export function yo(token: string, tocar = true): UsuarioPublico {
  const db = bd();
  const s = db.sesiones.find((x) => x.token === token);
  if (!s) throw new ApiError(401, 'No has iniciado sesión.');
  if (Date.now() - s.ultimaActividad > MINUTOS_SESION * 60000) {
    db.sesiones = db.sesiones.filter((x) => x.token !== token);
    guardar();
    throw new ApiError(401, 'Tu sesión venció por inactividad. Vuelve a ingresar.');
  }
  const u = db.usuarios.find((x) => x.id === s.usuarioId);
  if (!u || u.estado !== 'activo') {
    db.sesiones = db.sesiones.filter((x) => x.token !== token);
    guardar();
    throw new ApiError(401, 'Tu cuenta no está activa.');
  }
  if (tocar) {
    s.ultimaActividad = Date.now();
    guardar();
  }
  return publico(u);
}

export function ultimaActividad(token: string): number | null {
  return bd().sesiones.find((x) => x.token === token)?.ultimaActividad ?? null;
}

export function salir(token: string): void {
  const db = bd();
  db.sesiones = db.sesiones.filter((x) => x.token !== token);
  guardar();
}
