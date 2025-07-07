# Image Assets Guide

This guide provides a comprehensive overview of all available images in the food delivery app and how to use them.

## 📁 Available Images

### 🏢 App Icons & Branding
- `adaptiveIcon` - App adaptive icon
- `favicon` - App favicon
- `icon` - App icon
- `splashIcon` - Splash screen icon
- `logo` - App logo

### ⚛️ React Logos
- `partialReactLogo` - Partial React logo
- `reactLogo` - React logo
- `reactLogo2x` - React logo 2x
- `reactLogo3x` - React logo 3x

### 🔐 Authentication & UI
- `loginGraphic` - Login page background graphic (1.3MB)
- `emptyState` - Empty state illustration
- `success` - Success state icon
- `avatar` - Default user avatar

### 🍔 Main Dishes
- `burgerOne` - First burger image (259KB)
- `burgerTwo` - Second burger image (177KB)
- `buritto` - Burrito image (158KB)
- `pizzaOne` - Pizza image (361KB)

### 🥬 Ingredients
- `avocado` - Avocado ingredient
- `bacon` - Bacon ingredient
- `cheese` - Cheese ingredient
- `coleslaw` - Coleslaw ingredient
- `cucumber` - Cucumber ingredient
- `fries` - French fries
- `mozarellaSticks` - Mozzarella sticks
- `mushrooms` - Mushrooms
- `onionRings` - Onion rings
- `onions` - Onions
- `salad` - Salad
- `tomatoes` - Tomatoes

## 🚀 Usage Examples

### Basic Image Usage
```tsx
import { getImage } from '../constants/images';

// Single image
<Image
  source={getImage('burgerOne')}
  className="w-full h-48"
  contentFit="cover"
/>
```

### Using Helper Functions
```tsx
import { getFoodImages, getUIImages } from '../constants/images';

// Get all food images by category
const foodImages = getFoodImages();
const { burgers, pizza, mexican, ingredients } = foodImages;

// Get UI images
const uiImages = getUIImages();
const { logo, avatar, emptyState } = uiImages;
```

### Authentication Layout
```tsx
// Using login graphic for auth pages
<Image
  source={getImage('loginGraphic')}
  className="w-full h-full"
  contentFit="cover"
  placeholder="Loading..."
/>
```

### Food Menu Items
```tsx
// Burger menu item
<View className="flex-row items-center">
  <Image
    source={getImage('burgerOne')}
    className="w-16 h-16 rounded-lg"
    contentFit="cover"
  />
  <Text className="ml-3 text-lg font-semibold">Classic Burger</Text>
</View>
```

### Ingredient Selection
```tsx
// Ingredient picker
const ingredients = getFoodImages().ingredients;

{ingredients.map((ingredient, index) => (
  <TouchableOpacity key={index} className="m-2">
    <Image
      source={ingredient}
      className="w-12 h-12 rounded-full"
      contentFit="cover"
    />
  </TouchableOpacity>
))}
```

## 🎨 Image Categories

### Food Categories
```typescript
const foodImages = getFoodImages();

// Burgers
foodImages.burgers // [burgerOne, burgerTwo]

// Pizza
foodImages.pizza // [pizzaOne]

// Mexican
foodImages.mexican // [buritto]

// All ingredients
foodImages.ingredients // [avocado, bacon, cheese, ...]
```

### UI Categories
```typescript
const uiImages = getUIImages();

// Branding
uiImages.logo // App logo

// User interface
uiImages.avatar // Default avatar
uiImages.emptyState // Empty state illustration
uiImages.success // Success icon
uiImages.loginGraphic // Login background
```

## 📏 Image Sizes & Performance

### Large Images (>100KB)
- `loginGraphic` (1.3MB) - Use for backgrounds, preload for better UX
- `pizzaOne` (361KB) - High-quality pizza image
- `burgerOne` (259KB) - High-quality burger image
- `burgerTwo` (177KB) - Second burger option
- `buritto` (158KB) - Mexican food option

### Medium Images (20-100KB)
- `logo` (111KB) - App branding
- `emptyState` (75KB) - UI illustration
- `avatar` (50KB) - User profile
- Most ingredient images (20-30KB each)

### Small Images (<20KB)
- App icons and React logos
- Success icon
- Favicon

## 🔧 Best Practices

### 1. Image Loading
```tsx
// Always provide placeholder
<Image
  source={getImage('burgerOne')}
  placeholder="Loading..."
  contentFit="cover"
/>
```

### 2. Performance Optimization
```tsx
// Use appropriate contentFit
<Image
  source={getImage('logo')}
  contentFit="contain" // For logos
/>

<Image
  source={getImage('burgerOne')}
  contentFit="cover" // For food images
/>
```

### 3. Responsive Design
```tsx
// Use Tailwind classes for responsive sizing
<Image
  source={getImage('pizzaOne')}
  className="w-full h-48 md:h-64 lg:h-80"
  contentFit="cover"
/>
```

### 4. Error Handling
```tsx
// Provide fallback images
<Image
  source={getImage('burgerOne')}
  onError={() => console.log('Failed to load burger image')}
  fallback={getImage('foodPlaceholder')}
/>
```

## 🆕 Adding New Images

### 1. Add Image File
Place your image in `assets/images/` folder

### 2. Update Interface
Add to `ImageAssets` interface in `constants/images.ts`:
```typescript
export interface ImageAssets {
  // ... existing images
  newImage: any;
}
```

### 3. Add to Mapping
Add to the `images` object:
```typescript
export const images: ImageAssets = {
  // ... existing images
  newImage: require('../assets/images/new-image.png'),
};
```

### 4. Use in Components
```tsx
<Image source={getImage('newImage')} />
```

## 🎯 Common Use Cases

### Restaurant Menu
```tsx
const menuItems = [
  { name: 'Classic Burger', image: 'burgerOne' },
  { name: 'Deluxe Burger', image: 'burgerTwo' },
  { name: 'Margherita Pizza', image: 'pizzaOne' },
  { name: 'Chicken Burrito', image: 'buritto' },
];

{menuItems.map((item) => (
  <View key={item.name} className="mb-4">
    <Image
      source={getImage(item.image as ImageKey)}
      className="w-full h-32 rounded-lg"
      contentFit="cover"
    />
    <Text className="mt-2 text-lg font-semibold">{item.name}</Text>
  </View>
))}
```

### Ingredient Selection
```tsx
const ingredients = getFoodImages().ingredients;

<View className="flex-row flex-wrap">
  {ingredients.map((ingredient, index) => (
    <TouchableOpacity key={index} className="m-1">
      <Image
        source={ingredient}
        className="w-16 h-16 rounded-full border-2 border-gray-200"
        contentFit="cover"
      />
    </TouchableOpacity>
  ))}
</View>
```

### User Profile
```tsx
<View className="items-center">
  <Image
    source={getImage('avatar')}
    className="w-24 h-24 rounded-full"
    contentFit="cover"
  />
  <Text className="mt-2 text-lg font-semibold">User Name</Text>
</View>
```

This comprehensive image system provides type safety, performance optimization, and easy maintenance for all your food delivery app's visual assets! 🚀 