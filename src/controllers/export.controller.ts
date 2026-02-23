import { Request, Response } from "express";

import { HttpError } from "../utils/http-error";
import type { SubjectParams } from "../types/subject.type";
import { asyncHandler } from "../middlewares/async-handler";
import { buildSubjectWorkbook } from "../services/export.service";

export const exportSubjectExcel = asyncHandler(async (req: Request<SubjectParams>, res: Response) => {
  const subjectId = req.params.id.trim();

  const { subject, workbook } = await buildSubjectWorkbook(subjectId);
  if (!subject || !workbook) throw new HttpError(404, "SUBJECT_NOT_FOUND", "Subject not found");

  const fileName = `subject_${subject.code || subject.id}.xlsx`;

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

  await workbook.xlsx.write(res);
  res.end();
});