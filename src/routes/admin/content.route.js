const express = require("express");
const router = express.Router();
const path = require("path");

const admin = require("../../controllers/admin");
const upload = require("../../controllers/upload");

router.get("/admin/game-content/:game", admin.getGameContent);
router.post("/admin/upload-game-content", admin.uploadGameContent);
router.get("/admin/get-data/:table", admin.getData);
router.post("/admin/clear/:table", admin.clearData);

router.post(
  "/admin/candidate/image/:candidate",
  upload.upload.single("image"),
  upload.uploadImageCandidates
);

router.post(
  "/admin/upload-image",
  upload.upload.single("image"),
  upload.uploadImageCandidates
);

router.get("/image/:filename", (req, res) => {
  const { filename } = req.params;
  const dirname = path.resolve();
  const fullFilePath = path.join(dirname, "upload/" + filename);
  console.log(fullFilePath);
  return res.sendFile(fullFilePath);
});

module.exports = router;
