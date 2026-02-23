import { create, getById, list, remove, update } from "../controllers/subject.controller";

import { Router } from "express";

const router = Router();

/**
 * @openapi
 * /subjects:
 *   post:
 *     summary: Create a new subject
 *     tags:
 *       - Subjects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mathematics
 *               code:
 *                 type: string
 *                 example: MATH101
 *     responses:
 *       201:
 *         description: Subject created successfully.
 *       400:
 *         description: Bad request.
 */
router.post("/", create);

/**
 * @openapi
 * /subjects:
 *   get:
 *     summary: Get all subjects
 *     tags:
 *       - Subjects
 *     responses:
 *       200:
 *         description: Subjects retrieved successfully.
 *       500:
 *         description: Internal server error.
 */
router.get("/", list);

/**
 * @openapi
 * /subjects/{id}:
 *   get:
 *     summary: Get a subject by ID
 *     tags:
 *       - Subjects
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        example: clx123abc456
 *     responses:
 *       200:
 *         description: Subject successfully retrieved.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", getById);

/**
 * @openapi
 * /subjects/{id}:
 *   patch:
 *     summary: Update a subject by ID
 *     tags:
 *       - Subjects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: clx123abc456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mathematics Advanced
 *               code:
 *                 type: string
 *                 example: MATH201
 *           examples:
 *             updateName:
 *               value:
 *                 name: Mathematics Advanced
 *             updateCode:
 *               value:
 *                 code: MATH201
 *             updateBoth:
 *               value:
 *                 name: Mathematics Advanced
 *                 code: MATH201
 *     responses:
 *       200:
 *         description: Subject successfully updated.
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
 *                   example: Subject updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: clx123abc456
 *                     name:
 *                       type: string
 *                       example: Mathematics Advanced
 *                     code:
 *                       type: string
 *                       example: MATH201
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
 *                   message: Subject updated
 *                   data:
 *                     id: clx123abc456
 *                     name: Mathematics Advanced
 *                     code: MATH201
 *                     createdAt: "2026-02-20T12:00:00.000Z"
 *                     updatedAt: "2026-02-20T12:05:00.000Z"
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
 * /subjects/{id}:
 *   delete:
 *     summary: Delete a subject by ID
 *     tags:
 *       - Subjects
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        example: clx123abc456
 *     responses:
 *       200:
 *         description: Subject successfully retrieved.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", remove);

export default router;