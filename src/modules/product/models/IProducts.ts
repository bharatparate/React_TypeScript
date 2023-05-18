export interface IProduct{
    name : string;
    user?: string;
    imgUrl: string;
    categoryId: string;
    description: string;
    price: string;
    quantity: string;
    _id? : string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICategory{
    name : string;
    _id? : string;
    user?: string;
    createdAt?: Date;
    updatedAt?: Date;
}