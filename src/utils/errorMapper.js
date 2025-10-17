// Intenta parsear string JSON. Si falla, retorna null.
function tryParseJSON(str) {
  if (typeof str !== 'string') return null;
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

// Extrae un texto base del error (puede venir como JSON, array de errores, etc.)
function extractRawMessage(err) {
  // si viene con .message (Error lanzado por fetcher)
  let raw = err?.message ?? err;

  // si el fetcher guardó .data, úsalo
  if (err?.data) {
    const d = err.data;
    return (
      d.message || d.Message || d.error || d.errors?.[0] || JSON.stringify(d)
    );
  }

  // si .message es JSON, úsalo
  const parsed = tryParseJSON(raw);
  if (parsed) {
    if (Array.isArray(parsed) && parsed[0]?.Message) return parsed[0].Message;
    return (
      parsed.message || parsed.Message || parsed.error || JSON.stringify(parsed)
    );
  }

  // texto plano
  if (typeof raw === 'string') return raw;

  // fallback
  try {
    return JSON.stringify(raw);
  } catch {
    return 'Ocurrió un error inesperado';
  }
}

// Devuelve un mensaje amigable según el contexto
export function mapApiError(err, context) {
  const base = extractRawMessage(err) || '';
  const lower = base.toLowerCase();

  // Casos comunes globales
  if (err?.status === 401 || lower.includes('unauthorized')) {
    return 'Tu sesión expiró o no tienes autorización. Inicia sesión nuevamente.';
  }
  if (lower.includes('timeout'))
    return 'El servidor tardó demasiado en responder. Intenta de nuevo.';

  // ---- Contextos específicos ----
  if (context === 'LOGIN') {
    if (lower.includes('base-64')) return 'La contraseña no es válida.';
    if (lower.includes('password') || lower.includes('contraseña'))
      return 'Contraseña incorrecta.';
    if (
      lower.includes('user') ||
      lower.includes('usuario') ||
      lower.includes('email') ||
      lower.includes('correo')
    ) {
      return 'Usuario incorrecto.';
    }
    return 'No pudimos iniciar sesión. Revisa tus credenciales.';
  }

  if (context === 'CREATE_ACTION') {
    // Validaciones típicas de Spring
    if (
      (lower.includes("field 'icon'") || lower.includes('icon')) &&
      lower.includes('must not be null')
    ) {
      return 'El ícono es obligatorio.';
    }
    if (
      (lower.includes("field 'name'") || lower.includes('name')) &&
      lower.includes('must not be null')
    ) {
      return 'El nombre es obligatorio.';
    }
    if (
      (lower.includes("field 'description'") ||
        lower.includes('description')) &&
      lower.includes('must not be null')
    ) {
      return 'La descripción es obligatoria.';
    }
    // size must be between X and Y
    const sizeMatch = base.match(/size must be between (\d+) and (\d+)/i);
    if (sizeMatch) {
      const [, min, max] = sizeMatch;
      if (lower.includes('name'))
        return `El nombre debe tener entre ${min} y ${max} caracteres.`;
      if (lower.includes('description'))
        return `La descripción debe tener entre ${min} y ${max} caracteres.`;
      return `Algunos campos no cumplen la longitud mínima/máxima (${min}-${max}).`;
    }
    return 'No pudimos crear la acción. Revisa los campos e inténtalo nuevamente.';
  }

  if (context === 'LIST_ACTIONS') {
    if (lower.includes('page index must not be less than zero')) {
      return 'Número de página inválido.';
    }
    return 'No pudimos cargar las acciones.';
  }

  // Fallback general
  return 'Ocurrió un error al procesar la solicitud.';
}
