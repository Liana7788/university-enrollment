import { create, getById, list, remove, update } from "../controllers/group.controller";

import { Router } from "express";

const router = Router();

/**
 * @openapi
 * /groups:
 *   post:
 *     summary: Create a new group
 *     tags:
 *       - Groups
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subjectId
 *               - title
 *               - dayOfWeek
 *               - startTime
 *               - endTime
 *               - capacity
 *             properties:
 *               subjectId:
 *                 type: string
 *                 example: clx123abc456
 *               title:
 *                 type: string
 *                 example: Group A
 *               dayOfWeek:
 *                 type: integer
 *                 example: 1
 *               startTime:
 *                 type: string
 *                 example: "10:00"
 *               endTime:
 *                 type: string
 *                 example: "11:30"
 *               capacity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Group created successfully.
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
 * /groups:
 *   get:
 *     summary: List groups (optional filter by subjectId)
 *     tags:
 *       - Groups
 *     parameters:
 *       - in: query
 *         name: subjectId
 *         required: false
 *         schema:
 *           type: string
 *         example: clx123abc456
 *     responses:
 *       200:
 *         description: Groups fetched
 */
router.get("/", list);

/**
 * @openapi
 * /groups/{id}:
 *   get:
 *     summary: Get a group by ID
 *     tags:
 *       - Groups
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Group fetched
 *       404:
 *         description: Group not found
 */
router.get("/:id", getById);

/**
 * @openapi
 * /groups/{id}:
 *   patch:
 *     summary: Update a group by ID
 *     tags:
 *       - Groups
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
 *               subjectId: { type: string }
 *               title: { type: string }
 *               dayOfWeek: { type: integer }
 *               startTime: { type: string, example: "10:00" }
 *               endTime: { type: string, example: "11:30" }
 *               capacity: { type: integer }
 *     responses:
 *       200:
 *         description: Group updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Group not found
 *       409: 
 *         description: Conflict (duplicate group title within subject)
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", update);

/**
 * @openapi
 * /groups/{id}:
 *   delete:
 *     summary: Delete a group by ID
 *     tags:
 *       - Groups
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Group deleted
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", remove);

export default router;