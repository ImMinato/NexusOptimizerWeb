/**
 * ============================================================
 *  NexusOptimizer - Main JavaScript (versión unificada)
 *  Documentación: https://github.com/ImMinato/NexusOptimizerWeb
 * ============================================================
 *
 *  Este archivo se encarga de:
 *    - Cargar todos los datos desde un único archivo data.json
 *    - Renderizar dinámicamente las secciones de la web
 *    - Gestionar la navegación, partículas, menú hamburguesa y animaciones
 *    - Mostrar mensajes de error amigables si falla la carga
 */

// ============================
// 1. CARGADOR DE DATOS (UNIFICADO)
// ============================

/**
 * Almacena en memoria los datos cargados para evitar múltiples peticiones.
 * @type {Object|null}
 */
let appData = null;

/**
 * Carga los datos desde data.json.
 * Utiliza sessionStorage como caché para reducir peticiones.
 * @returns {Promise<Object>} Objeto con todos los datos del sitio.
 */
async function loadData() {
    // Si ya están en memoria, devolverlos.
    if (appData) return appData;

    // Intentar recuperar desde sessionStorage
    try {
        const cached = sessionStorage.getItem('appData');
        if (cached) {
            appData = JSON.parse(cached);
            return appData;
        }
    } catch (e) {
        // Si la caché está corrupta, ignorar y seguir
    }

    // Si no hay caché, hacer fetch del archivo
    try {
        const res = await fetch('assets/js/data.json?t=' + Date.now());
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();
        appData = data;
        // Guardar en sessionStorage para futuras recargas
        try {
            sessionStorage.setItem('appData', JSON.stringify(data));
        } catch (e) {
            // Si no se puede guardar (espacio insuficiente), ignorar
        }
        return data;
    } catch (err) {
        console.error('Error cargando data.json:', err);
        // Devolver objeto vacío para que las secciones muestren mensaje de error
        return {};
    }
}

// ============================
// 2. INICIO DE LA APLICACIÓN
// ============================

document.addEventListener('DOMContentLoaded', function () {

    // ----------------------------
    // 2.1. Constantes y configuración
    // ----------------------------
    const PARTICLES_CANVAS = document.getElementById('particlesCanvas');
    const HAMBURGER = document.getElementById('hamburger');
    const NAV_LINKS = document.getElementById('navLinks');
    const PARTICLES_COUNT = window.innerWidth < 768 ? 30 : 70;
    let animationId, isPageVisible = true;
    let particles = [];
    const ctx = PARTICLES_CANVAS ? PARTICLES_CANVAS.getContext('2d') : null;

    // ----------------------------
    // 2.2. Funciones auxiliares (GitHub API)
    // ----------------------------
    /**
     * Obtiene repositorios públicos de un usuario de GitHub.
     * @param {string} username - Nombre de usuario.
     * @returns {Promise<Array>} Lista de repositorios.
     */
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

    /**
     * Obtiene repositorios con caché en sessionStorage.
     * @param {string} username - Nombre de usuario.
     * @returns {Promise<Array>} Lista de repositorios.
     */
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

    // ----------------------------
    // 2.3. Partículas de fondo
    // ----------------------------
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
            // Dibujar líneas entre partículas cercanas
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

    // ----------------------------
    // 2.4. Menú hamburguesa
    // ----------------------------
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

    // ----------------------------
    // 2.5. Intersection Observer para animaciones fade-in
    // ----------------------------
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });

    /**
     * Observa todos los elementos con la clase .fade-in.
     * Se puede llamar después de agregar nuevos elementos al DOM.
     * @param {string} selector - Selector CSS (por defecto '.fade-in').
     */
    function observeNewElements(selector = '.fade-in') {
        document.querySelectorAll(selector).forEach(el => fadeObserver.observe(el));
    }
    window.observeNewElements = observeNewElements;

    // ----------------------------
    // 2.6. Renderizado de todas las secciones
    // ----------------------------
    loadData()
        .then(data => {
            // Si no hay datos o el objeto está vacío, mostrar mensaje de error genérico
            if (!data || Object.keys(data).length === 0) {
                console.warn('No se pudieron cargar los datos. Verifica la conexión o el archivo data.json.');
                // Mostrar mensaje en contenedores importantes
                const containers = [
                    'modules-container',
                    'prices-container',
                    'testimonials-container',
                    'compatibility-body',
                    'timeline-container',
                    'benchmarks-grid',
                    'blog-container',
                    'glossary-grid',
                    'roadmap-container',
                    'support-list'
                ];
                containers.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:20px;">⚠️ No se pudieron cargar los datos. Intenta recargar la página.</p>`;
                    }
                });
                return;
            }

            // ---------- Módulos ----------
            const modulesContainer = document.getElementById('modules-container');
            if (modulesContainer && data.modules) {
                modulesContainer.innerHTML = data.modules.map(mod => `
                    <div class="module-card fade-in">
                        <div class="icon"><i class="${mod.icon}" style="color:${mod.color || 'var(--accent)'}"></i></div>
                        <h3>${mod.name}</h3>
                        <p>${mod.description}</p>
                        <span class="category-badge">${mod.category}</span>
                    </div>
                `).join('');
                observeNewElements();
            }

            // ---------- Precios ----------
            const pricesContainer = document.getElementById('prices-container');
            if (pricesContainer && data.prices && data.prices.length > 0) {
                const plan = data.prices[0];
                pricesContainer.innerHTML = `
                    <div class="price-card fade-in recommended">
                        <div class="price-icon">
                            <img src="${plan.image}" alt="${plan.tier}" style="width:80px;height:auto;filter:drop-shadow(0 0 8px rgba(77,208,225,0.3));">
                        </div>
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
                // Actualizar estadística de precio (si existe)
                const priceStat = document.getElementById('priceStat');
                if (priceStat) {
                    const usdMatch = plan.price_usd.match(/\d+/);
                    if (usdMatch) priceStat.textContent = usdMatch[0];
                }
            }

            // ---------- Testimonios ----------
            const testimonialsContainer = document.getElementById('testimonials-container');
            if (testimonialsContainer && data.testimonials) {
                testimonialsContainer.innerHTML = data.testimonials.map(t => {
                    const initials = t.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                    return `
                    <div class="testimonial-card fade-in">
                        <div class="testimonial-avatar-initials">${initials}</div>
                        <div class="testimonial-text">"${t.text}"</div>
                        <div class="testimonial-author">${t.name} <span>${t.role}</span></div>
                        <div class="testimonial-stars">${'⭐'.repeat(t.rating)}</div>
                    </div>
                `;
                }).join('');
                observeNewElements();
            }

            // ---------- Compatibilidad (tabla en index) ----------
            const compBody = document.getElementById('compatibility-body');
            if (compBody && data.compatibility) {
                compBody.innerHTML = data.compatibility.map(c => `<tr><td>${c.so}</td><td>${c.soporte}</td></tr>`).join('');
            }

            // ---------- Timeline (index) ----------
            const timelineContainer = document.getElementById('timeline-container');
            if (timelineContainer && data.timeline) {
                timelineContainer.innerHTML = data.timeline.map(item => `
                    <div class="timeline-item fade-in">
                        <div class="timeline-date">${item.date}</div>
                        <div class="timeline-title">${item.title}</div>
                        <div class="timeline-desc">${item.description}</div>
                    </div>
                `).join('');
                observeNewElements();
            }

            // ---------- Benchmarks (presentacion) ----------
            const benchmarksGrid = document.getElementById('benchmarks-grid');
            if (benchmarksGrid && data.benchmarks) {
                benchmarksGrid.innerHTML = data.benchmarks.map(b => `
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
            }

            // ---------- Blog ----------
            const blogContainer = document.getElementById('blog-container');
            if (blogContainer && data.blog) {
                if (data.blog.length > 0) {
                    blogContainer.innerHTML = data.blog.map(item => `
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
            }

            // ---------- Comparativa (tabla en comparativa.html) ----------
            const comparativaTable = document.querySelector('#comparativa-table tbody');
            if (comparativaTable && data.comparativa) {
                comparativaTable.innerHTML = data.comparativa.map(tool => `
                    <tr>
                        <td><strong>${tool.tool}</strong></td>
                        <td>${tool.precio}</td>
                        <td>${tool.privacidad}</td>
                        <td>${tool.peso}</td>
                        <td>${tool.modulos}</td>
                        <td>${tool.restauracion}</td>
                        <td>${tool.publicidad}</td>
                        <td>${tool.puntuacion}</td>
                        <td>${tool.compatibilidad}</td>
                    </tr>
                `).join('');
            }

            // ---------- Glosario (glossary.html) ----------
            const glossaryGrid = document.getElementById('glossary-grid');
            if (glossaryGrid && data.glossary) {
                glossaryGrid.innerHTML = data.glossary.map(item => `
                    <div class="glossary-card fade-in">
                        <h3>${item.term}</h3>
                        <p>${item.definition}</p>
                    </div>
                `).join('');
                observeNewElements();
            }

            // ---------- Roadmap (roadmap.html) ----------
            const roadmapContainer = document.getElementById('roadmap-container');
            if (roadmapContainer && data.roadmap) {
                roadmapContainer.innerHTML = data.roadmap.map(item => `
                    <div class="roadmap-item fade-in">
                        <div class="roadmap-marker ${item.status === 'En desarrollo' ? 'active' : ''}"></div>
                        <div class="roadmap-content">
                            <span class="roadmap-version">${item.version}</span>
                            <span class="roadmap-status">${item.status}</span>
                            <ul>${item.features.map(f => `<li>${f}</li>`).join('')}</ul>
                        </div>
                    </div>
                `).join('');
                observeNewElements();
            }

            // ---------- Soporte (support.html) ----------
            const supportList = document.getElementById('support-list');
            if (supportList && data.support) {
                supportList.innerHTML = data.support.map(item => `
                    <div class="support-item fade-in">
                        <h3><i class="fas fa-question-circle"></i> ${item.issue}</h3>
                        <p>${item.solution}</p>
                    </div>
                `).join('');
                observeNewElements();
            }

            // ---------- FAQ (estático, pero si quieres dinamizarlo, aquí se podría) ----------
            // Como elegiste la Opción A, no hacemos nada con las FAQ.
            // Si en el futuro quieres cargarlas desde data.faq, avísame.

        })
        .catch(err => {
            console.error('Error crítico en loadData:', err);
            // Mostrar mensaje de error en todos los contenedores
            const containers = [
                'modules-container',
                'prices-container',
                'testimonials-container',
                'compatibility-body',
                'timeline-container',
                'benchmarks-grid',
                'blog-container',
                'glossary-grid',
                'roadmap-container',
                'support-list'
            ];
            containers.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:20px;">❌ Error al cargar los datos. Por favor, recarga la página.</p>`;
                }
            });
        });

    // ----------------------------
    // 2.7. Equipo (con repositorios de GitHub)
    // ----------------------------
    const teamContainer = document.getElementById('team-container');
    if (teamContainer) {
        loadData()
            .then(data => {
                if (!data || !data.team || data.team.length === 0) {
                    teamContainer.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:20px;">No se pudo cargar la información del equipo.</p>`;
                    return;
                }
                const teamMembers = data.team;
                // Obtener repositorios para cada miembro que tenga GitHub
                Promise.all(teamMembers.map(async member => {
                    if (!member.github) return { ...member, repos: [] };
                    const username = member.github.split('/').pop();
                    const repos = await getCachedRepos(username);
                    return { ...member, repos };
                }))
                .then(membersWithRepos => {
                    teamContainer.innerHTML = membersWithRepos.map(member => `
                        <div class="team-card fade-in">
                            <img src="${member.avatar || 'assets/images/default-avatar.png'}" alt="${member.name}" loading="lazy" width="100" height="100" onerror="this.src='assets/images/default-avatar.png'">
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
                });
            })
            .catch(err => {
                console.error('Error cargando equipo:', err);
                teamContainer.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:20px;">Error al cargar el equipo.</p>`;
            });
    }

    // ----------------------------
    // 2.8. FAQ Tabs (estático)
    // ----------------------------
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

    // ----------------------------
    // 2.9. Observar elementos iniciales
    // ----------------------------
    observeNewElements();

}); // Fin de DOMContentLoaded