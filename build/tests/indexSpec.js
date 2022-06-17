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
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const resizeImage_1 = __importDefault(require("../resizeImage"));
const request = (0, supertest_1.default)(index_1.default);
// EndPoint Testing
describe('End Point testing ', () => {
    it(' should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api?name=encenadaport&height=1000&width=1000');
        expect(response.statusCode).toBe(200);
    }));
    it('Should Respond  400 status code if imageName was not entered', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api?name=height=1000&width=1000');
        expect(response.status).toBe(400);
    }));
});
// functionality Testing
describe('resizing image', () => {
    it('should be truethy', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const imageName = 'encenadaport';
            const imageHieght = 1000;
            const imageWidth = 1000;
            const imagePath = path_1.default.join(__dirname, "assets", "images", "full", `${imageName}.jpg`);
            return yield (0, resizeImage_1.default)(imageName, imageWidth, imageHieght, imagePath);
        })).toBeTruthy();
    }));
});
