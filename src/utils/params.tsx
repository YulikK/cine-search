export function updateParams(
  params: string,
  value: string,
  searchParams: URLSearchParams
): { [k: string]: string } {
  const newSearchParams = new URLSearchParams(searchParams.toString());
  newSearchParams.set(params, value);
  return Object.fromEntries(newSearchParams.entries());
}
