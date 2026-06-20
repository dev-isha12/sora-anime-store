export const cleanGeneratedCode = (raw: string): string => {
  let code = raw.trim();
  code = code.replace(/^```(?:jsx|tsx|javascript|typescript)?\s*\n?/i, '');
  code = code.replace(/\n?```\s*$/i, '');
  code = code.replace(/^import\s+.*;\s*\n?/gm, '');
  code = code.replace(/^export\s+(default\s+)?/gm, '');
  const fnMatch = code.match(/(?:function|const)\s+\w+\s*(?:=\s*)?(?:\([^)]*\)\s*(?:=>)?\s*)?[({]\s*\n?\s*return\s*\(\s*\n?([\s\S]*?)\n?\s*\)\s*;?\s*\n?\s*[})]\s*;?\s*$/);
  if (fnMatch?.[1]) {
    code = fnMatch[1].trim();
  }
  return code.trim();
};