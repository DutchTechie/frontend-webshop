export class Cart {
    constructor (
        public userId: string,
        public productId: string,
        public amount: number
    ) {}
}