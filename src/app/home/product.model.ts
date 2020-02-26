// TODO: Move this to appropiate folder
export class Product {
    public id: string
    public name: string;
    public description: string;
    public imagePath: string;
    public price: number;
    public stock: number;

    constructor (
        id: string,
        name: string,
        description: string, 
        imagePath: string, 
        price: number, 
        stock: number
        ) 
    {
        this.id = id
        this.name = name;
        this.description = description; 
        this.imagePath = imagePath;
        this.price = price;
        this.stock = stock;
    }
}