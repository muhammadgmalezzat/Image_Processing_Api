import fs from "fs";
import express, { Application, Request, Response } from "express";
import path from "path";
import resizeImage from "./resizeImage";

const app: Application = express();
const Path = require("path");
const PORt = 3000;

interface imageInfo {
  imageName: string;
  imageHieght: number;
  imageWidth: number;
}

app.get("/api", async (req: Request, res: Response): Promise<void> => {
  const EnteredImage: imageInfo = {
    imageName: req.query.name as string,
    imageHieght: Number(req.query.height),
    imageWidth: Number(req.query.width),
  };

  //(1) to check if height or width is NAN , or it is not set
  if (
    !EnteredImage.imageHieght ||
    !EnteredImage.imageWidth ||
    EnteredImage.imageHieght <= 0 ||
    EnteredImage.imageWidth <= 0 ||
    !EnteredImage.imageName ||
    EnteredImage.imageWidth >= 10000 ||
    EnteredImage.imageHieght >= 10000
  ) {
    res
      .status(400)
      .send("width or height is not valid  , width and height from 1 to 9999 ");
  } else {
    const imagePath: string = Path.join(
      __dirname,
      "assets",
      "images",
      "full",
      `/${EnteredImage.imageName}.jpg`
    );
    //(2) check if imageName is found in images folder
    if (fs.existsSync(`${imagePath}`)) {
      //(3) check if thumbnail folder exists

      await resizeImage(
        EnteredImage.imageName,
        EnteredImage.imageHieght,
        EnteredImage.imageWidth,
        imagePath
      );

      const resizedImagePath: string = path.join(
        __dirname,
        "assets",
        "images",
        "thumbnail",
        `/${EnteredImage.imageName}_${EnteredImage.imageWidth}_${EnteredImage.imageHieght}.jpg`
      );

      res.sendFile(resizedImagePath);
    } else {
      res.send(
        "Image name Not Found in Images folder ,ensure your image name is exist"
      );
    }
  }
});

//listen to server
app.listen(PORt, () => console.log(`listen on ${PORt}`));

export default app;
