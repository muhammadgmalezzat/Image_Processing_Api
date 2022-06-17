"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const resizeImage_1 = __importDefault(require("./resizeImage"));
const app = (0, express_1.default)();
const Path = require("path");
const PORt = 3000;
app.get("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const EnteredImage = {
        imageName: req.query.name,
        imageHieght: Number(req.query.height),
        imageWidth: Number(req.query.width),
    };
    //(1) to check if height or width is NAN , or it is not set
    if (!EnteredImage.imageHieght ||
        !EnteredImage.imageWidth ||
        EnteredImage.imageHieght <= 0 ||
        EnteredImage.imageWidth <= 0 ||
        !EnteredImage.imageName ||
        EnteredImage.imageWidth >= 10000 ||
        EnteredImage.imageHieght >= 10000) {
        res
            .status(400)
            .send("width or height is not valid  , width and height from 1 to 9999 ");
    }
    else {
        const imagePath = Path.join(__dirname, "assets", "images", "full", `/${EnteredImage.imageName}.jpg`);
        //(2) check if imageName is found in images folder
        if (fs_1.default.existsSync(`${imagePath}`)) {
            //(3) check if thumbnail folder exists
            yield (0, resizeImage_1.default)(EnteredImage.imageName, EnteredImage.imageHieght, EnteredImage.imageWidth, imagePath);
            const resizedImagePath = path_1.default.join(__dirname, "assets", "images", "thumbnail", `/${EnteredImage.imageName}_${EnteredImage.imageWidth}_${EnteredImage.imageHieght}.jpg`);
            res.sendFile(resizedImagePath);
        }
        else {
            res.send("Image name Not Found in Images folder ,ensure your image name is exist");
        }
    }
}));
//listen to server
app.listen(PORt, () => console.log(`listen on ${PORt}`));
exports.default = app;
