export const formatarDataISO = (dataISO: string | Date) => {
  const data = new Date(dataISO);
  const dia = data.getUTCDate().toString().padStart(2, "0");
  const mes = (data.getUTCMonth() + 1).toString().padStart(2, "0");
  const ano = data.getUTCFullYear();
  return `${dia}/${mes}/${ano}`;
};