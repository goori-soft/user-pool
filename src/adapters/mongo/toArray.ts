export function toArray<T = any>(value: T): Array<T> {
  if (Array.isArray(value)) return value;
  const valueType = typeof value;
  if (value === undefined || value === null) return [];
  return [value];
}
