/**
 * @swagger
 * tags:
 *   name: Files
 *   description: Endpoints for managing files attached to tasks
 */

/**
 * @swagger
 * /api/tasks/{id}/files:
 *   post:
 *     summary: Upload a file to a task
 *     tags: [Files]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to upload file
 */

/**
 * @swagger
 * /api/tasks/{id}/files:
 *   get:
 *     summary: Get all files for a task
 *     tags: [Files]
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
 *       200:
 *         description: List of files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   filename:
 *                     type: string
 *                   url:
 *                     type: string
 *                   uploadedBy:
 *                     type: integer
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to retrieve files
 */
