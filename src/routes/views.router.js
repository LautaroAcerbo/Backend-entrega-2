import express from "express";

const router = express.Router();

router.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts");
});

export default router;
