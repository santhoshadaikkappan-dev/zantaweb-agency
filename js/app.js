/**
 * ZANTAWEB - Agency Core Interactive Application
 * Tiered MOQ Simulator, Dynamic Pricing Engine, Spotlight Physics & Async Form Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. NAVBAR SCROLL EFFECT & MOBILE NAVIGATION
  // =========================================================================
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      const isOpen = mobileNav.classList.contains('active');
      mobileToggle.innerHTML = isOpen 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // =========================================================================
  // 2. SPOTLIGHT MOUSE TRACKER ON CARDS (Aceternity UI Style)
  // =========================================================================
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // =========================================================================
  // 3. INTERACTIVE MOQ & TIERED PRICING MATRIX SIMULATOR
  // =========================================================================
  const moqSlider = document.getElementById('moqUnitsSlider');
  const moqUnitsDisplay = document.getElementById('moqUnitsVal');
  const moqDiscountDisplay = document.getElementById('moqDiscountVal');
  const moqUnitPriceDisplay = document.getElementById('moqUnitPriceVal');
  const moqTotalDisplay = document.getElementById('moqTotalVal');

  const BASE_UNIT_MSRP = 35.00; // Base MSRP per cosmetic unit

  function updateTieredPricing(units) {
    if (!moqSlider) return;

    let discountPercent = 0;
    if (units >= 1000) {
      discountPercent = 65;
    } else if (units >= 500) {
      discountPercent = 50;
    } else if (units >= 250) {
      discountPercent = 35;
    } else if (units >= 50) {
      discountPercent = 20;
    }

    const unitPrice = BASE_UNIT_MSRP * (1 - discountPercent / 100);
    const totalCost = units * unitPrice;
    const clientProfitMargin = Math.round(((BASE_UNIT_MSRP - unitPrice) / BASE_UNIT_MSRP) * 100 + 40);

    moqUnitsDisplay.textContent = `${units.toLocaleString()} Units`;
    moqDiscountDisplay.textContent = `-${discountPercent}% OFF`;
    moqUnitPriceDisplay.textContent = `$${unitPrice.toFixed(2)}`;
    moqTotalDisplay.textContent = `$${Math.round(totalCost).toLocaleString()}`;
  }

  if (moqSlider) {
    moqSlider.addEventListener('input', (e) => {
      updateTieredPricing(parseInt(e.target.value, 10));
    });
    // Init
    updateTieredPricing(parseInt(moqSlider.value, 10));
  }

  // =========================================================================
  // 4. INTERACTIVE 3-TIER PRICING & ADD-ONS CALCULATOR
  // =========================================================================
  const billingToggles = document.querySelectorAll('.toggle-label');
  const starterPrice = document.getElementById('starterPrice');
  const growthPrice = document.getElementById('growthPrice');
  const elitePrice = document.getElementById('elitePrice');
  const periodLabels = document.querySelectorAll('.tier-period');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
  const starterOriginalPrice = document.getElementById('starterOriginalPrice');
  const growthOriginalPrice = document.getElementById('growthOriginalPrice');
  const eliteOriginalPrice = document.getElementById('eliteOriginalPrice');

  // Pricing Matrix Base Rates with 49% First Purchase Launch Offer
  const PRICING_DATA = {
    onetime: {
      starter: 485,
      starterOriginal: 950,
      growth: 1249,
      growthOriginal: 2450,
      elite: 2473,
      eliteOriginal: 4850,
      period: 'one-time build'
    },
    subscription: {
      starter: 76,
      starterOriginal: 149,
      growth: 149,
      growthOriginal: 299,
      elite: 299,
      eliteOriginal: 599,
      period: '/ month (WaaS)'
    }
  };

  let currentBillingMode = 'onetime';

  function updatePricingCards() {
    const data = PRICING_DATA[currentBillingMode];
    if (starterPrice) starterPrice.textContent = data.starter;
    if (growthPrice) growthPrice.textContent = data.growth;
    if (elitePrice) elitePrice.textContent = data.elite;

    if (starterOriginalPrice) starterOriginalPrice.textContent = `$${data.starterOriginal}`;
    if (growthOriginalPrice) growthOriginalPrice.textContent = `$${data.growthOriginal}`;
    if (eliteOriginalPrice) eliteOriginalPrice.textContent = `$${data.eliteOriginal}`;

    periodLabels.forEach(label => {
      label.textContent = data.period;
    });

    calculateAddonsTotal();
  }

  function calculateAddonsTotal() {
    let baseSelectedTier = currentBillingMode === 'onetime' ? PRICING_DATA.onetime.growth : PRICING_DATA.subscription.growth;
    let addonsSum = 0;

    addonCheckboxes.forEach(checkbox => {
      const parentCard = checkbox.closest('.addon-card');
      if (checkbox.checked) {
        addonsSum += parseInt(checkbox.dataset.price, 10);
        if (parentCard) parentCard.classList.add('selected');
      } else {
        if (parentCard) parentCard.classList.remove('selected');
      }
    });

    const totalEstimate = baseSelectedTier + addonsSum;
    if (addonsTotalQuote) {
      if (currentBillingMode === 'onetime') {
        addonsTotalQuote.textContent = `Est. Package (49% OFF): $${totalEstimate.toLocaleString()} USD`;
      } else {
        addonsTotalQuote.textContent = `Est. Package (49% OFF): $${totalEstimate.toLocaleString()} / mo`;
      }
    }
  }

  billingToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      billingToggles.forEach(t => t.classList.remove('active'));
      toggle.classList.add('active');
      currentBillingMode = toggle.dataset.billing;
      updatePricingCards();
    });
  });

  addonCheckboxes.forEach(box => {
    box.addEventListener('change', calculateAddonsTotal);
  });

  // Make whole addon card clickable
  document.querySelectorAll('.addon-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') {
        const checkbox = card.querySelector('.addon-checkbox');
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          calculateAddonsTotal();
        }
      }
    });
  });

  // Init pricing
  updatePricingCards();

  // =========================================================================
  // 5. ASYNCHRONOUS STRATEGY CONSULTATION FORM & WHATSAPP GENERATOR
  // =========================================================================
  const strategyForm = document.getElementById('strategyForm');
  const formFeedback = document.getElementById('formFeedback');
  const directWhatsAppBtn = document.getElementById('directWhatsAppBtn');
  const WHATSAPP_PHONE = '919344087944';

  function generateWhatsAppMessage(formData) {
    const text = 
`✦ *ZANTAWEB ASYNC STRATEGY INQUIRY* ✦
━━━━━━━━━━━━━━━━━━━━
• *Client Name:* ${formData.fullName || 'N/A'}
• *Business / Brand:* ${formData.brandName || 'N/A'}
• *Current Website:* ${formData.websiteUrl || 'New Project'}
• *Target Architecture:* ${formData.projectScope || 'High-Speed B2B Storefront'}
• *Estimated Budget:* ${formData.budgetRange || '$2,500 - $5,000'}
• *Desired Timeline:* ${formData.launchTimeline || '2-4 Weeks'}
• *Project Notes:* ${formData.projectNotes || 'Interested in migrating away from slow templates.'}
━━━━━━━━━━━━━━━━━━━━
Sent from ZANTAWEB Portfolio Console`;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  }

  if (strategyForm) {
    strategyForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('clientName').value.trim();
      const clientEmail = document.getElementById('clientEmail').value.trim();
      const brandName = document.getElementById('brandName').value.trim();
      const websiteUrl = document.getElementById('websiteUrl').value.trim();
      const projectScope = document.getElementById('projectScope').value;
      const budgetRange = document.getElementById('budgetRange').value;
      const launchTimeline = document.getElementById('launchTimeline').value;
      const projectNotes = document.getElementById('projectNotes').value.trim();

      // Basic Validation
      if (!fullName || !clientEmail || !brandName) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please provide your name, email, and brand name to generate your strategy brief.';
        return;
      }

      const formData = {
        fullName,
        clientEmail,
        brandName,
        websiteUrl,
        projectScope,
        budgetRange,
        launchTimeline,
        projectNotes
      };

      // Success State
      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `
        <strong><i class="fa-solid fa-circle-check"></i> Strategy Brief Created Successfully!</strong><br>
        Thank you, ${fullName}. Your asynchronous project parameters have been logged. 
        You can also send this formatted brief directly to our team via WhatsApp for priority same-day response:
        <div style="margin-top: 10px;">
          <a href="${generateWhatsAppMessage(formData)}" target="_blank" class="btn btn-whatsapp btn-sm" style="display: inline-flex; font-size: 0.85rem; padding: 6px 14px;">
            <i class="fa-brands fa-whatsapp"></i> Send Formatted Brief on WhatsApp (+91 9344087944)
          </a>
        </div>
      `;

      // Reset fields smoothly after delay
      setTimeout(() => {
        strategyForm.reset();
      }, 4000);
    });
  }

  // Pre-configured Direct WhatsApp Button in sidebar
  if (directWhatsAppBtn) {
    directWhatsAppBtn.addEventListener('click', (e) => {
      const defaultText = `Hello ZANTAWEB Team, I'm interested in an asynchronous web architecture consultation for my brand. Let's connect!`;
      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(defaultText)}`, '_blank');
    });
  }
});
