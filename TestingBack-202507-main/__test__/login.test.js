import supertest from "supertest";
import mongoose from "mongoose";
import { userModel } from "../src/models/users.model.js";
import bcrypt from "bcryptjs";
import app from "../app.js";

describe('prueba de login', () => {

    const testUser = {
        fullName: 'pepe cadena',
        email: 'pepecadena@gmail.com',
        password: '12345'
    };

    beforeEach(async () => {
        await userModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('debe iniciar sesión con un usuario existente', async () => {

        const codedPassword = await bcrypt.hash(testUser.password, 10);
        await userModel.create({ ...testUser, password: codedPassword });

      
        const response = await supertest(app).post('/iniciarSesion').send({
            passwordLogin: '12345',
            emailLogin: 'pepecadena@gmail.com'
        });

        expect(response.statusCode).toBe(200);
    });

    it('no debe iniciarse sesion correctamente, correo invalida', async () => {

        const codedPassword = await bcrypt.hash(testUser.password, 10);
        await userModel.create({ ...testUser, password: codedPassword });

        const response = await supertest(app).post('/iniciarSesion').send({
            passwordLogin: '12345',
            emailLogin: 'fresa@gmail.com'
        });

        expect(response.statusCode).toBe(404);
    });

    it('no debe iniciarse sesion correctamente, contraseña invalida', async () => {

        const codedPassword = await bcrypt.hash(testUser.password, 10);
        await userModel.create({ ...testUser, password: codedPassword });

        const response = await supertest(app).post('/iniciarSesion').send({
            passwordLogin: '12345789',
            emailLogin: 'pepecadena@gmail.com'
        });

        expect(response.statusCode).toBe(401);
    });
});

