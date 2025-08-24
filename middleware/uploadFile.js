import multer from "multer";
import path from "path";

const uploadDir = "./uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

///////

const filterProfileImage = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

export const uploadProfileImage = multer({
  storage,
  fileFilter: filterProfileImage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
}).single("avatar");

////

const filterTaskFile = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

export const uploadTaskFile = multer({
  storage,
  fileFilter: filterTaskFile,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
}).single("file");
