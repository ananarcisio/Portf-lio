// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
    }
});

// Intersection Observer for reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.achievement-item, .timeline-item, .skill-category, .cert-item, .project-card'
    );
    animatedElements.forEach(el => revealObserver.observe(el));
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// EmailJS Integration
document.addEventListener('DOMContentLoaded', () => {
    const emailLink = document.querySelector('a[href="mailto:anaelisafernandesn06@gmail.com"]');
    const modal = document.getElementById('contactModal');
    const closeBtn = document.querySelector('.close');
    const form = document.getElementById('contactForm');
    
    // Abrir modal ao clicar no email
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
        });
    }
    
    // Fechar modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Enviar email
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Configurar EmailJS
        emailjs.init('-SJmaTsx6MIYAH6SH');
        
        const templateParams = {
            from_name: document.getElementById('from_name').value,
            from_email: document.getElementById('from_email').value,
            message: document.getElementById('message').value,
            to_email: 'anaelisafernandesn06@gmail.com'
        };
        
        emailjs.send('anaelisafernandesn06@gma', 'template_3as2sco', templateParams)
            .then(() => {
                alert('Mensagem enviada com sucesso!');
                form.reset();
                modal.style.display = 'none';
            })
            .catch((error) => {
                console.error('Erro:', error);
                alert('Erro ao enviar mensagem. Tente novamente.');
            });
    });
});

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-color);
        font-weight: 600;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
    const reposContainer = document.getElementById("repos");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (reposContainer && prevBtn && nextBtn) {
        // Obter o tamanho dinâmico do card + gap
        const getScrollAmount = () => {
            const card = reposContainer.querySelector(".project-card");
            return card ? card.offsetWidth + 24 : 300;
        };

        const updateButtons = () => {
            const scrollLeft = Math.round(reposContainer.scrollLeft);
            const maxScrollLeft = Math.round(reposContainer.scrollWidth - reposContainer.clientWidth);

            // Seta esquerda só aparece após o primeiro avanço
            if (scrollLeft > 10) {
                prevBtn.classList.add("is-visible");
            } else {
                prevBtn.classList.remove("is-visible");
            }

            // Seta direita esconde quando não há mais conteúdo para a direita
            if (scrollLeft >= maxScrollLeft - 10) {
                nextBtn.classList.add("is-hidden");
            } else {
                nextBtn.classList.remove("is-hidden");
            }
        };

        nextBtn.addEventListener("click", () => {
            reposContainer.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
        });

        prevBtn.addEventListener("click", () => {
            reposContainer.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
        });

        reposContainer.addEventListener("scroll", updateButtons);
        window.addEventListener("resize", updateButtons);

        updateButtons();
    }
});

// PROJETOS — busca dinâmica na API do GitHub
const GH_USER = 'ananarcisio';

const SELECTED_REPOS = ['Netflix---Java','HelpDesk-Core-API','Pura-Ess-ncia']; 

const EXCLUDE = ['ananarcisio']; 

const MAX_REPOS = 6; 

const esc = (t) => String(t ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function fetchRepos() {
    const key = 'repos:' + GH_USER;
    try {
        const hit = JSON.parse(sessionStorage.getItem(key) || 'null');
        if (hit && Date.now() - hit.t < 600000) return hit.data;
    } catch (e) { /* segue sem cache */ }

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    try {
        const res = await fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`, { signal: ctrl.signal });
        if (!res.ok) throw new Error('GitHub API ' + res.status);
        const data = await res.json();
        try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), data })); } catch (e) {}
        return data;
    } finally { clearTimeout(timer); }
}

// Busca TODAS as linguagens utilizadas no repositório específico
async function fetchRepoLanguages(languagesUrl) {
    try {
        const res = await fetch(languagesUrl);
        if (!res.ok) return [];
        const langsObj = await res.json();
        // Retorna um array com os nomes das linguagens ex: ["JavaScript", "HTML", "CSS"]
        return Object.keys(langsObj); 
    } catch (e) {
        return [];
    }
}

function repoCard(r, allLanguages = []) {
    const demo = r.homepage || (r.has_pages ? `https://${GH_USER}.github.io/${r.name}/` : '');
    
    // Junta as linguagens encontradas + os topics/tags do GitHub (sem duplicar)
    const combinedTags = Array.from(new Set([...allLanguages, ...(r.topics || [])]));
    
    const tags = combinedTags
        .map((t) => `<span class="skill-tag">${esc(t)}</span>`)
        .join('');
    
    return `<div class="project-card is-visible">
        <div class="project-card-icon"><i class="fas fa-code"></i></div>
        <h3>${esc(r.name.replace(/[-_]/g, ' '))}</h3>
        <p>${esc(r.description || 'Sem descrição no GitHub.')}</p>
        <div class="project-tags">${tags || '<span class="skill-tag">Projeto</span>'}</div>
        <p class="repo-stats">
            <span><i class="far fa-star"></i> ${r.stargazers_count}</span>
            <span><i class="fas fa-code-branch"></i> ${r.forks_count}</span>
        </p>
        <div class="project-links">
            <a href="${esc(r.html_url)}" target="_blank" rel="noopener" class="project-link"><i class="fab fa-github"></i> Código</a>
            ${demo ? `<a href="${esc(demo)}" target="_blank" rel="noopener" class="project-link"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
        </div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('repos');
    const status = document.getElementById('repos-status');
    const cta = grid ? grid.querySelector('.project-card--cta') : null;
    
    // Atualiza o botão "Ver Todos" para ir direto para os seus repositórios no GitHub
    const seeAllBtn = document.querySelector('.project-card--cta a') || document.getElementById('see-all-repos');
    if (seeAllBtn) {
        seeAllBtn.href = `https://github.com/${GH_USER}?tab=repositories`;
        seeAllBtn.target = '_blank';
        seeAllBtn.rel = 'noopener';
    }

    if (!grid) return;
    if (status) status.textContent = 'Carregando projetos selecionados...';

    try {
        const allRepos = await fetchRepos();

        // Filtra os repositórios pela sua lista SELECTED_REPOS
        let filtered = allRepos.filter((r) => {
            const isNotForkOrArchived = !r.fork && !r.archived;
            const isNotExcluded = !EXCLUDE.includes(r.name);
            
            if (SELECTED_REPOS.length > 0) {
                return isNotForkOrArchived && isNotExcluded && SELECTED_REPOS.includes(r.name);
            }
            return isNotForkOrArchived && isNotExcluded;
        });

        if (SELECTED_REPOS.length > 0) {
            filtered.sort((a, b) => SELECTED_REPOS.indexOf(a.name) - SELECTED_REPOS.indexOf(b.name));
        } else {
            filtered.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
        }

        const reposToShow = filtered.slice(0, MAX_REPOS);

        if (!reposToShow.length) throw new Error('Nenhum repositório selecionado foi encontrado.');

        // Busca as linguagens de todos os projetos selecionados em paralelo
        const reposWithLangs = await Promise.all(
            reposToShow.map(async (repo) => {
                const languages = await fetchRepoLanguages(repo.languages_url);
                return repoCard(repo, languages);
            })
        );

        // Remove os cards estáticos antigos
        grid.querySelectorAll('.project-card--fill').forEach((el) => el.remove());

        // Insere os novos cards atualizados com todas as linguagens
        if (cta) {
            cta.insertAdjacentHTML('beforebegin', reposWithLangs.join(''));
        } else {
            grid.innerHTML = reposWithLangs.join('');
        }

        if (status) status.textContent = '';
    } catch (err) {
        if (status) {
            status.textContent = 'Exibindo destaques. Clique abaixo para conferir todos no GitHub.';
        }
    }
});