import { ImageSourcePropType } from "react-native";
import { images } from "./images";


export const categories:Category[] = [
    {
        name:"SUMMER COMBO",
        color:"#D33B0D",
        image:images.burgerOne,
        price:10.99,
        imgeSide:"right"
    },
    {
        name:"BURGERS",
        color:"#EB920C",
        image:images.burgerTwo,
        imgeSide:"left"
    },
    {
        name:"PIZZA",
        color:"#084137",
        image:images.pizzaOne,
        imgeSide:"right"
    },
    {
        name:"BURITTO",
        color:"#DF5A0C",
        image:images.buritto,
        imgeSide:"left"
    },
    
]

export const dummySearchItems:SearchItem[] = [
    {
        id:1,
        name:"Wendie burger",
        price:10.99,
        image:images.burgerOne,
        description:"A delicious burger with a side of fries",
        category:"BURGERS",
    },
    {
        id:2,
        name:"Wendie burger",
        price:10.99,
        image:images.pizzaOne,
        description:"A delicious burger with a side of fries",
        category:"BURGERS",
    },
    {
        id:3,
        name:"Wendie burger",
        price:10.99,
        image:images.burgerTwo,
        description:"A delicious burger with a side of fries",
        category:"BURGERS",
    },
    {
        id:3,
        name:"Wendie burger",
        price:10.99,
        image:images.fries,
        description:"A delicious burger with a side of fries",
        category:"BURGERS",
    },
    {
        id:1,
        name:"Wendie burger",
        price:10.99,
        image:images.burgerOne,
        description:"A delicious burger with a side of fries",
        category:"BURGERS",
    },
    {
        id:2,
        name:"Wendie burger",
        price:10.99,
        image:images.pizzaOne,
        description:"A delicious burger with a side of fries",
        category:"BURGERS",
    },
    {
        id:3,
        name:"Wendie burger",
        price:10.99,
        image:images.burgerTwo,
        description:"A delicious burger with a side of fries",
        category:"BURGERS",
    },
    {
        id:3,
        name:"Wendie burger",
        price:10.99,
        image:images.fries,
        description:"A delicious burger with a side of fries",
        category:"BURGERS",
    },
    
]

export const dummyCartItems:CartItem[] = [
    {
        id:1,
        name:"Wendie burger",
        price:10.99,
        image:images.burgerOne,
        quantity:1,
    },
    {
        id:2,
        name:"Pizza",
        price:15.99,
        image:images.pizzaOne,
        quantity:3,
    },
    {
        id:3,
        name:"Fries",
        price:5.99,
        image:images.fries,
        quantity:2,
    },
    {
        id:4,
        name:"Buritto",
        price:200.99,
        image:images.buritto,
        quantity:5,
    },
    
]

export const dummyFoodDetailItems:FoodDetailItem = {
        id:1,
        name:"Wendie burger",
        price:10.99,
        image:images.burgerOne,
        discount:0,
        rating:4.5,
        description:"The Cheeseburger Wendy's Burger is a classic fast food burger that packs a punch of flavor in every bite. Made with a juicy beef patty cooked to perfection, it's topped with melted American cheese, crispy lettuce, tomato, & crunchy pickles.",
        category:"BURGERS",
        nutrition:[
            {
                id:1,
                name:"Calories",
                value:100,
                unit:"kcal",
            },
            {
                id:2,
                name:"Protein",
                value:10,
                unit:"g",
            },
            {
                id:3,
                name:"Fat",
                value:10,
                unit:"g",
            },
            {
                id:4,
                name:"Carbohydrates",
                value:10,
                unit:"g",
            },
            
        ],
        foodType:[
            {
                id:1,
                name:"Bun Type",
                description:"Whole Wheat,",
            },
         
            
        ],
        reviews:[
            {
                id:1,
                name:"John Doe",
                rating:4.5,
                comment:"A delicious burger with a side of fries",
                date: new Date("2021-01-01"),
                image:images.avatar,
            },
            {
                id:2,
                name:"Jane Doe",
                rating:3.5,
                comment:"The Cheeseburger Wendy's Burger is a classic fast food burger that packs a punch of flavor in every bite. Made with a juicy beef patty cooked to perfection, it's topped with melted American cheese, crispy lettuce, tomato, & crunchy pickles.",
                date: new Date("2025-07-07"),
                image:images.avatar,
            },
            {
                id:3,
                name:"Dan Doe",
                rating:5,
                comment:"The Cheeseburger Wendy's Burger is a classic fast food burger that packs a punch of flavor in every bite. Made with a juicy beef patty cooked to perfection, it's topped with melted American cheese, crispy lettuce, tomato, & crunchy pickles.",
                date: new Date("2024-10-03"),
                image:images.avatar,
            }
        ],
        addittionalToppings:[
            {
                id:1,
                name:"Cheese",
                price:10.99,
                image:images.cheese,
                rating:4.5,
                category:"CHEESE",
            },
            {
                id:2,
                name:"Lettuce",
                price:10.99,
                image:images.bacon,
                rating:4.5,
                category:"BACON",
            }
        ],
        sideDishes:[
            {
                id:1,
                name:"Fries",
                price:10.99,
                image:images.fries,
                rating:4.5,
                category:"SIDE DISHES",
            }
        ],
        drink:[
            {
                id:1,
                name:"Coke",
                price:10.99,
                image:images.burgerOne,
                rating:4.5,
                category:"DRINK",
            }
        ]
        
}