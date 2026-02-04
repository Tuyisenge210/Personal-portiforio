// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => links.classList.toggle('show'));

// Smooth reveal on scroll for cards/sections
const revealTargets = document.querySelectorAll('.section, .card, .service, .project, .contact-card, .timeline-item');
revealTargets.forEach(el => el.classList.add('reveal'));
const onScrollReveal = () => {
  const h = window.innerHeight;
  revealTargets.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < h - 80) el.classList.add('visible');
  });
};
window.addEventListener('scroll', onScrollReveal);
window.addEventListener('load', onScrollReveal);

// Contact form handler (placeholder)
document.getElementById('contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thanks for reaching out! I’ll get back to you soon.');
});

// Update footer year to current year
const footerP = document.querySelector('.footer-inner p');
if (footerP) footerP.textContent = `© ${new Date().getFullYear()} Eric Tuyisenge. All rights reserved.`;

// GitHub projects loader — reads username from meta tag `github-username`
async function loadGitHubProjects() {
  const container = document.getElementById('github-projects');
  if (!container) return;
  const meta = document.querySelector('meta[name="github-username"]');
  const username = meta?.content && meta.content !== 'your-github-username' ? meta.content : null;
  if (!username) {
    container.innerHTML = `
      <div class="card">
        <h3>Add your GitHub username</h3>
        <p>Set a <code>meta[name=\"github-username\"]</code> value in <em>index.html</em> to load projects automatically.</p>
      </div>`;
    return;
  }

  container.innerHTML = '<p>Loading projects…</p>';
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      container.innerHTML = `<p>Unable to load projects: ${res.status} ${res.statusText}. ${err.message || ''}</p>`;
      return;
    }
    const repos = await res.json();
    if (!Array.isArray(repos) || repos.length === 0) {
      container.innerHTML = '<p>No repositories found.</p>';
      return;
    }

    container.innerHTML = '';
    repos
      .filter(r => !r.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 6)
      .forEach(repo => {
        const card = document.createElement('div');
        card.className = 'card project';
        card.innerHTML = `
          <img src="https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?q=80&w=1600&auto=format&fit=crop" alt="Project thumbnail" />
          <h3>${repo.name}</h3>
          <p>${repo.description || 'Description will be added soon…'}</p>
          <div class="tags">
            <span>${repo.language || 'Data'}</span>
            <span>GitHub</span>
          </div>
          <p><a href="${repo.html_url}" target="_blank" rel="noopener">View on GitHub</a></p>
        `;
        container.appendChild(card);
      });
  } catch (err) {
    container.innerHTML = '<p>Unable to load projects right now.</p>';
  }
}
loadGitHubProjects();

// Side navigation: big visible Home/Skills buttons
const sideNav = document.querySelector('.side-nav');
sideNav?.addEventListener('click', e => {
  const btn = e.target.closest('.side-btn');
  if (!btn) return;
  const targetId = btn.dataset.target;
  const target = document.getElementById(targetId);
  if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
});

// Parallax mouse movement inside hero
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
const blob = document.querySelector('.floating-blob');
if (hero) {
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const depth = 18; // how much hero content moves
    if (heroContent) heroContent.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
    if (blob) {
      const bdepth = parseFloat(blob.dataset.depth || '0.06');
      blob.style.transform = `translate3d(${x * -depth * bdepth}px, ${y * -depth * bdepth}px, 0)`;
    }
  });
  hero.addEventListener('mouseleave', () => {
    if (heroContent) heroContent.style.transform = '';
    if (blob) blob.style.transform = '';
  });
}

// Track sections and update side nav active state
const sections = document.querySelectorAll('header[id], section[id]');
const sideButtons = document.querySelectorAll('.side-btn');
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const btn = document.querySelector(`.side-btn[data-target="${id}"]`);
    if (btn) btn.classList.toggle('active', entry.isIntersecting && entry.intersectionRatio > 0.4);
  });
}, {threshold: [0.4, 0.6]});
sections.forEach(s => obs.observe(s));

// Ensure skills section is visible when page first loads (gentle reveal)
window.addEventListener('load', () => {
  const skills = document.getElementById('skills');
  if (skills) skills.classList.add('visible');
});

