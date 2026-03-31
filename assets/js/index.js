document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       THEME TOGGLE
    ========================= */
    const toggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    function applyTheme(theme) {
        const isLight = theme === 'light';

        document.body.classList.toggle('light-mode', isLight);
        if (toggle) toggle.checked = isLight;

        document.documentElement.style.setProperty(
            '--icon',
            isLight ? '"🌙"' : '"☀️"'
        );

        localStorage.setItem('theme', theme);
    }

    if (toggle) {
        toggle.addEventListener('change', () => {
            const theme = toggle.checked ? 'light' : 'dark';
            applyTheme(theme);
        });
    }

    /* inicialização do tema */
    if (currentTheme) {
        applyTheme(currentTheme);
    } else {
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        applyTheme(prefersLight ? 'light' : 'dark');
    }


    /* =========================
       PERFIS (LOCALSTORAGE)
    ========================= */
    const perfilLinks = document.querySelectorAll('.profile');

    perfilLinks.forEach(link => {
        link.addEventListener('click', () => {

            const item = link.closest('.profiles li');
            if (!item) return;

            const nomeEl = item.querySelector('.nome-perfil');
            const imgEl = item.querySelector('img');

            const nome = nomeEl ? nomeEl.textContent.trim() : '';
            let imgSrc = imgEl ? imgEl.getAttribute('src') : '';

            // Ajuste de caminho relativo
            if (
                imgSrc &&
                !imgSrc.startsWith('http') &&
                !imgSrc.startsWith('/') &&
                !imgSrc.startsWith('..')
            ) {
                imgSrc = '../' + imgSrc;
            }

            try {
                localStorage.setItem('perfilAtivoNome', nome);
                localStorage.setItem('perfilAtivoImagem', imgSrc);
            } catch (e) {
                console.warn('Erro ao salvar perfil no localStorage', e);
            }
        });
    });

});

