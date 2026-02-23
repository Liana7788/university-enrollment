import { Router } from "express";
import enrollmentRoutes from "./enrollment.routes";
import exportRoutes from "./export.routes";
import groupRoutes from "./group.routes";
import studentRoutes from "./student.routes";
import subjectRoutes from "./subject.routes";

const router = Router();

// base routes
router.use("/subjects", subjectRoutes);
router.use("/groups", groupRoutes);
router.use("/students", studentRoutes);
router.use("/enrollments", enrollmentRoutes);
router.use("/", exportRoutes);

export default router;