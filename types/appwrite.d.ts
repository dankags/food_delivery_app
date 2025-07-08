declare interface User {
    email:string,
    password:string,
    phone?:string,
    fullName:string,
}

declare interface SignInUser{
    email:string,
    password:string,
}

declare interface Product{
    sideDishes?:string[]
    drink?:string[]
    addittionalToppings?:string[]
    nutrition?:string[]
    name:string
    discount?:number
    rating?:number
    price:number
    description:string
    foodType?:string[]
    image:string
    categories?:Category[]
    reviews?:Review[]

}

declare interface Category{
    name:string
    products?:Product[]
}

declare interface Review{
    name:string
    rating:number
    comment:string
    productId?:string
    userId?:string
    date:Date
}
