import { CreateStudent, StudentParams, UpdateStudent } from "../types/student.type";
import { Request, Response } from "express";
import { createStudent, deleteStudent, getStudentById, listStudents, updateStudent } from "../services/student.service";

import { HttpError } from "../utils/http-error";
import { asyncHandler } from "../middlewares/async-handler";
import { isEmail } from "../utils/utils";
import { success } from "../utils/api-response";

export const create = asyncHandler(async (req: Request<{}, {}, CreateStudent>, res: Response) => {
  const studentNo = String(req.body?.studentNo ?? "").trim();
  const fullName = String(req.body?.fullName ?? "").trim();
  const emailRaw = req.body?.email;

  if (!studentNo || !fullName) {
    throw new HttpError(400, "VALIDATION_ERROR", "studentNo and fullName are required");
  }

  let email: string | null | undefined = undefined;
  if (emailRaw !== undefined) {
    const e = String(emailRaw).trim();
    if (e.length === 0) email = null;
    else {
      if (!isEmail(e)) throw new HttpError(400, "VALIDATION_ERROR", "email is invalid");
      email = e.toLowerCase();
    }
  }

  const student = await createStudent({ studentNo, fullName, email });
  return res.status(201).json(success("Student created successfully", student));
});

export const list = asyncHandler(async (_req: Request, res: Response) => {
  const students = await listStudents();
  return res.json(success("Students fetched successfully", students));
});

export const getById = asyncHandler(async (req: Request<StudentParams>, res: Response) => {
  const id = req.params.id.trim();

  const student = await getStudentById(id);
  if (!student) throw new HttpError(404, "STUDENT_NOT_FOUND", "Student not found");

  return res.json(success("Student fetched successfully", student));
});

export const update = asyncHandler(async (req: Request<StudentParams, {}, UpdateStudent>, res: Response) => {
  const id = req.params.id.trim();

  const existing = await getStudentById(id);
  if (!existing) throw new HttpError(404, "STUDENT_NOT_FOUND", "Student not found");

  const data: any = {};

  if (req.body.studentNo !== undefined) {
    const studentNo = String(req.body.studentNo).trim();
    if (!studentNo) throw new HttpError(400, "VALIDATION_ERROR", "studentNo cannot be empty");
    data.studentNo = studentNo;
  }

  if (req.body.fullName !== undefined) {
    const fullName = String(req.body.fullName).trim();
    if (!fullName) throw new HttpError(400, "VALIDATION_ERROR", "fullName cannot be empty");
    data.fullName = fullName;
  }

  if (req.body.email !== undefined) {
    if (req.body.email === null) {
      data.email = null;
    } else {
      const e = String(req.body.email).trim();
      if (e.length === 0) data.email = null;
      else {
        if (!isEmail(e)) throw new HttpError(400, "VALIDATION_ERROR", "email is invalid");
        data.email = e.toLowerCase();
      }
    }
  }

  if (Object.keys(data).length === 0) {
    throw new HttpError(400, "VALIDATION_ERROR", "At least one field must be provided");
  }

  const updated = await updateStudent(id, data);
  return res.json(success("Student updated successfully", updated));
});

export const remove = asyncHandler(async (req: Request<StudentParams>, res: Response) => {
  const id = req.params.id.trim();

  const existing = await getStudentById(id);
  if (!existing) throw new HttpError(404, "STUDENT_NOT_FOUND", "Student not found");

  await deleteStudent(id);
  return res.json(success("Student deleted successfully"));
});