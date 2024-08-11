import { Router } from "express";
const router = Router()

router.get(('/'), (req, res, _next) => {
  res.json({ status: 200, message: "Server up and running...", data: null })

})

export default router;