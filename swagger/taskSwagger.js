/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Endpoints for managing tasks
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task (admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - assigneeId
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, done]
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               assigneeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Task created
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to create task
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks (admin sees all, employee sees only their tasks)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                   dueDate:
 *                     type: string
 *                     format: date-time
 *                   assigneeId:
 *                     type: integer
 *                   createdById:
 *                     type: integer
 *                   comments:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         content:
 *                           type: string
 *                         user:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             name:
 *                               type: string
 *                   files:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         filename:
 *                           type: string
 *                         url:
 *                           type: string
 *                         user:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             name:
 *                               type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to fetch tasks
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task (admin can update all fields, employee only status)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, done]
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               assigneeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Task updated
 *       403:
 *         description: Access denied
 *       500:
 *         description: Failed to update task
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task (admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       204:
 *         description: Task deleted
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to delete task
 */
