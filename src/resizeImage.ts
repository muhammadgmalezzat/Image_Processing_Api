import sharp from "sharp";
import fs from "fs";
import path from "path";

async function resizeImage(
  imageName: string,
  imageheight: number,
  imagewidth: number,
  imagePath: string
): Promise<void> {
  //(3) check if thumbnail folder exists
  if (!fs.existsSync(path.join(__dirname, "assets", "images", "thumbnail"))) {
    fs.mkdirSync(path.join(__dirname, "assets", "images", "thumbnail"));
  }
  //create image new path (resivedImagePath)
  const resizedImagePath: string = path.join(
    __dirname,
    "assets",
    "images",
    "thumbnail",
    `/${imageName}_${imagewidth}_${imageheight}.jpg`
  );
  if (!fs.existsSync(resizedImagePath)) {
    await sharp(imagePath)
      .resize({ height: imageheight, width: imagewidth })
      .toFile(resizedImagePath);
  }
}

export default resizeImage;
