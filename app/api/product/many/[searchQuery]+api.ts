// search for products
import { NextRequest, NextResponse } from 'next/server';

// Dummy data for demonstration. Replace with your actual data source.
const products: Product[] = [
    {
        name: "Pizza Margherita",
        price: 10,
        description: "Classic pizza with tomato and cheese",
        image: "/images/pizza.jpg",
        categories: [{ name: "Italian" }],
    },
    {
        name: "Veggie Burger",
        price: 8,
        description: "Delicious vegetarian burger",
        image: "/images/burger.jpg",
        categories: [{ name: "Fast Food" }],
    },
    {
        name: "Sushi Roll",
        price: 12,
        description: "Fresh sushi roll",
        image: "/images/sushi.jpg",
        categories: [{ name: "Japanese" }],
    },
    // ... more products
];

export async function GET(
    req: NextRequest,
    { params }: { params: { searchQuery: string } }
) {
    const { searchQuery } = params;
    const url = new URL(req.url);

    // Optional query params for price and categories
    const minPrice = url.searchParams.get('minPrice');
    const maxPrice = url.searchParams.get('maxPrice');
    const categories = url.searchParams.getAll('category'); // can be multiple

    let filtered = products;

    // Filter by name (case-insensitive, partial match)
    if (searchQuery && searchQuery !== 'all') {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Filter by price range
    if (minPrice) {
        filtered = filtered.filter(product => product.price >= Number(minPrice));
    }
    if (maxPrice) {
        filtered = filtered.filter(product => product.price <= Number(maxPrice));
    }

    // Filter by categories (if any)
    if (categories.length > 0) {
        filtered = filtered.filter(product =>
            product.categories &&
            product.categories.some(cat =>
                categories.includes(cat.name)
            )
        );
    }

    return NextResponse.json({ products: filtered });
}
