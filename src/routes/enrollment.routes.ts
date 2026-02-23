import { create, list, remove } from "../controllers/enrollment.controller";

import { Router } from "express";

const router = Router();

/**
 * @openapi
 * /enrollments:
 *   post:
 *     summary: Create a new enrollment
 *     tags:
 *       - Enrollments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - groupId
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: "clx123abc456"
 *               groupId:
 *                 type: string
 *                 example: "group123abc456"
 *     responses:
 *       201:
 *         description: Enrollment created successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *        description: Student or group not found.
 *       409:
 *        description: Student already enrolled or group capacity full.
 *       500:
 *        description: Internal server error.
 */
router.post("/", create);

/**
 * @openapi
 * /enrollments:
 *   get:
 *     summary: Get enrollments (optional filters)
 *     tags:
 *       - Enrollments
 *     parameters:
 *       - in: query
 *         name: groupId
 *         required: false
 *         schema:
 *           type: string
 *         example: clygroup123
 *         description: Filter enrollments by group ID
 *       - in: query
 *         name: studentId
 *         required: false
 *         schema:
 *           type: string
 *         example: clystudent123
 *         description: Filter enrollments by student ID
 *       - in: query
 *         name: subjectId
 *         required: false
 *         schema:
 *           type: string
 *         example: clxsubject123
 *         description: Filter enrollments by subject ID
 *     responses:
 *       200:
 *         description: Enrollments retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Enrollments fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: enrl_123
 *                       groupId:
 *                         type: string
 *                         example: clygroup123
 *                       studentId:
 *                         type: string
 *                         example: clystudent123
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-02-20T12:00:00.000Z
 *                       student:
 *                         type: object
 *                         properties:
 *                           id: { type: string, example: clystudent123 }
 *                           studentNo: { type: string, example: STU0001 }
 *                           fullName: { type: string, example: Aram Petrosyan }
 *                           email: { type: string, nullable: true, example: aram.pet@example.com }
 *                       group:
 *                         type: object
 *                         properties:
 *                           id: { type: string, example: clygroup123 }
 *                           subjectId: { type: string, example: clxsubject123 }
 *                           title: { type: string, example: Group A }
 *                           dayOfWeek: { type: integer, example: 1 }
 *                           startTime: { type: string, example: "10:00" }
 *                           endTime: { type: string, example: "11:30" }
 *                           capacity: { type: integer, example: 2 }
 *                           subject:
 *                             type: object
 *                             properties:
 *                               id: { type: string, example: clxsubject123 }
 *                               code: { type: string, example: MATH101 }
 *                               name: { type: string, example: Mathematics }
 *       404:
 *         description: Related entity not found (group/student/subject).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [success, message]
 *               properties:
 *                 success: { type: boolean, example: false }
 *                 message: { type: string, example: Group not found }
 *                 error: { type: string, example: GROUP_NOT_FOUND }
 *       500:
 *         description: Internal server error.
 */
router.get("/", list);

/**
 * @openapi
 * /enrollments/{id}:
 *   delete:
 *     summary: Delete an enrollment by ID
 *     tags:
 *       - Enrollments
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        example: clx123abc456
 *     responses:
 *       200:
 *         description: Enrollment successfully deleted.
 *       404:
 *         description: Enrollment not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", remove);

export default router;