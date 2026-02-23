import { CreateGroupInput, UpdateGroupInput } from "../types/group.type";

import { prisma } from "../config/db";

export const createGroup = async (data: CreateGroupInput) => {
  return prisma.group.create({
    data,
  });
};

export const listGroups = async (subjectId?: string) => {
  return prisma.group.findMany({
    where: subjectId ? { subjectId } : undefined,
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }, { title: "asc" }],
    include: {
      subject: true,
      _count: { select: { enrollments: true } },
    },
  });
};

export const getGroupById = async (id: string) => {
  return prisma.group.findUnique({
    where: { id },
    include: {
      subject: true,
      enrollments: { include: { student: true } },
      _count: { select: { enrollments: true } },
    },
  });
};

export const updateGroup = async (id: string, data: UpdateGroupInput) => {
  return prisma.group.update({
    where: { id },
    data,
  });
};

export const deleteGroup = async (id: string) => {
  return prisma.group.delete({ where: { id } });
};