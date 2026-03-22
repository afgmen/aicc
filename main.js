// ─── i18n for form placeholders & options ───
const i18n = {
    en: {
        name: 'Full Name',
        company: 'Company Name',
        email: 'Work Email',
        phone: 'Phone Number (optional)',
        interestDefault: 'What are you interested in?',
        interests: [
            'AI Speech Recognition',
            'Real-Time Translation',
            'AI Callbot & Chatbot',
            'Call Analytics & QA',
            'Omnichannel Integration',
            'Full Platform Demo',
            'Partnership Inquiry',
            'Other'
        ],
        message: 'Tell us about your needs... (optional)'
    },
    vi: {
        name: 'Họ và tên',
        company: 'Tên công ty',
        email: 'Email công việc',
        phone: 'Số điện thoại (không bắt buộc)',
        interestDefault: 'Bạn quan tâm đến giải pháp nào?',
        interests: [
            'Nhận dạng Giọng nói AI',
            'Dịch thuật Thời gian thực',
            'AI Callbot & Chatbot',
            'Phân tích Cuộc gọi & QA',
            'Tích hợp Đa kênh',
            'Demo Toàn bộ Nền tảng',
            'Hợp tác Kinh doanh',
            'Khác'
        ],
        message: 'Cho chúng tôi biết nhu cầu của bạn... (không bắt buộc)'
    }
};

let currentLang = 'vi';

function updateFormLang(lang) {
    const t = i18n[lang];
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.querySelector('[name="name"]').placeholder = t.name;
    form.querySelector('[name="name"]').setAttribute('aria-label', t.name);
    form.querySelector('[name="company"]').placeholder = t.company;
    form.querySelector('[name="company"]').setAttribute('aria-label', t.company);
    form.querySelector('[name="email"]').placeholder = t.email;
    form.querySelector('[name="email"]').setAttribute('aria-label', t.email);
    form.querySelector('[name="phone"]').placeholder = t.phone;
    form.querySelector('[name="phone"]').setAttribute('aria-label', t.phone);
    form.querySelector('[name="message"]').placeholder = t.message;
    form.querySelector('[name="message"]').setAttribute('aria-label', t.message);
    form.querySelector('[name="interest"]').setAttribute('aria-label', t.interestDefault);

    const select = form.querySelector('[name="interest"]');
    const currentVal = select.value;
    select.innerHTML = '<option value="" disabled selected>' + t.interestDefault + '</option>';
    t.interests.forEach((opt, i) => {
        const o = document.createElement('option');
        o.value = i18n.en.interests[i]; // always submit English value
        o.textContent = opt;
        if (i18n.en.interests[i] === currentVal) o.selected = true;
        select.appendChild(o);
    });
}

// Language switcher
function setLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.body.classList.toggle('lang-vi', lang === 'vi');
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const isActive = btn.textContent.trim() === lang.toUpperCase();
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    updateFormLang(lang);
}

// Mobile menu toggle
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    const btn = document.getElementById('hamburger');
    nav.classList.toggle('open');
    btn.classList.toggle('open');
}

function showSuccess() {
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    // Close menu when a nav link is clicked
    document.getElementById('navLinks').querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            document.getElementById('navLinks').classList.remove('open');
            document.getElementById('hamburger').classList.remove('open');
        });
    });

    // Copyright year
    document.getElementById('copyrightYear').textContent = new Date().getFullYear();

    // Initialize form
    updateFormLang('vi');

    // ─── Form Submission ───
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(this);

        const subject = encodeURIComponent('AICC.vn Demo Request - ' + data.get('company'));
        const body = encodeURIComponent(
            'Name: ' + data.get('name') + '\n' +
            'Company: ' + data.get('company') + '\n' +
            'Email: ' + data.get('email') + '\n' +
            'Phone: ' + (data.get('phone') || 'N/A') + '\n' +
            'Interest: ' + data.get('interest') + '\n' +
            'Message: ' + (data.get('message') || 'N/A')
        );

        window.open('mailto:sales@aicc.vn?subject=' + subject + '&body=' + body);
        showSuccess();
    });

    // ─── Intersection Observer for scroll animations ───
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
