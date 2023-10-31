export class Cars {
    constructor(
        private id: string,
        private model: string,
        private color: string,
        private year: number,
        private createdAt: string
    ){}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getModel(): string {
        return this.model
    }

    public setModel(value: string): void {
        this.model = value
    }

    public getColor(): string {
        return this.color
    }

    public setColor(value: string): void {
        this.color = value
    }

    public getYear(): number {
        return this.year
    }

    public setYear(value: number): void {
        this.year = value
    }

    
    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }
}