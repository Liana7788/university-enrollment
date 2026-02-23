import { CreateGroupInput, GroupParams, UpdateGroupInput } from "../types/group.type";
import { Request, Response } from "express";
import { createGroup, deleteGroup, getGroupById, listGroups, updateGroup } from "../services/group.service";

import { HttpError } from "../utils/http-error";
import { asyncHandler } from "../middlewares/async-handler";
import { isHHMM } from "../utils/date-format";
import { prisma } from "../config/db";
import { success } from "../utils/api-response";

export const create = asyncHandler(async (req: Request<{}, {}, CreateGroupInput>, res: Response) => {
  const subjectId = String(req.body?.subjectId ?? "").trim();
  const title = String(req.body?.title ?? "").trim();
  const dayOfWeek = Number(req.body?.dayOfWeek);
  const startTime = String(req.body?.startTime ?? "").trim();
  const endTime = String(req.body?.endTime ?? "").trim();
  const capacity = Number(req.body?.capacity);

  if (!subjectId || !title || !startTime || !endTime) {
    throw new HttpError(400, "VALIDATION_ERROR", "subjectId, title, startTime, endTime are required");
  }
  if (!Number.isInteger(dayOfWeek) || dayOfWeek < 1 || dayOfWeek > 7) {
    throw new HttpError(400, "VALIDATION_ERROR", "dayOfWeek must be integer between 1 and 7");
  }
  if (!isHHMM(startTime) || !isHHMM(endTime)) {
    throw new HttpError(400, "VALIDATION_ERROR", "startTime and endTime must be in HH:MM format");
  }
  if (!Number.isInteger(capacity) || capacity <= 0) {
    throw new HttpError(400, "VALIDATION_ERROR", "capacity must be a positive integer");
  }

  const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
  if (!subject) throw new HttpError(404, "SUBJECT_NOT_FOUND", "Subject not found");

  const group = await createGroup({
    subjectId,
    title,
    dayOfWeek,
    startTime,
    endTime,
    capacity,
  });

  return res.status(201).json(success("Group created successfully", group));
});

export const list = asyncHandler(async (req: Request<{}, {}, {}, { subjectId?: string }>, res: Response) => {
  const subjectId = req.query.subjectId ? String(req.query.subjectId).trim() : undefined;

  if (subjectId) {
    const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
    if (!subject) throw new HttpError(404, "SUBJECT_NOT_FOUND", "Subject not found");
  }

  const groups = await listGroups(subjectId);
  return res.json(success("Groups fetched successfully", groups));
});

export const getById = asyncHandler(async (req: Request<GroupParams>, res: Response) => {
  const id = req.params.id.trim();
  const group = await getGroupById(id);
  if (!group) throw new HttpError(404, "GROUP_NOT_FOUND", "Group not found");
  return res.json(success("Group fetched successfully", group));
});

export const update = asyncHandler(async (req: Request<GroupParams, {}, UpdateGroupInput>, res: Response) => {
  const id = req.params.id.trim();

  const existing = await prisma.group.findUnique({ where: { id } });
  if (!existing) throw new HttpError(404, "GROUP_NOT_FOUND", "Group not found");

  const data: any = {};

  if (typeof req.body.title === "string") data.title = req.body.title.trim();

  if (req.body.dayOfWeek !== undefined) {
    const dayOfWeek = Number(req.body.dayOfWeek);
    if (!Number.isInteger(dayOfWeek) || dayOfWeek < 1 || dayOfWeek > 7) {
      throw new HttpError(400, "VALIDATION_ERROR", "dayOfWeek must be integer between 1 and 7");
    }
    data.dayOfWeek = dayOfWeek;
  }

  if (req.body.startTime !== undefined) {
    const startTime = String(req.body.startTime).trim();
    if (!isHHMM(startTime)) throw new HttpError(400, "VALIDATION_ERROR", "startTime must be HH:MM");
    data.startTime = startTime;
  }

  if (req.body.endTime !== undefined) {
    const endTime = String(req.body.endTime).trim();
    if (!isHHMM(endTime)) throw new HttpError(400, "VALIDATION_ERROR", "endTime must be HH:MM");
    data.endTime = endTime;
  }

  if (req.body.capacity !== undefined) {
    const capacity = Number(req.body.capacity);
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new HttpError(400, "VALIDATION_ERROR", "capacity must be a positive integer");
    }
    data.capacity = capacity;
  }

  if (req.body.subjectId !== undefined) {
    const subjectId = String(req.body.subjectId).trim();
    if (!subjectId) throw new HttpError(400, "VALIDATION_ERROR", "subjectId cannot be empty");

    const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
    if (!subject) throw new HttpError(404, "SUBJECT_NOT_FOUND", "Subject not found");

    data.subjectId = subjectId;
  }

  if (Object.keys(data).length === 0) {
    throw new HttpError(400, "VALIDATION_ERROR", "At least one field must be provided");
  }

  const updated = await updateGroup(id, data);
  return res.json(success("Group updated successfully", updated));
});

export const remove = asyncHandler(async (req: Request<GroupParams>, res: Response) => {
  const id = req.params.id.trim();

  const existing = await prisma.group.findUnique({ where: { id } });
  if (!existing) throw new HttpError(404, "GROUP_NOT_FOUND", "Group not found");

  await deleteGroup(id);
  return res.json(success("Group deleted successfully"));
});