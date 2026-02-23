import { EnrollStudent, ListEnrollmentsFilters } from "../types/enrollment.type";

import { HttpError } from "../utils/http-error";
import { prisma } from "../config/db";

export async function enrollStudent(data: EnrollStudent) {
  const { studentId, groupId } = data;
  return prisma.$transaction(async (tx) => {
    const [student, group] = await Promise.all([
      tx.student.findUnique({ where: { id: studentId } }),
      tx.group.findUnique({ where: { id: groupId } }),
    ]);

    if (!student) throw new HttpError(404, "STUDENT_NOT_FOUND", "Student not found");
    if (!group) throw new HttpError(404, "GROUP_NOT_FOUND", "Group not found");

    const exists = await tx.enrollment.findUnique({
      where: { groupId_studentId: { groupId, studentId } },
    });
    if (exists) throw new HttpError(409, "ALREADY_ENROLLED", "Student already enrolled in this group");

    const count = await tx.enrollment.count({ where: { groupId } });
    if (count >= group.capacity) throw new HttpError(409, "GROUP_CAPACITY_FULL", "Group capacity is full");

    return tx.enrollment.create({
      data: { studentId, groupId },
      include: {
        student: true,
        group: { include: { subject: true } },
      },
    });
  });
}

export async function listEnrollments(filters: ListEnrollmentsFilters) {
  const { groupId, studentId, subjectId } = filters;

  return prisma.enrollment.findMany({
    where: {
      ...(groupId ? { groupId } : {}),
      ...(studentId ? { studentId } : {}),
      ...(subjectId ? { group: { subjectId } } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: {
      student: true,
      group: { include: { subject: true } },
    },
  });
}

export async function getEnrollmentById(id: string) {
  return prisma.enrollment.findUnique({
    where: { id },
    include: {
      student: true,
      group: { include: { subject: true } },
    },
  });
}

export async function deleteEnrollment(id: string) {
  return prisma.enrollment.delete({
    where: { id },
    include: {
      student: true,
      group: { include: { subject: true } },
    },
  });
}