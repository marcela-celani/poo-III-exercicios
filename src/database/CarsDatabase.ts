import { CarDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CarsDatabase extends BaseDatabase {
    public static TABLE_CARS = "cars"
    
    public async findCars() {
        const carsDB: CarDB[] = await BaseDatabase
        .connection(CarsDatabase.TABLE_CARS)

        return carsDB
    }

    public async findCarById(id: string) {
        const [carsDB]: CarDB[] | undefined[] = await BaseDatabase
        .connection(CarsDatabase.TABLE_CARS).where({ id })

        return carsDB
    }

    public async createCar(newCarDB: CarDB): Promise<void> {
        await BaseDatabase
            .connection(CarsDatabase.TABLE_CARS)
            .insert(newCarDB)
    }

    public async updateCar(newCarDB: CarDB, id: string): Promise<void> {
        await BaseDatabase
            .connection(CarsDatabase.TABLE_CARS)
            .update(newCarDB)
            .where({ id })
            
    }

    public async deleteCar(id: string): Promise<void> {
        await BaseDatabase
            .connection(CarsDatabase.TABLE_CARS)
            .delete()
            .where({ id })
            
    }
}