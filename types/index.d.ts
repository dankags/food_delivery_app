declare enum IconType{
    MaterialCommunityIcons = "MaterialCommunityIcons",
    Ionicons = "Ionicons",
    FontAwesome = "FontAwesome",
    Entypo = "Entypo",
    MaterialIcons = "MaterialIcons",
    SimpleLineIcons = "SimpleLineIcons",
    FontAwesome5 = "FontAwesome5",
    Feather = "Feather",
    AntDesign = "AntDesign",
    Octicons="Octicons",
    Foundation="Foundation",
    FontAwesome6="FontAwesome6",
}

declare interface IconProps{
    iconLibraryType: keyof typeof IconType;
    color?: string;
    size?: number;
    style?: TextStyle | ViewStyle | ImageStyle;
    iconName: keyof typeof IconType["glyphMap"];
  };

declare interface Category {
    name:string,
    color:string,
    image:ImageSourcePropType,
    price?:number,
    imgeSide:"left" | "right"
}

declare interface SearchItem {
    id:number|string,
    name:string,
    price:number,
    image:ImageSourcePropType,
    description?:string,
    rating?:number,
    category?:string,
    isFavorite?:boolean,
}

declare interface CartItem {
    id:number|string,
    name:string,
    price:number,
    image:ImageSourcePropType,
    quantity:number,
}

declare interface FoodDetailItem {
    id:number|string,
    name:string,
    price:number,
    image:ImageSourcePropType,
    description:string,
    discount:number,
    rating:number,
    category:string,
    isFavorite?:boolean,
    nutrition:Nutritions[],
    foodType?:FoodType[],
    reviews?:Review[],
    addittionalToppings?:AdditionalTopping[],
    sideDishes?:AdditionalTopping[],
    drink?:AdditionalTopping[],
}

declare interface Review {
    id:number|string,
    name:string,
    rating:number,
    comment:string,
    date:Date,
    image:ImageSourcePropType,
}

declare interface AdditionalTopping {
    id:number|string,
    name:string,
    price:number,
    discount?:number,
    image:ImageSourcePropType,
    rating?:number,
    category:string,
}

interface Nutritions {
    id:number|string,
    name:string,
    value:number,
    unit:string,
}

interface FoodType {
    id:number|string,
    name:string,
    description:string,
}

