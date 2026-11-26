// Datos de ejemplo para la demostración en clase del Sprint 1. Ningún dato es real.
// Contraseñas de prueba: ver README.md.
import { BaseDatos, Tramite, Usuario } from '../nucleo/modelos';

export const SEDE = {
  nombre: 'Oficina Regional Huánuco',
  direccion: 'Jr. General Prado, Huánuco (referencial)',
  horario: 'Lunes a viernes, de 8:00 a 16:30',
  apertura: '08:00',
  cierre: '16:30',
  ventanillas: [1, 2, 3],
  // Datos de contacto de demostración: no son de RENIEC.
  telefono: '(062) 000 000 · demo',
  correo: 'contacto@citareniec.demo',
  whatsapp: '900 000 000 · demo',
};

export const TRAMITES: Tramite[] = [
  { id: 'duplicado', nombre: 'Duplicado de DNI', categoria: 'DNI mayores', descripcion: 'Por pérdida, robo o deterioro de tu DNI.', duracionMin: 15, costo: 35, icono: 'copy', tono: '', publicado: true,
    requisitos: ['Acudir en persona con tu código de cita.', 'Pagar la tasa antes de tu cita.', 'Indicar el motivo: pérdida, robo o deterioro.'] },
  { id: 'renovacion', nombre: 'Renovación de DNI', categoria: 'DNI mayores', descripcion: 'Cuando tu DNI venció o está por vencer.', duracionMin: 15, costo: 41, icono: 'refresh', tono: '', publicado: true,
    requisitos: ['Presentar tu DNI actual, aunque esté vencido.', 'Pagar la tasa en Banco de la Nación, Págalo.pe o Yape.', 'Acudir en persona: se toman tu foto, firma y huellas.'] },
  { id: 'menor', nombre: 'DNI por primera vez (menor)', categoria: 'DNI menores', descripcion: 'Para niñas, niños y adolescentes.', duracionMin: 20, costo: 16, icono: 'baby', tono: 'turquesa', publicado: true,
    requisitos: ['Acta de nacimiento del menor.', 'Presencia del menor con su padre, madre o tutor (con DNI).', 'Pagar la tasa, salvo casos exonerados.'] },
  { id: 'recojo', nombre: 'Recojo de DNI', categoria: 'Recojo de DNI', descripcion: 'Cuando te avisemos que tu DNI está listo.', duracionMin: 10, costo: 0, icono: 'package', tono: 'verde', publicado: true,
    requisitos: ['Acudir en persona (el titular).', 'Llevar tu código de cita o el comprobante del trámite.', 'Haber recibido el aviso «DNI listo».'] },
  { id: 'rectificacion', nombre: 'Rectificación de datos', categoria: 'Rectificaciones', descripcion: 'Corrige nombres, fechas u otros datos.', duracionMin: 20, costo: 30, icono: 'file-pen', tono: 'guinda', publicado: true,
    requisitos: ['Documento que sustente el cambio (por ejemplo, un acta).', 'Pagar la tasa antes de tu cita.', 'Acudir en persona.'] },
  { id: 'foto-firma', nombre: 'Actualización de foto y firma', categoria: 'Otros', descripcion: 'Actualiza tu foto y tu firma en el DNI.', duracionMin: 15, costo: null, icono: 'camera', tono: 'naranja', publicado: true,
    requisitos: ['Presentar tu DNI actual.', 'Pagar la tasa antes de tu cita.', 'Acudir en persona.'] },
];

/** Contraseñas de prueba (se guardan cifradas en la base simulada). */
export const CLAVES_DEMO = { ciudadano: 'Ciudadano2026!', operador: 'Operador2026!', administrador: 'Admin2026!' };

type UsuarioSemilla = Omit<Usuario, 'clave' | 'aceptaDatosFecha' | 'creado' | 'ultimoAcceso'> & { ultimoAccesoDias: number | null; ultimoAccesoHora: string };

const USUARIOS: UsuarioSemilla[] = [
  { id: 1, dni: '41234578', nombres: 'Luis Alberto', apellidos: 'Ramos Quispe', correo: 'luis.ramos@gmail.com', celular: '987654321', rol: 'ciudadano', estado: 'activo', ventanilla: null, debeCambiarClave: false, ultimoAccesoDias: 0, ultimoAccesoHora: '08:10' },
  { id: 2, dni: '40871234', nombres: 'Carmen', apellidos: 'Soto Vargas', correo: 'carmen.soto@sede.demo', celular: '964512208', rol: 'operador', estado: 'activo', ventanilla: 2, debeCambiarClave: false, ultimoAccesoDias: 0, ultimoAccesoHora: '07:52' },
  { id: 3, dni: '42190876', nombres: 'Rosa', apellidos: 'Huamán Ponce', correo: 'rosa.huaman@sede.demo', celular: '962111001', rol: 'administrador', estado: 'activo', ventanilla: null, debeCambiarClave: false, ultimoAccesoDias: 0, ultimoAccesoHora: '07:40' },
  { id: 4, dni: '43710245', nombres: 'Jorge', apellidos: 'Paredes Leiva', correo: 'jorge.paredes@sede.demo', celular: '963220145', rol: 'operador', estado: 'activo', ventanilla: 1, debeCambiarClave: false, ultimoAccesoDias: 0, ultimoAccesoHora: '07:55' },
  { id: 5, dni: '44150398', nombres: 'Milagros', apellidos: 'Rivera Soto', correo: 'milagros.rivera@sede.demo', celular: '965330412', rol: 'operador', estado: 'activo', ventanilla: 3, debeCambiarClave: false, ultimoAccesoDias: 0, ultimoAccesoHora: '07:58' },
  { id: 6, dni: '45020871', nombres: 'Kevin', apellidos: 'Alvarado Tucto', correo: 'kevin.alvarado@sede.demo', celular: '966440518', rol: 'operador', estado: 'inactivo', ventanilla: null, debeCambiarClave: false, ultimoAccesoDias: 12, ultimoAccesoHora: '16:20' },
  { id: 7, dni: '46880452', nombres: 'Lucía', apellidos: 'Fernández Ponce', correo: 'lucia.fernandez@hotmail.com', celular: '967550623', rol: 'ciudadano', estado: 'activo', ventanilla: null, debeCambiarClave: false, ultimoAccesoDias: 1, ultimoAccesoHora: '18:21' },
  { id: 8, dni: '47330915', nombres: 'Diana', apellidos: 'Chávez Mallqui', correo: 'diana.chavez@gmail.com', celular: '968660734', rol: 'ciudadano', estado: 'activo', ventanilla: null, debeCambiarClave: false, ultimoAccesoDias: 2, ultimoAccesoHora: '10:05' },
];

export const aIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function crearSemilla(cifrar: (clave: string) => string): BaseDatos {
  const ahora = new Date();
  const haceDias = (d: number, h = '10:00') => { const x = new Date(ahora); x.setDate(x.getDate() - d); const [a, b] = h.split(':').map(Number); x.setHours(a, b, 0, 0); return x.toISOString(); };
  const creado = new Date(ahora.getFullYear(), ahora.getMonth(), 2).toISOString();

  const usuarios: Usuario[] = USUARIOS.map(({ ultimoAccesoDias, ultimoAccesoHora, ...u }) => {
    const ultimoAcceso = ultimoAccesoDias === null ? null : haceDias(ultimoAccesoDias, ultimoAccesoHora);
    return { ...u, clave: cifrar(CLAVES_DEMO[u.rol]), aceptaDatosFecha: creado, creado, ultimoAcceso };
  });

  return {
    version: 1, dia: aIso(ahora), sigId: 500, usuarios, intentos: [], tokensClave: [], sesiones: [], buzon: [],
    tramites: TRAMITES.map((t) => ({ ...t, requisitos: [...t.requisitos] })),
  };
}
