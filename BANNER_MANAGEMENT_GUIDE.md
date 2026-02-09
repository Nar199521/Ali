# Home Page Banner Management Guide

This guide explains how to use the new banner management system for your AliaxPress website.

## Overview

The banner management system allows admins to:
1. **Add Home Page Banners** - Large promotional banners displayed at the top of the homepage
2. **Add Viva Section Banners** - Special banners for the Viva/Fashion/Lifestyle section
3. **Delete Banners** - Remove banners that are no longer needed
4. **Customize Appearance** - Set titles, subtitles, images, buttons, and colors

## Database Schema

Two new tables have been added to your database:

### `home_banners` table
```sql
- id: Banner ID (auto-increment)
- title: Banner title (required)
- image_url: Image URL (required) - Best size: 1200x400px
- subtitle: Optional subtitle text
- button_text: Optional button label (e.g., "Shop Now")
- button_link: Optional button URL (e.g., /products or https://...)
- background_color: Optional hex color (e.g., #ff0000)
- is_active: Boolean flag for active/inactive status
- created_at: Timestamp
- updated_at: Auto-update timestamp
```

### `viva_banners` table
```sql
- Same structure as home_banners
```

## How to Setup

### Step 1: Import Schema
Run the updated `schema.sql` on your CloudPanel database:
```bash
mysql -u aliaxpressdb -p Mydb < schema.sql
```

### Step 2: Access Admin Dashboard
Navigate to your admin dashboard at:
```
https://yourdomain.com/admin/homepage
```

## How to Use

### Adding a Home Page Banner

1. Go to **Admin Dashboard** → **Admin Menu** → **Homepage** → **Manage Homepage**
2. Scroll to **"Add New Home Page Banner"** section
3. Fill in the form:
   - **Title** * (required) - Main banner text (e.g., "Amazing Sale")
   - **Image URL** * (required) - URL to the banner image
     - Recommended size: 1200x400px
     - Can use Cloudinary URLs: `https://res.cloudinary.com/...`
   - **Subtitle** (optional) - Additional text
   - **Button Text** (optional) - Button label (e.g., "Shop Now")
   - **Button Link** (optional) - Where button leads to
   - **Background Color** (optional) - Color picker or hex value
4. Click **"Create Banner"**
5. The banner will appear on the homepage within seconds

### Adding a Viva Section Banner

1. On the homepage admin page, scroll to **"Add New Viva Section Banner"** section
2. Follow the same steps as above
3. Viva banner images are displayed on the right side of the banner
4. Recommended image size: 400x400px

### Deleting a Banner

1. Scroll to **"Existing [Banner Type]s"** section
2. Find the banner you want to delete
3. Click the **"Delete"** button
4. Confirm the deletion
5. The banner will be removed from the website immediately

## Image Recommendations

### For Home Page Banners:
- **Size**: 1200x400px (or 1400x400px)
- **Format**: JPG, PNG
- **Content**: Background image with promotional content
- **Example**: Product showcase with gradient overlay

### For Viva Section Banners:
- **Size**: 400x400px
- **Format**: PNG with transparency (recommended)
- **Content**: Fashion model or lifestyle product image
- **Example**: Fashion model, home decor items

## Image Upload Sources

You can host images on:
1. **Cloudinary** - Recommended for best performance
   - Create account at cloudinary.com
   - Upload images and copy public URL
   
2. **Your Website** - Upload to public folder
   - Place images in `/public/images/banners/`
   - URL format: `https://yourdomain.com/images/banners/filename.jpg`

3. **External CDN** - Any public image URL
   - Ensure the domain allows CORS

## API Endpoints

### Get Home Banners
```bash
GET /api/home-banners
```
Response:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Summer Sale",
      "image_url": "https://...",
      "subtitle": "Up to 50% off",
      "button_text": "Shop Now",
      "button_link": "/sale",
      "background_color": "#ff6b00",
      "is_active": true
    }
  ]
}
```

### Create Home Banner (Admin Only)
```bash
POST /api/home-banners
Content-Type: application/json

{
  "title": "Summer Sale",
  "image_url": "https://...",
  "subtitle": "Up to 50% off",
  "button_text": "Shop Now",
  "button_link": "/sale",
  "background_color": "#ff6b00"
}
```

### Delete Home Banner (Admin Only)
```bash
DELETE /api/home-banners/{id}
```

### Get Viva Banners
```bash
GET /api/viva-banners
```

### Create Viva Banner (Admin Only)
```bash
POST /api/viva-banners
```

### Delete Viva Banner (Admin Only)
```bash
DELETE /api/viva-banners/{id}
```

## Frontend Components

### DynamicHomeBanner
- **File**: `src/components/dynamic-home-banner.tsx`
- **Purpose**: Displays the latest home banner on the homepage
- **Used in**: `HomePageContent` component
- **Fallback**: Shows static NewYearBanner if no banners in database

### DynamicVivaBanner
- **File**: `src/components/dynamic-viva-banner.tsx`
- **Purpose**: Displays the latest viva banner with products
- **Used in**: `HomePageContent` component
- **Fallback**: Renders nothing if no banners in database

### BannerManager
- **File**: `src/components/admin/banner-manager.tsx`
- **Purpose**: Admin UI for managing banners
- **Features**: 
  - Add new banners
  - Preview images
  - View all active banners
  - Delete banners
  - Color picker for background color

## Troubleshooting

### Banner not appearing on homepage?

1. **Check if banner is in database**:
   - Go to CloudPanel phpMyAdmin
   - Check `home_banners` or `viva_banners` table
   - Verify `is_active` is set to TRUE

2. **Check image URL**:
   - Visit the image_url directly in browser
   - Verify the image loads correctly
   - Check for CORS errors in browser console

3. **Clear browser cache**:
   - Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)

4. **Check API response**:
   - Open browser DevTools → Network tab
   - Reload homepage
   - Check `/api/home-banners` and `/api/viva-banners` requests
   - Verify status 200 and data is returned

### Cannot access admin page?

1. **Verify you're logged in as admin**
   - Sign in with admin account
   - Check user role in database

2. **Check session cookie**:
   - Browser DevTools → Application → Cookies
   - Verify `session` cookie exists
   - Try logging out and logging back in

### Image not displaying?

1. **Invalid URL**: Ensure URL is accessible and complete
2. **CORS issue**: Use Cloudinary or your own domain
3. **File size**: Keep images under 5MB
4. **Format**: Use JPG or PNG

## Best Practices

1. **Image Optimization**:
   - Compress images before uploading
   - Use WebP format when possible
   - Keep file sizes under 3MB

2. **Banner Rotation**:
   - Create multiple banners for seasonal promotions
   - Delete old promotional banners
   - Keep homepage fresh with latest content

3. **Button Links**:
   - Use relative paths for internal links: `/products`, `/sale`
   - Use full URLs for external links: `https://example.com`
   - Test links before publishing

4. **Color Matching**:
   - Ensure button color contrasts with background
   - Use brand colors for consistency
   - Test on mobile devices

5. **Text Content**:
   - Keep titles short and catchy
   - Use subtitles for additional context
   - Avoid very long text that won't fit on mobile

## Examples

### Example Home Banner - Flash Sale
```
Title: "Flash Sale!"
Image: https://res.cloudinary.com/your-cloud/image/upload/flash-sale.jpg
Subtitle: "Everything on sale for 24 hours"
Button Text: "Shop Now"
Button Link: /sale
Background Color: #e63946
```

### Example Viva Banner - Fashion
```
Title: "Summer Collection 2026"
Image: https://res.cloudinary.com/your-cloud/image/upload/fashion-model.png
Subtitle: "Trending styles this season"
Button Text: "Explore Now"
Button Link: /category/fashion
Background Color: #ffb703
```

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review API endpoint responses
3. Check browser console for errors
4. Verify database tables and data
5. Contact support with screenshot of the issue
