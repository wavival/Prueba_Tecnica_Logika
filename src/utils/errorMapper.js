function tryParseJSON(str) {
  if (typeof str !== 'string') return null;
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

function extractRawMessage(err) {
  let raw = err?.message ?? err;

  if (err?.data) {
    const d = err.data;
    return (
      d.message || d.Message || d.error || d.errors?.[0] || JSON.stringify(d)
    );
  }

  const parsed = tryParseJSON(raw);
  if (parsed) {
    if (Array.isArray(parsed) && parsed[0]?.Message) return parsed[0].Message;
    return (
      parsed.message || parsed.Message || parsed.error || JSON.stringify(parsed)
    );
  }

  if (typeof raw === 'string') return raw;

  try {
    return JSON.stringify(raw);
  } catch {
    return 'Ocurrió un error inesperado';
  }
}

export function mapApiError(err, context) {
  const base = extractRawMessage(err) || '';
  const lower = base.toLowerCase();

  if (err?.status === 401 || lower.includes('unauthorized')) {
    return 'Tu sesión expiró o no tienes autorización. Inicia sesión nuevamente.';
  }
  if (lower.includes('timeout'))
    return 'El servidor tardó demasiado en responder. Intenta de nuevo.';

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

  return 'Ocurrió un error al procesar la solicitud.';
}
