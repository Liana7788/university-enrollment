import { CreateStudent, UpdateStudent } from "../types/student.type";

import { prisma } from "../config/db";

export const createStudent = async (data: CreateStudent) => {
  return prisma.student.create({ data });
};

export const listStudents = async () => {
  return prisma.student.findMany({
    orderBy: { createdAt: "desc" },
    include: { 
      _count: { select: { enrollments: true } }
    },
  });
};

export const getStudentById = async (id: string) => {
  return prisma.student.findUnique({
    where: { id },
    include: {
      enrollments: {
        include: {
          group: { include: { subject: true } },
        },
      },
      _count: { select: { enrollments: true } },
    },
  });
};

export const updateStudent = async (
  id: string,
  data: UpdateStudent
) => {
  return prisma.student.update({ where: { id }, data });
};

export const deleteStudent = async (id: string) => {
  return prisma.student.delete({ where: { id } });
};