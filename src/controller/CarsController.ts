import { Request, Response } from 'express'
import { CarsDatabase } from '../database/CarsDatabase'
import { CarDB } from '../types'
import { Cars } from '../models/Cars'

export class CarsController {
    public getCars =async (req: Request, res: Response) => {
        try {
            const carsDatabase = new CarsDatabase()
            const carsDB: CarDB[] = await carsDatabase.findCars()
    
            const cars = carsDB.map((carDB) => new Cars(
                carDB.id,
                carDB.model,
                carDB.color,
                carDB.year,
                carDB.created_at
            ))

            res.status(200).send(cars)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createCars =async (req: Request, res: Response) => {
        try {

            const { id, model, color, year } = req.body

            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
    
            if (typeof model !== "string") {
                res.status(400)
                throw new Error("'model' deve ser string")
            }
    
            if (typeof color !== "string") {
                res.status(400)
                throw new Error("'color' deve ser string")
            }
    
            if (typeof year !== "number") {
                res.status(400)
                throw new Error("'year' deve ser number")
            }

            const carsDatabase = new CarsDatabase()
            const carsDBExists = await carsDatabase.findCarById(id)

            if (carsDBExists) {
                res.status(400)
                throw new Error("'id' já existe")
            }

            const newCar = new Cars(
                id,
                model,
                color,
                year,
                new Date().toISOString()
            ) // yyyy-mm-ddThh:mm:sssZ
    
            const newCarDB: CarDB = {
                id: newCar.getId(),
                model: newCar.getModel(),
                color: newCar.getColor(),
                year: newCar.getYear(),
                created_at: newCar.getCreatedAt()
            }

            await carsDatabase.createCar(newCarDB)
    
            res.status(201).send(newCar)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editCars =async (req: Request, res: Response) => {
        try {

            const idToEdit = req.params.id
            const { id, model, color, year } = req.body

            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
    
            if (typeof model !== "string") {
                res.status(400)
                throw new Error("'model' deve ser string")
            }
    
            if (typeof color !== "string") {
                res.status(400)
                throw new Error("'color' deve ser string")
            }
    
            if (typeof year !== "number") {
                res.status(400)
                throw new Error("'year' deve ser number")
            }

            const carsDatabase = new CarsDatabase()
            const carDB = await carsDatabase.findCarById(id)

            if (!carDB) {
                res.status(400)
                throw new Error("'id' não encontrado")
            }

            const newCar = new Cars(
                carDB.id,
                carDB.model,
                carDB.color,
                carDB.year,
                new Date().toISOString()
            ) // yyyy-mm-ddThh:mm:sssZ

            id && newCar.setId(id)
            model && newCar.setModel(model)
            color && newCar.setColor(color)
            year && newCar.setYear(year)
    
            const newCarDB: CarDB = {
                id: newCar.getId(),
                model: newCar.getModel(),
                color: newCar.getColor(),
                year: newCar.getYear(),
                created_at: newCar.getCreatedAt()
            }

            await carsDatabase.updateCar(newCarDB, idToEdit)
    
            res.status(201).send(newCar)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public deleteCars =async (req: Request, res: Response) => {
        try {

            const idToDelete = req.params.id

            const carsDatabase = new CarsDatabase()
            const carDB = await carsDatabase.findCarById(idToDelete)

            if (!carDB) {
                res.status(400)
                throw new Error("'id' não encontrado")
            }

            const car = new Cars(
                carDB.id,
                carDB.model,
                carDB.color,
                carDB.year,
                new Date().toISOString()
            ) // yyyy-mm-ddThh:mm:sssZ
    
            // const newCarDB: CarDB = {
            //     id: car.getId(),
            //     model: car.getModel(),
            //     color: car.getColor(),
            //     year: car.getYear(),
            //     created_at: car.getCreatedAt()
            // }

            await carsDatabase.deleteCar(car.getId())
    
            res.status(201).send(car)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}