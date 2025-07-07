# Styling Rules & Image Importation System

This document outlines the styling rules and image importation system for the food delivery app.

## 🎨 Styling Rules

### 1. Use NativeWind/Tailwind for Styling
- **Primary Rule**: Use NativeWind/Tailwind classes for all styling unless using `useAnimatedStyle` hook
- **Benefits**: 
  - Consistent design system
  - Faster development
  - Better maintainability
  - Responsive design out of the box

### 2. When to Use StyleSheet
- **Only use StyleSheet when**:
  - Using `useAnimatedStyle` hook from react-native-reanimated
  - Complex animations that require style objects
  - Platform-specific styles that can't be achieved with Tailwind

### 3. NativeWind Class Examples

#### Layout
```tsx
// Container
<View className="flex-1 bg-white">

// Flexbox
<View className="flex-row items-center justify-between">

// Spacing
<View className="p-4 m-2">
<View className="px-6 py-3">
<View className="mb-4 mt-2">
```

#### Typography
```tsx
// Text sizes
<Text className="text-sm">Small text</Text>
<Text className="text-base">Base text</Text>
<Text className="text-lg">Large text</Text>
<Text className="text-xl">Extra large text</Text>
<Text className="text-2xl">2xl text</Text>
<Text className="text-3xl">3xl text</Text>

// Font weights
<Text className="font-normal">Normal</Text>
<Text className="font-medium">Medium</Text>
<Text className="font-semibold">Semibold</Text>
<Text className="font-bold">Bold</Text>

// Colors
<Text className="text-gray-500">Gray text</Text>
<Text className="text-blue-500">Blue text</Text>
<Text className="text-white">White text</Text>
```

#### Input Fields
```tsx
<TextInput 
  className="border border-gray-300 rounded-xl px-4 py-3.5 text-base bg-gray-50"
  placeholder="Enter your email"
/>
```

#### Buttons
```tsx
<TouchableOpacity className="bg-blue-500 rounded-xl py-4 px-6">
  <Text className="text-white text-base font-semibold text-center">
    Sign In
  </Text>
</TouchableOpacity>
```

## 🖼️ Image Importation System

### 1. TypeScript Image Types (`types/images.ts`)

```typescript
export interface ImageAssets {
  // App icons
  adaptiveIcon: any;
  favicon: any;
  icon: any;
  splashIcon: any;
  
  // React logos
  partialReactLogo: any;
  reactLogo: any;
  reactLogo2x: any;
  reactLogo3x: any;
  
  // Food delivery images
  foodBackground: any;
  foodHero: any;
  foodPlaceholder: any;
}
```

### 2. Image Assets Mapping

```typescript
export const images: ImageAssets = {
  // App icons
  adaptiveIcon: require('../assets/images/adaptive-icon.png'),
  favicon: require('../assets/images/favicon.png'),
  icon: require('../assets/images/icon.png'),
  splashIcon: require('../assets/images/splash-icon.png'),
  
  // Food delivery images
  foodBackground: require('../assets/images/icon.png'), // Replace with actual food image
  foodHero: require('../assets/images/icon.png'), // Replace with actual food image
  foodPlaceholder: require('../assets/images/icon.png'), // Replace with actual food image
};
```

### 3. Usage in Components

```tsx
import { getImage } from '../types/images';

// In your component
<Image
  source={getImage('foodBackground')}
  className="w-full h-full"
  contentFit="cover"
  placeholder="Loading..."
/>
```

### 4. Adding New Images

1. **Add the image to `assets/images/`**
2. **Update the interface in `types/images.ts`**:
   ```typescript
   export interface ImageAssets {
     // ... existing images
     newImage: any;
   }
   ```
3. **Add to the mapping**:
   ```typescript
   export const images: ImageAssets = {
     // ... existing images
     newImage: require('../assets/images/new-image.png'),
   };
   ```
4. **Use in components**:
   ```tsx
   source={getImage('newImage')}
   ```

## 🔧 Benefits of This System

### Image Importation Benefits
- **Type Safety**: TypeScript ensures you only use valid image keys
- **Performance**: Images are pre-loaded and cached
- **Maintainability**: Centralized image management
- **Error Prevention**: Compile-time checking for missing images
- **IntelliSense**: Auto-completion for image names

### NativeWind Benefits
- **Consistency**: Unified design system
- **Speed**: Faster development with utility classes
- **Responsive**: Built-in responsive design
- **Maintainable**: Easy to update design system
- **Performance**: Optimized CSS-in-JS solution

## 📝 Best Practices

### 1. Image Naming
- Use descriptive names: `foodBackground`, `userAvatar`, `restaurantLogo`
- Follow camelCase convention
- Group related images together in the interface

### 2. Styling Organization
- Use semantic class names
- Group related styles together
- Use Tailwind's responsive prefixes when needed
- Keep components focused and reusable

### 3. Performance
- Use appropriate image formats (PNG for icons, JPEG for photos)
- Optimize image sizes for mobile
- Use `expo-image` for better performance
- Implement proper loading states

## 🚀 Migration Guide

### From StyleSheet to NativeWind

**Before:**
```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
});

<View style={styles.container}>
  <Text style={styles.title}>Title</Text>
</View>
```

**After:**
```tsx
<View className="flex-1 bg-white p-4">
  <Text className="text-2xl font-bold text-gray-800 mb-4">Title</Text>
</View>
```

### From require() to getImage()

**Before:**
```tsx
<Image source={require('../assets/images/food-bg.jpg')} />
```

**After:**
```tsx
<Image source={getImage('foodBackground')} />
```

## 📚 Resources

- [NativeWind Documentation](https://www.nativewind.dev/)
- [Tailwind CSS Classes](https://tailwindcss.com/docs)
- [Expo Image Documentation](https://docs.expo.dev/versions/latest/sdk/image/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) 