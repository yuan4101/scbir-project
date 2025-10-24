export function errorMessage (err: unknown, message: string){
  const msg =
    err instanceof Error
      ? err.message
      : typeof err === "string"
      ? err
      : message;

  return msg;
}