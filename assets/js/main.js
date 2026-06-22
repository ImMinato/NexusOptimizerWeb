// ========== DATA LOADER GLOBAL ==========
const dataCache = {};
async function fetchJSON(url) {
    if (dataCache[url]) return dataCache[url];
    try {
        const cached = sessionStorage.getItem(url);
        if (cached) {
            dataCache[url] = JSON.parse(cached);
            return dataCache[url];
        }
    } catch (e) { /* ignorar */ }
    try {
        const res = await fetch(url + '?t=' + Date.now());
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        dataCache[url] = data;
        try { sessionStorage.setItem(url, JSON.stringify(data)); } catch (e) {}
        return data;
    } catch (err) {
        console.error('Error cargando', url, err);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', function () {

    // ========== CONSTANTES ==========
    const PARTICLES_CANVAS = document.getElementById('particlesCanvas');
    const HAMBURGER = document.getElementById('hamburger');
    const NAV_LINKS = document.getElementById('navLinks');
    const PARTICLES_COUNT = window.innerWidth < 768 ? 30 : 70;
    let animationId, isPageVisible = true;
    let particles = [];
    const ctx = PARTICLES_CANVAS ? PARTICLES_CANVAS.getContext('2d') : null;

    // ========== GITHUB API (con caché) ==========
    async function fetchGitHubRepos(username) {
        try {
            const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
            if (!res.ok) throw new Error('Error al obtener repositorios');
            return await res.json();
        } catch (e) {
            console.error('GitHub API error:', e);
            return [];
        }
    }

    async function getCachedRepos(username) {
        const cacheKey = `gh_repos_${username}`;
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
            try { return JSON.parse(cached); } catch (e) { /* ignorar */ }
        }
        const repos = await fetchGitHubRepos(username);
        try { sessionStorage.setItem(cacheKey, JSON.stringify(repos)); } catch (e) {}
        return repos;
    }

    // ========== PARTÍCULAS SUAVES ==========
    if (PARTICLES_CANVAS && ctx) {
        function resizeCanvas() {
            PARTICLES_CANVAS.width = window.innerWidth;
            PARTICLES_CANVAS.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * PARTICLES_CANVAS.width;
                this.y = Math.random() * PARTICLES_CANVAS.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.3 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > PARTICLES_CANVAS.width) this.speedX *= -1;
                if (this.y < 0 || this.y > PARTICLES_CANVAS.height) this.speedY *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(77, 208, 225, ${this.opacity})`;
                ctx.fill();
            }
        }

        function initParticles(count) {
            particles = [];
            for (let i = 0; i < count; i++) particles.push(new Particle());
        }

        function animateParticles() {
            if (!isPageVisible) {
                animationId = requestAnimationFrame(animateParticles);
                return;
            }
            ctx.clearRect(0, 0, PARTICLES_CANVAS.width, PARTICLES_CANVAS.height);
            particles.forEach(p => { p.update(); p.draw(); });
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(77, 208, 225, ${0.04 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animationId = requestAnimationFrame(animateParticles);
        }

        document.addEventListener('visibilitychange', () => { isPageVisible = !document.hidden; });
        initParticles(PARTICLES_COUNT);
        animateParticles();
    }

    // ========== MENÚ HAMBURGUESA ==========
    if (HAMBURGER && NAV_LINKS) {
        HAMBURGER.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            NAV_LINKS.classList.toggle('open');
        });
        NAV_LINKS.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (NAV_LINKS.classList.contains('open')) {
                    NAV_LINKS.classList.remove('open');
                    HAMBURGER.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // ========== INTERSECTION OBSERVER ==========
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });

    function observeNewElements(selector = '.fade-in') {
        document.querySelectorAll(selector).forEach(el => fadeObserver.observe(el));
    }

    // ========== CARGAR MÓDULOS ==========
    const modulesContainer = document.getElementById('modules-container');
    if (modulesContainer) {
        fetchJSON('assets/js/modules.json').then(data => {
            modulesContainer.innerHTML = data.map(mod => `
                <div class="module-card fade-in">
                    <div class="icon"><i class="${mod.icon}" style="color:${mod.color || 'var(--accent)'}"></i></div>
                    <h3>${mod.name}</h3>
                    <p>${mod.description}</p>
                    <span class="category-badge">${mod.category}</span>
                </div>
            `).join('');
            observeNewElements();
        });
    }

    // ========== PRECIOS ==========
    const pricesContainer = document.getElementById('prices-container');
    if (pricesContainer) {
        fetchJSON('assets/js/prices.json').then(data => {
            const plan = data[0];
            pricesContainer.innerHTML = `
                <div class="price-card fade-in recommended">
                    <div class="price-icon"><i class="${plan.icon}"></i></div>
                    <h3>${plan.tier}</h3>
                    <p class="price-subtitle">${plan.subtitle}</p>
                    <p class="price-description">${plan.description}</p>
                    <ul class="price-features">
                        ${plan.features.map(f => `<li><i class="fas fa-check-circle" style="color:var(--accent)"></i> ${f}</li>`).join('')}
                    </ul>
                    <div class="price-tag">
                        <span class="price-ars">${plan.price_ars}</span>
                        <span class="price-usd">${plan.price_usd}</span>
                    </div>
                    <a href="comprar.html" class="btn-primary btn-small">Obtener ahora</a>
                </div>
            `;
            observeNewElements();
            // Actualizar estadística de precio
            const priceStat = document.getElementById('priceStat');
            if (priceStat) {
                const usdMatch = plan.price_usd.match(/\d+/);
                if (usdMatch) priceStat.textContent = usdMatch[0];
            }
        });
    }

    // ========== TESTIMONIALS ==========
    const testimonialsContainer = document.getElementById('testimonials-container');
    if (testimonialsContainer) {
        fetchJSON('assets/js/testimonials.json').then(data => {
            testimonialsContainer.innerHTML = data.map(t => `
                <div class="testimonial-card fade-in">
                    <div class="testimonial-avatar"><img src="${t.avatar}" alt="${t.name}" loading="lazy" onerror="this.src='assets/images/default-avatar.png'"></div>
                    <div class="testimonial-text">“${t.text}”</div>
                    <div class="testimonial-author">${t.name} <span>${t.role}</span></div>
                    <div class="testimonial-stars">${'⭐'.repeat(t.rating)}</div>
                </div>
            `).join('');
            observeNewElements();
        });
    }

    // ========== EQUIPO + REPOSITORIOS DE GITHUB ==========
    const teamContainer = document.getElementById('team-container');
    if (teamContainer) {
        fetch('assets/js/team.json?t=' + Date.now())
            .then(res => res.json())
            .then(async data => {
                const membersWithRepos = await Promise.all(data.map(async member => {
                    const username = member.github.split('/').pop();
                    const repos = await getCachedRepos(username);
                    return { ...member, repos };
                }));

                teamContainer.innerHTML = membersWithRepos.map(member => `
                    <div class="team-card fade-in">
                        <img src="${member.avatar || 'data:image/svg+xml,...'}" alt="${member.name}" loading="lazy" width="100" height="100" onerror="this.src='assets/images/default-avatar.png'">
                        <h3>${member.name}</h3>
                        <div class="role">${member.role}</div>
                        <p class="bio">${member.bio}</p>
                        <div class="social-links">
                            ${member.github ? `<a href="${member.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                            ${member.email ? `<a href="mailto:${member.email}"><i class="fas fa-envelope"></i></a>` : ''}
                        </div>
                        ${member.repos && member.repos.length ? `
                            <div class="github-repos">
                                <h4>📦 Últimos repos</h4>
                                <ul>
                                    ${member.repos.map(repo => `
                                        <li>
                                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                            <span>⭐ ${repo.stargazers_count}</span>
                                            <span>${repo.language || ''}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                `).join('');
                observeNewElements();
            })
            .catch(err => console.error('Error cargando team.json:', err));
    }

    // ========== FAQ TABS ==========
    const tabButtons = document.querySelectorAll('.faq-tab-btn');
    const tabPanes = document.querySelectorAll('.faq-pane');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
            tabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            const targetId = btn.getAttribute('data-target');
            if (targetId) {
                const pane = document.getElementById(targetId);
                if (pane) pane.classList.add('active');
            }
        });
    });

    // ========== COMPATIBILIDAD (index) ==========
    const compBody = document.getElementById('compatibility-body');
    if (compBody) {
        fetchJSON('assets/js/compatibility.json').then(data => {
            compBody.innerHTML = data.map(c => `<tr><td>${c.so}</td><td>${c.soporte}</td></tr>`).join('');
        });
    }

    // ========== TIMELINE (index) ==========
    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) {
        fetchJSON('assets/js/timeline.json').then(data => {
            timelineContainer.innerHTML = data.map(item => `
                <div class="timeline-item fade-in">
                    <div class="timeline-date">${item.date}</div>
                    <div class="timeline-title">${item.title}</div>
                    <div class="timeline-desc">${item.description}</div>
                </div>
            `).join('');
            observeNewElements();
        });
    }

    // ========== BENCHMARKS en presentacion ==========
    const benchmarksGrid = document.getElementById('benchmarks-grid');
    if (benchmarksGrid) {
        fetchJSON('assets/js/benchmarks.json').then(data => {
            benchmarksGrid.innerHTML = data.map(b => `
                <div class="bench-card fade-in">
                    <h3><i class="fas fa-gamepad"></i> ${b.game} <span>(${b.config})</span></h3>
                    <div class="bench-stats">
                        <div class="bench-stat"><span>FPS antes:</span> ${b.fps_before} → <strong>${b.fps_after}</strong></div>
                        <div class="bench-stat"><span>Carga (s):</span> ${b.load_time_before} → <strong>${b.load_time_after}</strong></div>
                        <div class="bench-stat"><span>RAM (%):</span> ${b.ram_before} → <strong>${b.ram_after}</strong></div>
                    </div>
                    <div class="bench-bar-group">
                        <div class="bench-bar"><span>FPS</span><div class="bar-bg"><div class="bar-fill" style="width:${b.fps_after/2}%"></div></div></div>
                        <div class="bench-bar"><span>Carga</span><div class="bar-bg"><div class="bar-fill" style="width:${b.load_time_after/1.5}%"></div></div></div>
                        <div class="bench-bar"><span>RAM</span><div class="bar-bg"><div class="bar-fill" style="width:${b.ram_after}%"></div></div></div>
                    </div>
                </div>
            `).join('');
            observeNewElements();
        });
    }

    // ========== BLOG (carga en cualquier página con #blog-container) ==========
    const blogContainer = document.getElementById('blog-container');
    if (blogContainer) {
        fetchJSON('assets/js/blog.json').then(data => {
            if (data && data.length > 0) {
                blogContainer.innerHTML = data.map(item => `
                    <div class="blog-card fade-in">
                        <h3><i class="fas fa-newspaper"></i> ${item.title}</h3>
                        <div class="blog-meta">${item.date} · ${item.tags.join(', ')}</div>
                        <p>${item.excerpt}</p>
                        <a href="#" class="blog-read-more">Leer más →</a>
                    </div>
                `).join('');
                observeNewElements();
            } else {
                blogContainer.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:40px 0;">No hay entradas de blog disponibles.</p>`;
            }
        }).catch(() => {
            blogContainer.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:40px 0;">Error al cargar el blog. Verifica la consola.</p>`;
        });
    }

    observeNewElements();
});