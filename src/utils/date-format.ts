import type ExcelJS from "exceljs";

export function isHHMM(value: string) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

export function setPrettyExcelDate(
  ws: ExcelJS.Worksheet,
  cellAddress: string,
  value: unknown,
) {
  const d =
    value instanceof Date
      ? value
      : value
      ? new Date(value as any)
      : null;

  const cell = ws.getCell(cellAddress);

  if (!d || isNaN(d.getTime())) {
    cell.value = "";
    return;
  }

  cell.value = d;
  cell.numFmt = "dd mmm yyyy, hh:mm";
}