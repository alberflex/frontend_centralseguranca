export const formatarDataISO = (dataISO: string | Date) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR");
};