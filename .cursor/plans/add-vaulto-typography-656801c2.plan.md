<!-- 656801c2-cc14-41e8-a607-344b5abe4e21 06c4ea5f-c613-40b7-864f-febc5464fef6 -->
# Add Typography Above Swap Box

## Changes to `/Users/charliebc/Vaulto-Swap/app/page.tsx`

Add typography above the `CowSwapWidgetWrapper` component (around line 172):

1. **Add "Vaulto" heading**: Bold text with gold gradient styling matching the existing design system
2. **Add "Trade anywhere anytime" subheading**: Minimal white text underneath

The typography will be inserted between the section tag (line 170) and the swap widget (line 172), with:

- "Vaulto" styled with: `font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600`
- "Trade anywhere anytime" styled with: `text-white` in a minimal, clean design
- Proper spacing and centering to maintain layout harmony

This maintains consistency with the existing "Private Markets, Public Access" section styling while keeping the typography clean and prominent.