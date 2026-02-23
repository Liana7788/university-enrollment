import { create, getById, list, remove, update } from "../controllers/student.controller";

import { Router } from "express";

const router = Router();

/**
 * @openapi
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags:
 *       - Students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentNo
 *               - fullName
 *               - email
 *             properties:
 *               studentNo:
 *                 type: string
 *                 example: "123456"
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *     responses:
 *       201:
 *         description: Student created successfully.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Subject not found.
 *       409:
 *         description: Conflict (duplicate group title within subject).
 *       500:
 *         description: Internal server error.
 */
router.post("/", create);

/**
 * @openapi
 * /students:
 *   get:
 *     summary: List students
 *     tags:
 *       - Students
 *     responses:
 *       200:
 *         description: Students fetched
 *       404:
 *         description: No students found
 *       500:
 *         description: Internal server error
 */
router.get("/", list);

/**
 * @openapi
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student fetched
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getById);

/**
 * @openapi
 * /students/{id}:
 *   patch:
 *     summary: Update a student by ID
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentNo: { type: string }
 *               fullName: { type: string }
 *               email: { type: string }

 *     responses:
 *       200:
 *         description: Student successfully updated.
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
 *                   example: Student updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: clx123abc456
 *                     studentNo:
 *                       type: string
 *                       example: "123456"
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-02-20T12:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-02-20T12:05:00.000Z
 *             examples:
 *               success:
 *                 value:
 *                   success: true
 *                   message: Student updated
 *                   data:
 *                     id: clx123abc456
 *                     studentNo: "123456"
 *                     fullName: "John Doe"
 *                     email: "john.doe@example.com"
 *       400:
 *         description: Validation error (no fields provided / invalid input).
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
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: At least one of name or code must be provided
 *                 error:
 *                   type: string
 *                   example: VALIDATION_ERROR
 *       404:
 *         description: Subject not found.
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
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Subject not found
 *                 error:
 *                   type: string
 *                   example: SUBJECT_NOT_FOUND
 *       409:
 *         description: Conflict (duplicate code).
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
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unique constraint violation
 *                 error:
 *                   type: string
 *                   example: CONFLICT
 *       500:
 *         description: Internal server error.
 */
router.patch("/:id", update);

/**
 * @openapi
 * /students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags:
 *       - Students
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        example: clx123abc456
 *     responses:
 *       200:
 *         description: Student successfully deleted.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", remove);

export default router;