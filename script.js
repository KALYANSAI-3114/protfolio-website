// ===== Sticky nav shadow on scroll =====
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 30) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Mobile menu =====
const burger = document.getElementById('burger');
const mobilePanel = document.getElementById('mobilePanel');
const setMenu = (isOpen) => {
  mobilePanel.classList.toggle('open', isOpen);
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
  burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
};
burger.addEventListener('click', () => setMenu(!mobilePanel.classList.contains('open')));
mobilePanel.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => setMenu(false));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

// ===== Project data with outcomes =====
const projects = {
  birthday: {
    title: 'ALAB Birthday Agent',
    tags: ['Python', 'MCP', 'Groq', 'LangChain', 'Gmail API', 'OAuth 2.0', 'APScheduler'],
    link: 'https://github.com/KALYANSAI-3114/alab-birthday-agent',
    blocks: [
      ['The moment', 'On my birthday, my parents and colleagues wished me, but some B.Tech and childhood friends forgot. I initially felt hurt, then realized I had also forgotten some friends birthdays.'],
      ['The realization', 'People can care about someone and still forget because remembering depends on human memory. I’m an engineer, so instead of only feeling bad about it, I decided to build something.'],
      ['What I built', 'A Birthday AI Agent that reads a CSV containing names, birthdays, and email addresses, then sends a personalized wish when it is needed.'],
      ['How it works', 'The agent wakes at 12:00 AM, checks the CSV, stops when nobody has a birthday, or runs Birthday → Agent → MCP → Gmail → Birthday Wish.'],
      ['Technical approach', '<ul><li>Scheduler/Cron → Birthday AI Agent</li><li>MCP Client → Birthday MCP Server → Gmail MCP Server</li><li>Groq generates the message</li><li>Gmail API and OAuth 2.0 deliver it</li></ul>'],
      ['Business outcome', 'Turns a recurring human-memory failure into a reliable, zero-effort system. Demonstrates scheduled multi-MCP tool calling that can be adapted to any recurring personal or team reminder workflow.']
    ]
  },
  finder: {
    title: 'ALAB OpenSource Finder',
    tags: ['Python', 'FastAPI', 'LangGraph', 'Groq', 'GitHub MCP', 'Docker', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/KALYANSAI-3114/alab-opensource-finder',
    blocks: [
      ['The moment', 'One Friday around 9 PM, I decided to spend the weekend contributing to open source. I searched until roughly 1 AM, went through around 1.5K+ issues, and still struggled to find six genuinely relevant ones.'],
      ['The realization', 'Finding the right issue can take longer than solving it. Limited context, unfamiliar languages, mismatched interests or complexity, and huge result sets made manual filtering the real bottleneck.'],
      ['What I built', 'An AI-assisted GitHub issue discovery tool that turns a natural-language requirement into focused, relevant recommendations.'],
      ['How it works', 'User Requirement → Intent Understanding → GitHub Search via MCP → Issue Evaluation → Relevance Scoring → Ranking → Relevant Recommendations.'],
      ['Technical approach', 'Groq understands the requirement. GitHub MCP retrieves GitHub information. Deterministic Python logic performs validation, filtering, scoring, and ranking.'],
      ['Business outcome', 'Reduces hours of manual issue hunting to minutes. Separates LLM reasoning from deterministic ranking so the system stays inspectable and useful for any search-and-rank workflow.']
    ]
  },
  ml: {
    title: 'ALAB ML',
    tags: ['Python 3.11+', 'FastAPI', 'Uvicorn', 'Pandas', 'NumPy', 'scikit-learn', 'imbalanced-learn', 'XGBoost', 'LangChain', 'LangChain Groq', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/KALYANSAI-3114/alab-ml',
    blocks: [
      ['The idea', 'I wanted to be fast at building ML applications by automating a substantial part of the repetitive workflow normally handled by a senior machine learning engineer.'],
      ['What I built', 'An AI-powered machine learning engineer agent for common tabular ML tasks: it takes a natural-language request and dataset and executes an end-to-end workflow.'],
      ['How it works', 'The agent understands the prediction requirement, inspects and validates data, prepares features, selects an approach, trains and evaluates models, then exposes artifacts for future prediction.'],
      ['Technical approach', '<ul><li>Classification and regression workflows</li><li>Feature engineering and leakage-safe preparation</li><li>Cross-validation and model evaluation</li><li>Explainability, fairness audit, and drift baseline</li></ul>'],
      ['Engineering output', '<ul><li>Versioned saved artifacts</li><li>Generated training and monitoring reports</li><li>Downloadable model and preprocessor</li><li>Prediction endpoint</li></ul>'],
      ['Business outcome', 'Compresses the repetitive parts of tabular ML into a single guided flow. Useful as an internal accelerator or as a starting point for client ML features that need fast iteration.']
    ]
  },
  mart: {
    title: 'ALAB-Mart',
    tags: ['Python', 'Full-stack AI', 'RAG', 'Voice AI', 'Product Intelligence', 'Shopping Agent'],
    link: 'https://github.com/KALYANSAI-3114/alab-mart',
    blocks: [
      ['The positioning', 'Nobody hires freshers for Forward Deployed AI Engineer roles. So I built the exact job before anyone gave it to me.'],
      ['The two roles', '<ul><li><strong>Client:</strong> defined business requirements, policies, catalog structure, and what actually needed solving.</li><li><strong>Engineer:</strong> translated those requirements into a working product and made the technical decisions.</li></ul>'],
      ['What I built', 'A full-stack AI e-commerce project with RAG-powered product and policy intelligence plus a voice-native shopping agent.'],
      ['How it works', 'The product assistant is grounded in application data for reliable retrieval, while the voice agent understands shopping intent and performs shopping or cart actions.'],
      ['Why it matters', 'Forward Deployed Engineering means understanding the gap between business requirements and technical execution. This project created a realistic environment to practice that job.'],
      ['Business outcome', 'Shows end-to-end product thinking: grounded RAG + voice agent connected to a real shopping flow. A concrete example of the kind of system a client would actually deploy.']
    ]
  }
};

const projectModal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalTags = document.getElementById('modalTags');
const modalContent = document.getElementById('modalContent');
const modalLink = document.getElementById('modalLink');
const modalDiscuss = document.getElementById('modalDiscuss');

const closeProjectModal = () => {
  projectModal.classList.remove('open');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

document.querySelectorAll('[data-project]').forEach(card => {
  card.addEventListener('click', () => {
    const project = projects[card.dataset.project];
    modalTitle.textContent = project.title;
    modalTags.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    modalContent.innerHTML = project.blocks.map(([heading, content]) =>
      `<div class="modal-block"><strong>${heading}</strong>${content.startsWith('<') ? content : `<p>${content}</p>`}</div>`
    ).join('');
    modalLink.href = project.link || '#projects';
    modalLink.textContent = project.link ? 'View on GitHub ↗' : 'Project details available on request';
    modalLink.setAttribute('aria-disabled', String(!project.link));
    modalLink.style.pointerEvents = project.link ? 'auto' : 'none';
    modalLink.style.opacity = project.link ? '1' : '.65';
    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    projectModal.querySelector('.modal-close').focus();
  });
});

projectModal.querySelectorAll('[data-close-modal]').forEach(element =>
  element.addEventListener('click', closeProjectModal)
);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && projectModal.classList.contains('open')) closeProjectModal();
});

// Close modal when clicking the discuss CTA (it links to #contact)
modalDiscuss.addEventListener('click', closeProjectModal);

// ===== Active nav link on scroll =====
const sectionLinks = [...document.querySelectorAll('.nav-links a')];
const observedSections = sectionLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
if ('IntersectionObserver' in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach(link =>
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)
      );
    });
  }, { rootMargin: '-28% 0px -62% 0px' });
  observedSections.forEach(section => sectionObserver.observe(section));
}

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ===== Footer year (if element exists) =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
