import app from '../index';
import supertest from 'supertest';
import path from 'path';
import resizeImage from '../resizeImage';


const request = supertest(app);
// EndPoint Testing

describe('End Point testing ', () => {
    it(' should respond with a 200 status code', async () => {
        const response = await request.get(
            '/api?name=encenadaport&height=1000&width=1000'
        );
        expect(response.statusCode).toBe(200);
    });

    it('Should Respond  400 status code if imageName was not entered', async () => {
    const response = await request.get('/api?name=height=1000&width=1000');
    expect(response.status).toBe(400);
    });
});
// functionality Testing
describe('resizing image', () => {
    it('should be truethy', async () => {
        expect(async () => {
            const imageName = 'encenadaport'
            const imageHieght = 1000
            const imageWidth = 1000
            const imagePath = path.join(__dirname, "assets", "images", "full", `${imageName}.jpg`)
            return await resizeImage(imageName,imageWidth,imageHieght,imagePath)
            

        }).toBeTruthy()
    })
    
});
