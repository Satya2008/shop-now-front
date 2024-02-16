export interface SingUpForSeller{
    name : string,
    password: string,
    email: string
}
export interface loginForUser{
    email: string,
    password: string
}
export interface loginForSeller{
    email: string,
    password: string
}
export interface productForSeller{
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    image:string,
    productId:number,
    productQuantity:undefined|number,
    userId: undefined | number
}

export interface userData{
    userid:number
    name:string
    email:string
    password:string
    mobileNo:string
}
