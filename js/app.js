/**
 * ZANTAWEB - Agency Core Interactive Application
 * Clean & Streamlined: Pricing Calculator, Mobile UX & WhatsApp Dispatch
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
  // 2. SPOTLIGHT MOUSE TRACKER ON CARDS
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
  // 3. INTERACTIVE 3-TIER PRICING (49% FIRST PURCHASE DISCOUNT)
  // =========================================================================
  const billingToggles = document.querySelectorAll('.toggle-label');
  const starterPrice = document.getElementById('starterPrice');
  const growthPrice = document.getElementById('growthPrice');
  const elitePrice = document.getElementById('elitePrice');
  const starterOriginalPrice = document.getElementById('starterOriginalPrice');
  const growthOriginalPrice = document.getElementById('growthOriginalPrice');
  const eliteOriginalPrice = document.getElementById('eliteOriginalPrice');
  const periodLabels = document.querySelectorAll('.tier-period');

  // Pricing Matrix Base Rates with 49% Launch Offer
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
  }

  billingToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      billingToggles.forEach(t => t.classList.remove('active'));
      toggle.classList.add('active');
      currentBillingMode = toggle.dataset.billing;
      updatePricingCards();
    });
  });

  // Initialize pricing
  updatePricingCards();

  // =========================================================================
  // 4. CONSULTATION FORM & DIRECT WHATSAPP GENERATOR (+91 9344087944)
  // =========================================================================
  const strategyForm = document.getElementById('strategyForm');
  const formFeedback = document.getElementById('formFeedback');
  const directWhatsAppBtn = document.getElementById('directWhatsAppBtn');
  const WHATSAPP_PHONE = '919344087944';

  function generateWhatsAppMessage(formData) {
    const text = 
`✦ *ZANTAWEB PROJECT INQUIRY (49% OFF)* ✦
━━━━━━━━━━━━━━━━━━━━
• *Client Name:* ${formData.fullName || 'N/A'}
• *Business / Profession:* ${formData.brandName || 'N/A'}
• *Industry / Field:* ${formData.industryField || 'General Business'}
• *Current Website:* ${formData.websiteUrl || 'New Website'}
• *Selected Package:* ${formData.projectScope || 'Growth Store ($1,249)'}
• *Estimated Budget:* ${formData.budgetRange || '$500 - $1,500'}
• *Target Launch:* ${formData.launchTimeline || 'Within 1-2 Weeks'}
• *Requirements:* ${formData.projectNotes || 'Interested in building a high-speed website with Antigravity, GitHub & Vercel.'}
━━━━━━━━━━━━━━━━━━━━
Sent from ZANTAWEB Portfolio`;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  }

  if (strategyForm) {
    strategyForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('clientName').value.trim();
      const clientEmail = document.getElementById('clientEmail').value.trim();
      const brandName = document.getElementById('brandName').value.trim();
      const industryField = document.getElementById('industryField') ? document.getElementById('industryField').value : 'General Business';
      const websiteUrl = document.getElementById('websiteUrl').value.trim();
      const projectScope = document.getElementById('projectScope').value;
      const budgetRange = document.getElementById('budgetRange').value;
      const launchTimeline = document.getElementById('launchTimeline').value;
      const projectNotes = document.getElementById('projectNotes').value.trim();

      // Validation
      if (!fullName || !clientEmail || !brandName) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please fill in your name, email, and business name.';
        return;
      }

      const formData = {
        fullName,
        clientEmail,
        brandName,
        industryField,
        websiteUrl,
        projectScope,
        budgetRange,
        launchTimeline,
        projectNotes
      };

      // Success State
      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `
        <strong><i class="fa-solid fa-circle-check"></i> Inquiry Received!</strong><br>
        Thank you, ${fullName}. We will get back to you within 24 hours.
        <div style="margin-top: 10px;">
          <a href="${generateWhatsAppMessage(formData)}" target="_blank" class="btn btn-whatsapp" style="display: inline-flex; font-size: 0.85rem; padding: 8px 16px;">
            <i class="fa-brands fa-whatsapp"></i> Send Direct on WhatsApp (+91 9344087944)
          </a>
        </div>
      `;

      setTimeout(() => {
        strategyForm.reset();
      }, 5000);
    });
  }

  // Pre-configured Direct WhatsApp Button
  if (directWhatsAppBtn) {
    directWhatsAppBtn.addEventListener('click', () => {
      const defaultText = `Hello ZANTAWEB, I am interested in building a fast, modern website for my business with the 49% discount. Please share details!`;
      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(defaultText)}`, '_blank');
    });
  }
});
