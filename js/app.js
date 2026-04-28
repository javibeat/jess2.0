/**
 * Jessica Morari — Static site interactivity
 */
document.addEventListener('DOMContentLoaded', () => {

  // ──────────────────────────────────────────────
  // 1. Mobile menu (hamburger)
  // ──────────────────────────────────────────────
  const menuBtn = document.querySelector('nav button');
  const mobilePanel = document.querySelector('nav .fixed.inset-0');
  const mobileLinks = mobilePanel ? mobilePanel.querySelectorAll('a') : [];
  const animatedEls = mobilePanel ? mobilePanel.querySelectorAll('.translate-y-4') : [];

  if (menuBtn && mobilePanel) {
    let menuOpen = false;

    const openMenu = () => {
      menuOpen = true;
      mobilePanel.classList.remove('translate-x-full');
      mobilePanel.classList.add('translate-x-0');
      // Animate items in
      animatedEls.forEach(el => {
        el.classList.remove('translate-y-4', 'opacity-0');
        el.classList.add('translate-y-0', 'opacity-100');
      });
      // Change icon to X
      menuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`;
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      menuOpen = false;
      mobilePanel.classList.add('translate-x-full');
      mobilePanel.classList.remove('translate-x-0');
      animatedEls.forEach(el => {
        el.classList.add('translate-y-4', 'opacity-0');
        el.classList.remove('translate-y-0', 'opacity-100');
      });
      menuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu" aria-hidden="true"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>`;
      document.body.style.overflow = '';
    };

    menuBtn.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
  }

  // ──────────────────────────────────────────────
  // 2. Smooth scroll for "See how I work" button
  // ──────────────────────────────────────────────
  document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.trim() === 'See how I work') {
      btn.addEventListener('click', () => {
        const target = document.getElementById('how-i-work');
        if (target) {
          const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    }
  });

  // ──────────────────────────────────────────────
  // 3. Testimonials carousel
  // ──────────────────────────────────────────────
  const testimonials = [
    {
      initial: 'S.',
      title: 'Role Change',
      content: 'After 15 years in aviation, S. was stepping into a new role and felt completely overwhelmed and insecure. Together, we reframed her mindset, rebuilt her confidence and created a concrete plan that balanced work, family and her personal ambitions. She stepped into the role with clarity and purpose, finally feeling in control again and showing up in the world with confidence and authenticity.'
    },
    {
      initial: 'K.',
      title: 'Business Scaling',
      content: 'K. wanted to grow her business but kept hitting invisible roadblocks. We clarified her vision, identified the obstacles holding her back, implemented a simple but effective structure and built a practical action plan. The result? A clear path to scaling sustainably while maintaining balance in her life.'
    },
    {
      initial: 'P.',
      title: 'International Relocation',
      content: 'Relocating internationally forced P. to take a step back, leaving her confidence and sense of value shaken. We leveraged her strengths, reframed her mindset and designed a roadmap for her next promotion. She regained her career momentum and now moves forward with clarity and satisfaction.'
    }
  ];

  const testimonialCard = document.querySelector('.bg-white\\/95');
  if (testimonialCard) {
    const textEl = testimonialCard.querySelector('p');
    const infoEl = testimonialCard.querySelector('.flex.items-center.gap-2');
    let current = 0;

    const renderTestimonial = (index) => {
      const t = testimonials[index];
      if (textEl) textEl.textContent = t.content;
      if (infoEl) {
        const spans = infoEl.querySelectorAll('span');
        if (spans.length >= 3) {
          spans[0].textContent = t.initial;
          spans[2].textContent = t.title;
        }
      }
    };

    // Find prev/next buttons (the two buttons after the testimonial card)
    const carouselButtons = testimonialCard.closest('.relative')?.querySelectorAll('button');
    if (carouselButtons && carouselButtons.length >= 2) {
      carouselButtons[0].addEventListener('click', () => {
        current = (current - 1 + testimonials.length) % testimonials.length;
        renderTestimonial(current);
      });
      carouselButtons[1].addEventListener('click', () => {
        current = (current + 1) % testimonials.length;
        renderTestimonial(current);
      });
    }
  }

  // ──────────────────────────────────────────────
  // 4. Life Design Method — timeline scroll animation
  // ──────────────────────────────────────────────
  // The progress line (green) that fills as you scroll
  const progressLines = document.querySelectorAll('.bg-primary.transition-all.duration-300.ease-out.origin-top');
  const pillarPoints = document.querySelectorAll('.pillar-point');
  const mobileDots = document.querySelectorAll('.md\\:hidden.rounded-full.z-20');
  const decorativeIcons = document.querySelectorAll('svg[width="80"]');
  const pillarCards = document.querySelectorAll('.hover\\:scale-\\[1\\.02\\]');
  // The container that holds the entire timeline
  const timelineContainer = progressLines.length > 0 ? progressLines[0]?.closest('.relative') : null;

  if (timelineContainer && progressLines.length > 0) {
    const updateTimeline = () => {
      const containerRect = timelineContainer.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const viewportTrigger = window.innerHeight * 0.45;

      // Calculate how far down the timeline we've scrolled
      const scrolled = viewportTrigger - containerTop;
      const progress = Math.min(Math.max(scrolled / containerHeight, 0), 1);
      const progressPct = progress * 100;

      // Update all progress lines (mobile + desktop)
      progressLines.forEach(line => {
        line.style.height = progressPct + '%';
      });

      // Update pillar points, icons and cards based on their position
      pillarPoints.forEach((point, i) => {
        const pointRect = point.getBoundingClientRect();
        const pointCenter = pointRect.top + pointRect.height / 2;
        const active = pointCenter < viewportTrigger;

        if (active) {
          point.classList.remove('border-gray-200');
          point.classList.add('border-primary');
          const dot = point.querySelector('div');
          if (dot) {
            dot.classList.remove('bg-gray-200');
            dot.classList.add('bg-primary');
          }
        } else {
          point.classList.add('border-gray-200');
          point.classList.remove('border-primary');
          const dot = point.querySelector('div');
          if (dot) {
            dot.classList.add('bg-gray-200');
            dot.classList.remove('bg-primary');
          }
        }
      });

      // Mobile dots
      mobileDots.forEach(dot => {
        const dotRect = dot.getBoundingClientRect();
        const active = dotRect.top + dotRect.height / 2 < viewportTrigger;
        if (active) {
          dot.classList.remove('bg-gray-200');
          dot.classList.add('bg-primary');
        } else {
          dot.classList.add('bg-gray-200');
          dot.classList.remove('bg-primary');
        }
      });

      // Decorative icons
      decorativeIcons.forEach(icon => {
        const iconRect = icon.getBoundingClientRect();
        const active = iconRect.top + iconRect.height / 2 < viewportTrigger;
        if (active) {
          icon.classList.remove('text-gray-200', 'opacity-60');
          icon.classList.add('text-primary-light', 'opacity-100');
        } else {
          icon.classList.add('text-gray-200', 'opacity-60');
          icon.classList.remove('text-primary-light', 'opacity-100');
        }
      });

      // Pillar cards — fade in (one-way, don't hide again)
      pillarCards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        if (cardRect.top < window.innerHeight * 0.85) {
          card.classList.add('opacity-100', 'translate-y-0');
          card.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    };

    // Initial state for cards
    pillarCards.forEach(card => {
      card.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
    });

    window.addEventListener('scroll', updateTimeline, { passive: true });
    updateTimeline(); // Run once on load
  }

  // Generic fade-in for elements with data-animate
  const genericObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        genericObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-animate]').forEach(el => {
    el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
    genericObserver.observe(el);
  });

  // ──────────────────────────────────────────────
  // 5. Navbar scroll effect
  // ──────────────────────────────────────────────
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.classList.add('shadow-md');
      } else {
        nav.classList.remove('shadow-md');
      }
    });
  }

  // ──────────────────────────────────────────────
  // 6. The Lab waitlist modal
  // ──────────────────────────────────────────────
  // ──────────────────────────────────────────────
  // 6. Button scroll targets
  // ──────────────────────────────────────────────
  const scrollTargets = {
    'Join the waitlist': '#waitlist-modal', // open modal
    'Join the Lab waitlist': '#waitlist-modal', // open modal
    'How we can work together': '#work-together',
    'Request a workshop': '#workshop-form',
    'Request a workshop quotation': '#workshop-form',
  };

  document.querySelectorAll('button').forEach(btn => {
    const text = btn.textContent.trim();
    if (text in scrollTargets) {
      btn.addEventListener('click', () => {
        const targetId = scrollTargets[text];
        if (!targetId) {
          window.location.href = 'contact.html';
          return;
        }
        // Check if it's a modal
        if (targetId === '#waitlist-modal') {
          openWaitlistModal();
          return;
        }
        const target = document.querySelector(targetId);
        if (target) {
          const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    }
  });

  // ──────────────────────────────────────────────
  // 7. Waitlist modal
  // ──────────────────────────────────────────────
  const waitlistModal = document.getElementById('waitlist-modal');
  const waitlistOverlay = document.getElementById('waitlist-overlay');
  const waitlistClose = document.getElementById('waitlist-close');
  const waitlistForm = document.getElementById('waitlist-form');

  function openWaitlistModal() {
    if (!waitlistModal) return;
    waitlistModal.classList.remove('hidden');
    waitlistModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeWaitlistModal() {
    if (!waitlistModal) return;
    waitlistModal.classList.add('hidden');
    waitlistModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  if (waitlistClose) waitlistClose.addEventListener('click', closeWaitlistModal);
  if (waitlistOverlay) waitlistOverlay.addEventListener('click', closeWaitlistModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && waitlistModal && !waitlistModal.classList.contains('hidden')) {
      closeWaitlistModal();
    }
  });

  // Form submit
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(waitlistForm);
      const name = data.get('name');
      // For now just show confirmation — connect to backend later
      waitlistForm.innerHTML = `
        <div class="text-center py-8">
          <p class="text-2xl font-bold text-secondary mb-2">You're on the list!</p>
          <p class="text-gray-600">Thanks ${name}! We'll notify you when The Lab opens its doors.</p>
        </div>
      `;
    });
  }

});
