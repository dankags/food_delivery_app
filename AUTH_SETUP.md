# Authentication Layout Setup

This document describes the authentication layout structure for the food delivery app.

## Structure Overview

The authentication pages use a shared layout with:
- **Top Section (1/4 screen)**: Background image with overlay text
- **Bottom Section (3/4 screen)**: Bottom sheet containing the form

## Files Created/Modified

### 1. Layout Structure
- `app/(pages)/auth/(userAuth)/_layout.tsx` - Stack navigation configuration
- `components/AuthLayout.tsx` - Shared layout component with image and bottom sheet

### 2. Authentication Pages
- `app/(pages)/auth/(userAuth)/sign-in.tsx` - Sign in form
- `app/(pages)/auth/(userAuth)/sign-Up.tsx` - Sign up form
- `app/(pages)/auth/success.tsx` - Success page after authentication

## Features

### AuthLayout Component
- **Responsive Design**: Image takes 1/4 of screen, bottom sheet takes 3/4
- **Bottom Sheet**: Uses @gorhom/bottom-sheet with 75% snap point
- **Image Overlay**: Semi-transparent overlay with title and subtitle
- **Customizable**: Accepts title, subtitle, and children props

### Sign In Page
- Email and password fields
- Forgot password link
- Navigation to sign up page
- Form validation
- Loading states

### Sign Up Page
- Full name, email, phone, password, and confirm password fields
- Password validation (minimum 6 characters, confirmation match)
- Terms of service and privacy policy links
- Navigation to sign in page
- Loading states

## Dependencies

The following dependencies are required:
- `@gorhom/bottom-sheet` - For the bottom sheet component
- `react-native-gesture-handler` - For gesture handling
- `react-native-reanimated` - For animations
- `expo-image` - For optimized image loading

## Usage

### Using AuthLayout
```tsx
import AuthLayout from '../../../../components/AuthLayout';

<AuthLayout
  title="Welcome Back"
  subtitle="Sign in to your account to continue"
>
  {/* Your form content here */}
</AuthLayout>
```

### Navigation
- Sign in page: `/auth/(userAuth)/sign-in`
- Sign up page: `/auth/(userAuth)/sign-Up`
- Success page: `/auth/success`

## Customization

### Changing the Background Image
Replace the image source in `AuthLayout.tsx`:
```tsx
source={require('../assets/images/your-food-image.jpg')}
```

### Modifying Bottom Sheet Height
Change the snap points in `AuthLayout.tsx`:
```tsx
const snapPoints = useMemo(() => ['75%'], []); // Adjust percentage
```

### Styling
All styles are defined in the respective component files and can be customized as needed.

## Notes

- The bottom sheet is set to 75% of screen height by default
- The image section takes the remaining 25% of screen height
- Both pages share the same layout structure for consistency
- Form validation includes basic checks for required fields and password matching
- Loading states are implemented for better UX during authentication 