import { Router } from "express";
import { exportSubjectExcel } from "../controllers/export.controller";

const router = Router();

/**
 * @openapi
 * /export/subjects/{id}:
 *   get:
 *     summary: Export subject enrollments to Excel (.xlsx)
 *     tags:
 *       - Export
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: clx123abc456
 *     responses:
 *       200:
 *         description: Excel file
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Subject not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [success, message]
 *               properties:
 *                 success: { type: boolean, example: false }
 *                 message: { type: string, example: Subject not found }
 *                 error: { type: string, example: SUBJECT_NOT_FOUND }
 *       500:
 *         description: Internal server error
 */
router.get("/subjects/:id/export", exportSubjectExcel);

export default router;