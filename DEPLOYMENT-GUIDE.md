# 🚀 Deployment Readiness Guide - Move to Fit

## Step 1: Performance Optimization ⚡

### 1.1 Image Optimization
- [x] Images optimized to web-friendly sizes (max 1920px, 85% quality)
- [ ] Consider converting to WebP format for better compression
  ```bash
  # Install sharp for WebP conversion
  npm install sharp
  
  # Convert images (run this script)
  for img in public/images/*.jpg; do
    magick "$img" -quality 85 "${img%.jpg}.webp"
  done
  ```

### 1.2 Build Optimization
- [ ] Run production build and check bundle size
  ```bash
  npm run build
  npm run preview  # Test the production build locally
  ```
- [ ] Analyze bundle size (if needed)
  ```bash
  npm install --save-dev rollup-plugin-visualizer
  ```

### 1.3 Performance Checklist
- [x] Lazy loading for images (browser native)
- [x] Optimized animations (GSAP with scrub)
- [x] Minimal JavaScript bundle
- [ ] Add meta tags for SEO (see Step 2)

---

## Step 2: SEO & Meta Tags 🔍

### 2.1 Update `index.html` with proper meta tags

Add these to the `<head>` section of `index.html`:

```html
<!-- Primary Meta Tags -->
<title>Move to Fit - Personal Coaching & Groepslessen</title>
<meta name="title" content="Move to Fit - Personal Coaching & Groepslessen">
<meta name="description" content="Move to Fit biedt sportcoaching op maat, groepslessen en begeleiding voor bedrijven. Van stilzitten naar stralen met Coach Fara.">
<meta name="keywords" content="personal training, sportcoaching, groepslessen, fitness, bedrijfsfitness, Fara, Move to Fit">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://movetofit.be/">
<meta property="og:title" content="Move to Fit - Personal Coaching & Groepslessen">
<meta property="og:description" content="Coaching die écht bij je past. Van stilzitten naar stralen.">
<meta property="og:image" content="https://movetofit.be/images/hero_stretch.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://movetofit.be/">
<meta property="twitter:title" content="Move to Fit - Personal Coaching & Groepslessen">
<meta property="twitter:description" content="Coaching die écht bij je past. Van stilzitten naar stralen.">
<meta property="twitter:image" content="https://movetofit.be/images/hero_stretch.jpg">

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

### 2.2 Create a `robots.txt`

Create `public/robots.txt`:
```txt
User-agent: *
Allow: /

Sitemap: https://movetofit.be/sitemap.xml
```

### 2.3 Create a `sitemap.xml`

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://movetofit.be/</loc>
    <lastmod>2026-02-22</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 2.4 Add Structured Data (JSON-LD)

Add to `index.html` before closing `</head>`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Move to Fit",
  "description": "Personal coaching, groepslessen en bedrijfsfitness",
  "url": "https://movetofit.be",
  "telephone": "+32471052609",
  "email": "info@movetofit.be",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BE"
  },
  "priceRange": "$$",
  "image": "https://movetofit.be/images/hero_stretch.jpg"
}
</script>
```

---

## Step 3: Deployment Setup 🌐

### 3.1 Choose Your Hosting Platform

#### Option A: Netlify (Recommended - Easy & Free)
1. Push code to GitHub
2. Connect to Netlify: https://app.netlify.com/
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add custom domain: `movetofit.be`
5. Enable HTTPS (automatic)

#### Option B: Vercel
1. Push code to GitHub
2. Import project: https://vercel.com/new
3. Build settings auto-detected
4. Add custom domain

#### Option C: Traditional Hosting (cPanel/FTP)
1. Run `npm run build`
2. Upload contents of `dist/` folder to server
3. Configure domain to point to uploaded files

### 3.2 Environment Variables (if needed)
Create `.env.production`:
```env
VITE_FORMSPREE_ID=xgooapgw
```

Update ContactSection to use:
```typescript
const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_ID 
  ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
  : 'https://formspree.io/f/xgooapgw';
```

### 3.3 Domain Configuration

#### DNS Settings for `movetofit.be`:
```
Type    Name    Value                   TTL
A       @       [Your hosting IP]       3600
CNAME   www     movetofit.be            3600
```

For Netlify/Vercel, follow their DNS instructions.

### 3.4 SSL Certificate
- Netlify/Vercel: Automatic (Let's Encrypt)
- Traditional hosting: Enable in cPanel or contact provider

### 3.5 Pre-Deployment Checklist
- [ ] Test all forms (contact form submits to Formspree)
- [ ] Test all navigation links
- [ ] Test on mobile devices
- [ ] Test in different browsers (Chrome, Firefox, Safari)
- [ ] Check all images load correctly
- [ ] Verify phone number and email are correct
- [ ] Test smooth scrolling on all sections
- [ ] Verify color scheme looks good on all sections

### 3.6 Post-Deployment Checklist
- [ ] Test live site on mobile
- [ ] Submit to Google Search Console
- [ ] Set up Google Analytics (optional)
- [ ] Test contact form on live site
- [ ] Check page load speed: https://pagespeed.web.dev/
- [ ] Verify SSL certificate is active (https://)
- [ ] Test all social media preview cards

---

## Quick Deploy Commands

### Build for production:
```bash
npm run build
```

### Preview production build locally:
```bash
npm run preview
```

### Check for TypeScript errors:
```bash
npm run build
```

---

## Performance Targets 🎯

- Lighthouse Performance Score: > 90
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Bundle Size: < 500KB

---

## Support & Maintenance

### Regular Updates:
- Update images seasonally
- Keep contact information current
- Update qualifications/certifications
- Refresh testimonials (if added)

### Monitoring:
- Check Formspree submissions regularly
- Monitor site uptime
- Review analytics monthly

---

## Need Help?

Common issues and solutions:

**Images not loading:**
- Check file paths are correct
- Verify images are in `public/images/`
- Check file extensions match (case-sensitive)

**Form not submitting:**
- Verify Formspree endpoint is correct
- Check browser console for errors
- Test with different email addresses

**Slow loading:**
- Run `npm run build` to optimize
- Check image file sizes
- Consider WebP conversion

---

## 🎉 Ready to Deploy!

Once you've completed all three steps, your site is ready for production!

**Final command:**
```bash
npm run build && npm run preview
```

If everything looks good in preview, deploy to your chosen platform! 🚀
