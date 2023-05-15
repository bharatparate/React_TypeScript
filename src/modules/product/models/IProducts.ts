export interface IProduct{
    id?: string;
    imgurl: string
    name: string;
    price: string,
    quantity: string;
    category: string;
    description: string;  
}

export interface ICategory{
    id?:string;
    category: string
}