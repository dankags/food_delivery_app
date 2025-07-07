# Custom Fonts Guide - Quicksand Family

This guide explains how to use the custom Quicksand fonts in your food delivery app.

## 🎨 Font Family Overview

The app uses the **Quicksand** font family with 5 different weights:

- **Light** (`Quicksand-Light`) - 300 weight
- **Regular** (`Quicksand-Regular`) - 400 weight  
- **Medium** (`Quicksand-Medium`) - 500 weight
- **SemiBold** (`Quicksand-SemiBold`) - 600 weight
- **Bold** (`Quicksand-Bold`) - 700 weight

## 📁 File Structure

```
assets/
└── fonts/
    ├── Quicksand-Light.ttf
    ├── Quicksand-Regular.ttf
    ├── Quicksand-Medium.ttf
    ├── Quicksand-SemiBold.ttf
    └── Quicksand-Bold.ttf

constants/
└── fonts.ts (Font configuration)

components/
└── CustomText.tsx (Custom Text component)
```

## 🚀 Usage Methods

### Method 1: Using CustomText Component (Recommended)

```tsx
import CustomText, { 
  Heading1, 
  Heading2, 
  Heading3, 
  BodyText, 
  CaptionText, 
  ButtonText 
} from '../components/CustomText';

// Basic usage
<CustomText weight="bold" size="2xl">
  Welcome to Food Delivery
</CustomText>

// Predefined components
<Heading1>Main Title</Heading1>
<Heading2>Section Title</Heading2>
<Heading3>Subsection Title</Heading3>
<BodyText>Regular body text content</BodyText>
<CaptionText>Small caption text</CaptionText>
<ButtonText>Button Label</ButtonText>
```

### Method 2: Using NativeWind Classes

```tsx
// Font families
<Text className="font-quicksand-light">Light text</Text>
<Text className="font-quicksand-regular">Regular text</Text>
<Text className="font-quicksand-medium">Medium text</Text>
<Text className="font-quicksand-semibold">SemiBold text</Text>
<Text className="font-quicksand-bold">Bold text</Text>

// Combined with other styles
<Text className="font-quicksand-bold text-2xl text-blue-500">
  Bold Blue Title
</Text>
```

### Method 3: Using Font Constants

```tsx
import { getFont, fontWeights } from '../constants/fonts';

// Direct font family usage
<Text style={{ fontFamily: getFont('bold'), fontSize: 24 }}>
  Bold Title
</Text>

// Using font weights object
<Text style={{ fontFamily: fontWeights.semiBold, fontSize: 18 }}>
  SemiBold Text
</Text>
```

## 📏 Font Sizes

The font system includes predefined sizes:

```tsx
// Available sizes
xs: 12px    // Extra small
sm: 14px    // Small
base: 16px  // Base (default)
lg: 18px    // Large
xl: 20px    // Extra large
2xl: 24px   // 2X large
3xl: 30px   // 3X large
4xl: 36px   // 4X large
5xl: 48px   // 5X large
```

## 🎯 Common Use Cases

### Headings
```tsx
// Main page title
<Heading1>Food Delivery App</Heading1>

// Section headers
<Heading2>Popular Restaurants</Heading2>

// Subsection titles
<Heading3>Menu Items</Heading3>
```

### Body Text
```tsx
// Regular content
<BodyText>
  Discover the best restaurants in your area and order delicious food with just a few taps.
</BodyText>

// Light caption text
<CaptionText>Free delivery on orders over $20</CaptionText>
```

### Buttons
```tsx
<TouchableOpacity className="bg-blue-500 rounded-lg px-6 py-3">
  <ButtonText className="text-white text-center">
    Order Now
  </ButtonText>
</TouchableOpacity>
```

### Form Labels
```tsx
<CustomText weight="medium" size="base" className="text-gray-700 mb-2">
  Email Address
</CustomText>
```

## 🔧 Configuration Files

### constants/fonts.ts
```typescript
export const fonts = {
  quicksand: {
    light: 'Quicksand-Light',
    regular: 'Quicksand-Regular',
    medium: 'Quicksand-Medium',
    semiBold: 'Quicksand-SemiBold',
    bold: 'Quicksand-Bold',
  },
};

export const getFont = (weight: FontWeight) => {
  return fontWeights[weight];
};
```

### tailwind.config.js
```javascript
theme: {
  extend: {
    fontFamily: {
      'quicksand-light': ['Quicksand-Light'],
      'quicksand-regular': ['Quicksand-Regular'],
      'quicksand-medium': ['Quicksand-Medium'],
      'quicksand-semibold': ['Quicksand-SemiBold'],
      'quicksand-bold': ['Quicksand-Bold'],
    },
  },
},
```

### app.json
```json
{
  "fonts": [
    {
      "asset": "./assets/fonts/Quicksand-Light.ttf",
      "family": "Quicksand-Light"
    },
    {
      "asset": "./assets/fonts/Quicksand-Regular.ttf",
      "family": "Quicksand-Regular"
    }
    // ... other fonts
  ]
}
```

## 🎨 Design System Integration

### Typography Scale
```tsx
// Headings
<Heading1>H1 - 36px Bold</Heading1>
<Heading2>H2 - 30px SemiBold</Heading2>
<Heading3>H3 - 24px SemiBold</Heading3>

// Body
<BodyText>Body - 16px Regular</BodyText>
<CaptionText>Caption - 14px Light</CaptionText>

// Buttons
<ButtonText>Button - 16px SemiBold</ButtonText>
```

### Color Integration
```tsx
// Combine with colors
<Heading1 className="text-gray-900">Dark Title</Heading1>
<BodyText className="text-gray-600">Gray Body Text</BodyText>
<ButtonText className="text-white">White Button Text</ButtonText>
```

## 🚀 Best Practices

### 1. Use Predefined Components
```tsx
// ✅ Good
<Heading1>Title</Heading1>
<BodyText>Content</BodyText>

// ❌ Avoid
<Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 36 }}>Title</Text>
```

### 2. Consistent Weight Usage
```tsx
// Headings: Bold or SemiBold
<Heading1>Main Title</Heading1>
<Heading2>Section Title</Heading2>

// Body: Regular or Medium
<BodyText>Regular content</BodyText>
<CustomText weight="medium">Emphasized content</CustomText>

// Captions: Light
<CaptionText>Small text</CaptionText>
```

### 3. Responsive Typography
```tsx
// Use Tailwind responsive classes
<Heading1 className="text-2xl md:text-3xl lg:text-4xl">
  Responsive Title
</Heading1>
```

### 4. Accessibility
```tsx
// Ensure proper contrast
<BodyText className="text-gray-900">High contrast text</BodyText>
<CaptionText className="text-gray-600">Medium contrast text</CaptionText>
```

## 🔄 Migration Guide

### From System Fonts
```tsx
// Before
<Text style={{ fontWeight: 'bold', fontSize: 24 }}>Title</Text>

// After
<Heading3>Title</Heading3>
```

### From Custom Styles
```tsx
// Before
<Text style={{ fontFamily: 'Arial', fontSize: 16 }}>Content</Text>

// After
<BodyText>Content</BodyText>
```

## 📱 Platform Considerations

### iOS
- Fonts are automatically loaded and cached
- No additional configuration needed

### Android
- Fonts are bundled with the app
- Consistent rendering across devices

### Web
- Fonts are loaded via CSS
- Fallback fonts are automatically handled

The Quicksand font family provides a modern, clean, and highly readable typography system perfect for your food delivery app! 🎉 