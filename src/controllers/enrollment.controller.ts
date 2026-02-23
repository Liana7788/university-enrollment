import { EnrollStudent, ListEnrollmentsFilters } from "../types/enrollment.type";
import { Request, Response } from "express";
import { deleteEnrollment, enrollStudent, getEnrollmentById, listEnrollments } from "../services/enrollment.service";

import { HttpError } from "../utils/http-error";
import { asyncHandler } from "../middlewares/async-handler";
import { getGroupById } from "../services/group.service";
import { getStudentById } from "../services/student.service";
import { getSubjectById } from "../services/subject.service";
import { success } from "../utils/api-response";

export const create = asyncHandler(async (req: Request<{}, {}, EnrollStudent>, res: Response) => {
  const studentId = String(req.body?.studentId ?? "").trim();
  const groupId = String(req.body?.groupId ?? "").trim();

  if (!studentId || !groupId) {
    throw new HttpError(400, "VALIDATION_ERROR", "studentId and groupId are required");
  }

  await enrollStudent({ studentId, groupId });
  return res.status(201).json(success("Enrollment created successfully"));
});

export const list = asyncHandler(async (req: Request<ListEnrollmentsFilters>, res: Response) => {
  const groupId = req.query.groupId ? String(req.query.groupId).trim() : undefined;
  const studentId = req.query.studentId ? String(req.query.studentId).trim() : undefined;
  const subjectId = req.query.subjectId ? String(req.query.subjectId).trim() : undefined;

  if (groupId) {
    const g = await getGroupById(groupId);
    if (!g) throw new HttpError(404, "GROUP_NOT_FOUND", "Group not found");
  }
  if (studentId) {
    const s = await getStudentById(studentId);
    if (!s) throw new HttpError(404, "STUDENT_NOT_FOUND", "Student not found");
  }
  if (subjectId) {
    const sub = await getSubjectById(subjectId);
    if (!sub) throw new HttpError(404, "SUBJECT_NOT_FOUND", "Subject not found");
  }

  const enrollments = await listEnrollments({ groupId, studentId, subjectId });
  return res.json(success("Enrollments fetched successfully", enrollments));
});

export const remove = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id.trim();

  const existing = await getEnrollmentById(id);
  if (!existing) throw new HttpError(404, "ENROLLMENT_NOT_FOUND", "Enrollment not found");

  await deleteEnrollment(id);
  return res.json(success("Enrollment deleted successfully"));
});
