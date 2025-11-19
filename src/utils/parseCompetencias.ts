export function parseCompetencias(texto?: string): string[] {
  if (!texto) return [];
  return texto
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}
