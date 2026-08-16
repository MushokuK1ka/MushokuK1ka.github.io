// =========================================================
// Mushoku Blog Theme Switcher
// =========================================================

const themes = {
    paper: {
        name: 'Paper White',
        desc: '极简学术 · 长文阅读'
    },
    cyber: {
        name: 'Cyber Neon',
        desc: '赛博朋克 · 开发者风格'
    },
    sakura: {
        name: 'Sakura Journal',
        desc: '日式杂志 · 生活记录'
    },
    glass: {
        name: 'Glass UI',
        desc: 'MacOS 毛玻璃 · 现代设计'
    },
    terminal: {
        name: 'Retro Terminal',
        desc: '复古终端 · 极客模式'
    }
};

function displayDateTime() {
    const datetimeElement = document.getElementById('datetime');

    if (datetimeElement) {
        const now = new Date();
        const formatted = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        datetimeElement.textContent = formatted;
    }
}

function applyTheme(theme) {
    if (!themes[theme]) {
        theme = 'paper';
    }

    document.documentElement.dataset.theme = theme;
    localStorage.setItem('mushoku-theme', theme);

    document.querySelectorAll('.theme-option').forEach((button) => {
        button.setAttribute(
            'aria-checked',
            button.dataset.theme === theme ? 'true' : 'false'
        );
    });

    const current = document.querySelector('.theme-switcher__current');
    if (current) {
        current.textContent = themes[theme].name;
    }
}

function createThemeSwitcher() {
    const wrapper = document.createElement('div');
    wrapper.className = 'theme-switcher';

    wrapper.innerHTML = `
        <button class="theme-switcher__toggle" type="button" aria-expanded="false">
            <span class="theme-switcher__dot"></span>
            <span class="theme-switcher__current">Theme</span>
        </button>
        <div class="theme-switcher__menu" role="radiogroup">
            ${Object.entries(themes).map(([key, value]) => `
                <button class="theme-option" type="button" data-theme="${key}" aria-checked="false">
                    <span class="theme-option__name">${value.name}</span>
                    <span class="theme-option__check">✓</span>
                    <span class="theme-option__desc">${value.desc}</span>
                </button>
            `).join('')}
            <a class="theme-preview-link" href="theme-preview.html">查看五种主题预览 →</a>
        </div>
    `;

    document.body.appendChild(wrapper);

    const toggle = wrapper.querySelector('.theme-switcher__toggle');

    toggle.addEventListener('click', () => {
        const opened = wrapper.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(opened));
    });

    wrapper.querySelectorAll('.theme-option').forEach((button) => {
        button.addEventListener('click', () => {
            applyTheme(button.dataset.theme);
            wrapper.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', (event) => {
        if (!wrapper.contains(event.target)) {
            wrapper.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    displayDateTime();

    const savedTheme = localStorage.getItem('mushoku-theme') || 'paper';
    applyTheme(savedTheme);
    createThemeSwitcher();

    console.log('博客已加载，主题系统已启用！');
});
