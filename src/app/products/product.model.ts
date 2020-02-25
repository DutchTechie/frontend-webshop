export class Product {
    public name: string;
    public description: string;
    public imagePath: string;
    public price: number;
    public stock: number;

    constructor (name: string, description: string, imagePath: string, price: number, stock: number){
        this.name = name;
        this.description = description; 
        this.imagePath = imagePath;
        this.price = price;
        this.stock = stock;
    }
}