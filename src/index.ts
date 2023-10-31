import express, { Request, Response } from 'express'
import cors from 'cors'
import { CarsController } from './controller/CarsController'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

const carsController = new CarsController()
app.get("/cars", carsController.getCars)

app.post("/cars", carsController.createCars)

app.put("/cars/:id", carsController.editCars)

app.delete("/cars/:id", carsController.deleteCars)