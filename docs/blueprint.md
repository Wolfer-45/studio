# **App Name**: RedScroll

## Core Features:

- Drink Variant Selection: Allows users to select different Red Bull drink variants (e.g., Blue Edition, Yellow Edition, Red Edition). The selected variant determines the displayed content, theme color, and WebP image sequence.
- Parallax WebP Animation: Implements a parallax scrolling effect using WebP image sequences for each drink variant. The animation is tied to the page scroll, advancing frames when scrolling down and reversing when scrolling up. This will also progressively load the image sequence.
- Dynamic Content Update: Dynamically updates the displayed drink name, subtitle, description, and theme color based on the selected variant. Includes smooth transitions when switching between variants.
- Loading Experience: Displays a full-screen loading overlay with the Red Bull logo, progress bar, and percentage during initial frame loading.
- Theme Toggle: Allows users to switch between dark and light modes, with corresponding color scheme adjustments.
- Scroll Navigation: Includes a sticky navigation bar with smooth scrolling links to main sections (Product, Ingredients, Nutrition, Reviews, FAQ, Contact) and a dark/light mode toggle.

## Style Guidelines:

- Primary color: Varies depending on the selected drink edition: blue (#0066FF), yellow (#FFD700), or red (#FF0000). The theme color should match the can's primary color.
- Background color: Default dark theme background should be near-black (#121212); light theme background should be off-white (#F5F5F5).
- Accent color: Lighter versions of the selected primary theme color will be used on UI elements.
- Headline font: 'Poppins' sans-serif font for all headings for a modern, bold aesthetic.
- Body font: 'Inter' sans-serif font for all paragraphs for a clean design and easy reading.
- Minimal, monochrome social media icons in the header and footer.
- Full-screen hero section with overlay text on the left and variant navigation on the right.
- Sticky top navigation bar with a semi-transparent backdrop blur effect.
- Smooth fade/slide animations when updating text and transitioning between drink variants.