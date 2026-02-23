import { prisma } from "../config/db";

export const createSubject = async (name: string, code: string) => {
  return prisma.subject.create({
    data: { name, code },
  });
};

export const getAllSubjects = async () => {
  return prisma.subject.findMany({ include: { groups: true } });
};

export const getSubjectById = async (id: string) => {
  return prisma.subject.findUnique({
    where: { id },
    include: { groups: true },
  });
};

export const getSubjectByIdWithGroups = async (id: string) => {
  return prisma.subject.findUnique({
    where: { id },
    include: {
      groups: {
        where: {
          enrollments: {
            some: {},
          },
        },
        orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }, { title: "asc" }],
        include: {
          enrollments: {
            orderBy: { createdAt: "asc" },
            include: { student: true },
          },
        },
      },
    },
  });
};

export const updateSubject = async (id: string, data: { name?: string; code?: string }) => {
  return prisma.subject.update({
    where: { id },
    data,
  });
};

export const deleteSubject = async (id: string) => {
  return prisma.subject.delete({
    where: { id },
  });
};