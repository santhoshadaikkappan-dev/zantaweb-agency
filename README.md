# ZANTAWEB | Ultra-High-Speed Web Architecture Agency

High-performance, ultra-modern agency portfolio landing page built for **ZANTAWEB**, engineered to convert high-ticket USA B2B clients, salons, skincare brands, and e-commerce leaders away from bloated WordPress & Shopify templates.

## Tech Stack & Architecture
- **Core:** Semantic HTML5, Modular Modern CSS3 with Design Tokens
- **Interactive Engine:** Custom 60fps WebGL/Canvas Particle & Matrix Background (`js/matrix-canvas.js`)
- **Micro-Interactions:** Spotlight Card physics, interactive Tiered Volume Pricing & MOQ Control Engine, dynamic 3-Tier package calculator with live add-ons
- **Deployment:** Vercel Edge Network (`vercel.json`) with zero baseline hosting costs, automated caching, and sub-second global latency

## Live Benchmarks
- **Core Web Vitals:** 100/100
- **Global TTFB:** ~0.28s
- **LCP:** < 0.4s on mobile edge networks

## Project Structure
```
├── assets/          # Brand mockups, case study product slides, high-res visual assets
├── css/
│   └── style.css    # Cyber dark-mode theme (#06080D, #00F0FF, #10B981), Bento Grid layouts
├── js/
│   ├── app.js       # Interactive MOQ simulator, dynamic pricing engine & async brief generator
│   └── matrix-canvas.js # 60fps dynamic cyber particle matrix with cursor proximity physics
├── index.html       # Primary semantic landing page
├── vercel.json      # Production deployment configuration & security headers
└── README.md
```

## Deployment
Push directly to GitHub `main` branch. Vercel automatically deploys with zero build-step overhead.
