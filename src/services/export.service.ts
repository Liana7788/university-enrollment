import ExcelJS from "exceljs";
import { dayName } from "../utils/utils";
import { getSubjectByIdWithGroups } from "./subject.service";
import { setPrettyExcelDate } from "../utils/date-format";

export async function buildSubjectWorkbook(subjectId: string) {
  const subject = await getSubjectByIdWithGroups(subjectId);

  if (!subject) return { subject: null, workbook: null };

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "University Enrollment API";
  workbook.created = new Date();

  const sheetName = (subject.code || subject.name || "Subject").slice(0, 31);
  const ws = workbook.addWorksheet(sheetName);

  ws.addRow([`Subject: ${subject.name} (${subject.code})`]);
  ws.getRow(1).font = { bold: true, size: 14 };
  ws.addRow([]);

  if (!subject.groups.length) {
    ws.addRow(["No groups found for this subject"]);
    return { subject, workbook };
  }

  for (const group of subject.groups) {
    const enrolledCount = group.enrollments.length;

    const metaHeader = ws.addRow(["Group", "Day", "Time", "Capacity", "Enrolled", ""]);
    metaHeader.font = { bold: true };

    ws.addRow([
        group.title,
        dayName(group.dayOfWeek),
        `${group.startTime}-${group.endTime}`,
        group.capacity,
        enrolledCount,
        "",
    ]);

    ws.addRow([]);

    const header = ws.addRow(["#", "Student No", "Full Name", "Email", "Enrolled At"]);
    header.font = { bold: true };

    if (enrolledCount === 0) {
        ws.addRow(["-", "-", "No students enrolled", "-", "-"]);
    } else {
        group.enrollments.forEach((enr: any, idx: number) => {
            const row = ws.lastRow!.number;
            const d = setPrettyExcelDate(ws, `E${row}`, enr.createdAt);
            ws.addRow([
                idx + 1,
                enr.student.studentNo,
                enr.student.fullName,
                enr.student.email ?? "",
                d ?? "",
            ]);
        });
    }

    ws.addRow([]);
    ws.addRow([]);
  }

  ws.columns = [
    { width: 6 },
    { width: 14 },
    { width: 28 },
    { width: 28 },
    { width: 26 },
  ];

  return { subject, workbook };
}