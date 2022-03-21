const express = require("express");
const { protectRoute, isAuthorize } = require("../Controller/authController");

const planRouter = express.Router();

const {
  getAllPlans,
  createPlan,
  getPlanById,
  updatePlanById,
  deletePlanById,
} = require("../Controller/planController");



planRouter
.route("/")
.get(protectRoute, getAllPlans)
.post(createPlan);

planRouter
  .route("/:id")
  .get(protectRoute,getPlanById)
  .patch(protectRoute,isAuthorize,updatePlanById)
  .delete(protectRoute, isAuthorize,deletePlanById);

module.exports = planRouter;