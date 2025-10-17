# 🚀 Deployment Checklist for BoldFrame Studios

## Pre-Deployment Steps

### ✅ 1. Environment Variables Setup

**For Production Deployment:**

If deploying to **Vercel, Netlify, or similar platforms**, add these environment variables in your hosting dashboard:

```
VITE_EMAILJS_PUBLIC_KEY=NwMPwoO6mOuR1IeSD
VITE_EMAILJS_SERVICE_ID=service_7ys7xff
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_hl5a33o
VITE_EMAILJS_CLIENT_TEMPLATE_ID=template_tgqw9ag
```

**Platform-Specific Instructions:**

#### Vercel
1. Go to Project Settings → Environment Variables
2. Add each variable with the values above
3. Make sure they're available for "Production" environment

#### Netlify
1. Go to Site Settings → Build & Deploy → Environment
2. Add each variable with the values above

#### Other Platforms
- Consult your hosting provider's documentation for adding environment variables

### ✅ 2. EmailJS Templates Configuration

**IMPORTANT**: Your EmailJS templates must be configured with the correct variables. Refer to `EMAILJS_TEMPLATE_SETUP.md` for detailed instructions.

Quick checklist:
- [ ] Admin Template (`template_hl5a33o`) has "To Email" set to `{{to_email}}`
- [ ] Client Template (`template_tgqw9ag`) has "To Email" set to `{{to_email}}`
- [ ] All template variables are correctly mapped
- [ ] Test emails sent successfully from EmailJS dashboard

### ✅ 3. Security Verification

- [ ] `.env` file is in `.gitignore`
- [ ] No sensitive credentials in source code
- [ ] All environment variables use `import.meta.env?.VARIABLE_NAME` with fallbacks
- [ ] EmailJS public key is safe to expose (it's meant to be public)

### ✅ 4. Performance Check

- [ ] Run `npm run build` to ensure no build errors
- [ ] Test the production build locally with `npm run preview`
- [ ] Check bundle size (should be <500KB initial)
- [ ] Verify lazy loading is working (check Network tab)

### ✅ 5. Browser Testing

Test on:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (if available)
- [ ] Mobile browsers (Chrome, Safari)

### ✅ 6. Accessibility Check

- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Screen reader friendly (test with NVDA/VoiceOver)
- [ ] Reduced motion respected

## Deployment Process

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
```

Or use the Vercel dashboard:
1. Import your Git repository
2. Add environment variables
3. Deploy

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

Or use drag-and-drop:
1. Build locally: `npm run build`
2. Drag `dist` folder to Netlify
3. Add environment variables in settings

### Option 3: Custom Server

```bash
# Build
npm run build

# The dist folder contains your production files
# Upload to your server
```

## Post-Deployment Verification

### ✅ Test Contact Form

1. Visit your deployed site
2. Click "Start a Project" or the floating contact button
3. Fill out and submit the form
4. Verify:
   - [ ] Admin email received at `nikhilwebworks@gmail.com`
   - [ ] Client auto-reply received
   - [ ] Success message shown
   - [ ] No console errors

### ✅ Performance Testing

1. Run Lighthouse audit
   - Target: Performance 90+, Accessibility 95+
2. Check Core Web Vitals
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1

### ✅ Functionality Check

- [ ] All sections load correctly
- [ ] Animations are smooth (60 FPS)
- [ ] Custom cursor works on desktop
- [ ] Mobile responsive (test on actual device)
- [ ] Back to top button appears on scroll
- [ ] Services carousel scrolls smoothly
- [ ] Portfolio items clickable
- [ ] Footer links work
- [ ] Social media links correct

## Troubleshooting

### Contact Form Not Working

**Issue**: "recipients address is empty" error

**Solution**: 
1. Check EmailJS templates have `{{to_email}}` in "To Email" field
2. Verify environment variables are set correctly
3. Check `EMAILJS_TEMPLATE_SETUP.md` for detailed instructions

### Performance Issues

**Issue**: Animations are laggy

**Solution**:
1. Check browser DevTools Performance tab
2. Ensure GPU acceleration is enabled
3. Reduce simultaneous animations if needed
4. Verify `prefers-reduced-motion` is working

### Build Errors

**Issue**: Build fails with module errors

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Monitoring

After deployment, monitor:

1. **Analytics**
   - Add Google Analytics or similar
   - Track contact form submissions

2. **Error Tracking**
   - Consider Sentry for error monitoring
   - Monitor EmailJS dashboard for failed sends

3. **Performance**
   - Use Web Vitals monitoring
   - Check server response times

## Maintenance

### Regular Updates

- [ ] Update dependencies monthly
- [ ] Test contact form monthly
- [ ] Review EmailJS quota usage
- [ ] Monitor performance metrics

### Content Updates

To update:
- Portfolio items: Edit `components/Work.tsx`
- Services: Edit `components/ServicesCarousel.tsx`
- About info: Edit `components/About.tsx`
- Footer links: Edit `components/Footer.tsx`

## Support

If issues persist:
1. Check the console for errors
2. Review `SECURITY_AND_PERFORMANCE.md`
3. Verify `EMAILJS_TEMPLATE_SETUP.md` steps
4. Contact EmailJS support for email-specific issues

---

**Last Updated**: October 2025
**Version**: 1.0.0
