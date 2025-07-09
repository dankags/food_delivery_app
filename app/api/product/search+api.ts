import { config, databases } from '@/lib/apprite.config';
import { Query } from 'react-native-appwrite';


// search for products by name, price, and category
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const name = searchParams.get('name')?.toLowerCase();
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const category = searchParams.get('category')?.toLowerCase();
 
    const queries:string[] = []

    if(!name && !minPrice && !maxPrice){
       return Response.json({
        success:false,
        message:"Please provide a search query"
       },{status:400})
    }
try{
    if(category&&category.length>0){
        queries.push(Query.equal("categories",category))
        const fetchedCategoriesWithRelatedProducts=await databases.listDocuments(
            config.databaseId!,
            config.categoriesCollectionId!,
            [...queries]
        )

        const productsByCategory: Record<string, any[]> = {};
  const categoryNames: string[] = [];

  for (const doc of fetchedCategoriesWithRelatedProducts.documents) {
    const name = doc.name.toLowerCase().trim();
    if (Array.isArray(doc.products)) {
      productsByCategory[name] = doc.products;
      categoryNames.push(name);
    }
  }

  const filter = createProductFilter({
    categories: categoryNames,
    name,
    minPrice,
    maxPrice,
    productsByCategory,
  });

  const filteredProducts = filter();
       
       return Response.json({
        products:filteredProducts
       },{status:200})
        

    }
     
        if(minPrice&&maxPrice&&name){
            queries.push(Query.between("price",minPrice,maxPrice))
            queries.push(Query.contains("name",name))
        }
        if(minPrice&&maxPrice){
            queries.push(Query.between("price",minPrice,maxPrice))
        }
        if(name){
            queries.push(Query.search("name", name))
        }
      

        

        const fetchedProducts=await databases.listDocuments(
            config.databaseId!,
            config.productsCollectionId!,
            [...queries]
        )
        if(fetchedProducts.documents.length===0){
            return Response.json({
                message:"No products found"
            },{status:404})
        }
        return Response.json({
            products:fetchedProducts.documents
        })

}catch(error){
    return Response.json({
        message:"Error fetching products"
    },{status:500})
}


    
}

// create a function to filter products by name, price, and category
function createProductFilter({categories,name,minPrice,maxPrice,productsByCategory}:{categories:string[],name?:string,minPrice?:number,maxPrice?:number,productsByCategory: Record<string, any[]>}) {
    const sortedCache: Record<string, any[]> = {};
  
    for (const cat in productsByCategory) {
      sortedCache[cat] = [...productsByCategory[cat]].sort((a, b) => a.price - b.price);
    }
  
    return  (): any[] => {
      const result: Product[] = [];
  
      const nameQuery = name?.toLowerCase().trim()??"";
  
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const products = sortedCache[category];
        if (!products || products.length === 0) continue;
  
        const start = lowerBound(products, minPrice ?? 0);
        const end = upperBound(products, maxPrice ?? Infinity);
  
        if (!nameQuery) {
          // Fast path — no name filter
          result.push(...products.slice(start, end + 1));
        } else {
          // Name filtering with slicing
          for (let j = start; j <= end; j++) {
            const p = products[j];
            if (p.name.toLowerCase().includes(nameQuery)) {
              result.push(p);
            }
          }
        }
      }
  
      return result;
    };
  }
  
  // Binary search helpers
  function lowerBound(arr: Product[], target: number): number {
    let l = 0,
      r = arr.length;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (arr[mid].price < target) l = mid + 1;
      else r = mid;
    }
    return l;
  }
  
  function upperBound(arr: Product[], target: number): number {
    let l = 0,
      r = arr.length;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (arr[mid].price <= target) l = mid + 1;
      else r = mid;
    }
    return l - 1;
  }
