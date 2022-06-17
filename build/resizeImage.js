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
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function resizeImage(imageName, imageheight, imagewidth, imagePath) {
    return __awaiter(this, void 0, void 0, function* () {
        //(3) check if thumbnail folder exists
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, "assets", "images", "thumbnail"))) {
            fs_1.default.mkdirSync(path_1.default.join(__dirname, "assets", "images", "thumbnail"));
        }
        //create image new path (resivedImagePath)
        const resizedImagePath = path_1.default.join(__dirname, "assets", "images", "thumbnail", `/${imageName}_${imagewidth}_${imageheight}.jpg`);
        if (!fs_1.default.existsSync(resizedImagePath)) {
            yield (0, sharp_1.default)(imagePath)
                .resize({ height: imageheight, width: imagewidth })
                .toFile(resizedImagePath);
        }
    });
}
exports.default = resizeImage;
