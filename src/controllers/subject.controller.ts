import { CreateSubjectBody, SubjectParams, UpdateSubjectBody } from "../types/subject.type";
import { Request, Response } from "express";
import { createSubject, deleteSubject, getAllSubjects, getSubjectById, updateSubject } from "../services/subject.service";

import { HttpError } from "../utils/http-error";
import { asyncHandler } from "../middlewares/async-handler";
import { success } from "../utils/api-response";

export const create = asyncHandler(async (
  req: Request<{}, {}, CreateSubjectBody>, 
  res: Response
) => {
  const name = String(req.body?.name ?? "").trim();
  const code = String(req.body?.code ?? "").trim().toUpperCase();

  if (!name || !code) {
    throw new HttpError(400, "VALIDATION_ERROR", "name and code are required");
  }

  const subject = await createSubject(name, code);
  return res.status(201).json(success("Subject created successfully", subject));
});

export const list = asyncHandler(async (_req: Request, res: Response) => {
  const subjects = await getAllSubjects();
  return res.json(success("Subjects fetched successfully", subjects));
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id ?? "").trim();
  if (!id) throw new HttpError(400, "VALIDATION_ERROR", "id is required");

  const subject = await getSubjectById(id);
  if (!subject) throw new HttpError(404, "SUBJECT_NOT_FOUND", "Subject not found");

  return res.json(success("Subject fetched successfully", subject));
});

export const update = asyncHandler(async (req: Request<SubjectParams, {}, UpdateSubjectBody>, res: Response) => {
  const id = String(req.params.id ?? "").trim();
  if (!id) throw new HttpError(400, "VALIDATION_ERROR", "Id is required");

  const nameRaw = req.body?.name;
  const codeRaw = req.body?.code;

  const data: { name?: string; code?: string } = {};
  if (typeof nameRaw === "string") data.name = nameRaw.trim();
  if (typeof codeRaw === "string") data.code = codeRaw.trim().toUpperCase();

  if (Object.keys(data).length === 0) {
    throw new HttpError(400, "VALIDATION_ERROR", "At least one of name or code must be provided");
  }

  const existing = await getSubjectById(id);
  if (!existing) throw new HttpError(404, "SUBJECT_NOT_FOUND", "Subject not found");

  const updated = await updateSubject(id, data);
  return res.json(success("Subject updated successfully", updated));
});

export const remove = asyncHandler(async (req: Request<SubjectParams, {}, {}>, res: Response) => {
  const id = String(req.params.id ?? "").trim();
  if (!id) throw new HttpError(400, "VALIDATION_ERROR", "id is required");

  const existing = await getSubjectById(id);
  if (!existing) throw new HttpError(404, "SUBJECT_NOT_FOUND", "Subject not found");

  await deleteSubject(id);
  return res.json(success("Subject deleted successfully"));
});