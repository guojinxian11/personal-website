// 导航栏当前项高亮
const sections = document.querySelectorAll('.section, .experience-section');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// 滚动揭示动画
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// 移动端菜单
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-links');

function openMobileMenu() {
  navMenu.style.display = 'flex';
  navMenu.style.position = 'absolute';
  navMenu.style.top = 'calc(100% + 12px)';
  navMenu.style.left = '0';
  navMenu.style.right = '0';
  navMenu.style.flexDirection = 'column';
  navMenu.style.background = '#fff';
  navMenu.style.border = '3px solid #000';
  navMenu.style.borderRadius = '16px';
  navMenu.style.padding = '16px';
  navMenu.style.boxShadow = '6px 6px 0px #000';
  navMenu.style.gap = '8px';
  navMenu.style.zIndex = '999';
  navMenu.style.listStyle = 'none';
  mobileToggle.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  navMenu.style.display = 'none';
  mobileToggle.setAttribute('aria-expanded', 'false');
}

if (mobileToggle) {
  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (navMenu.style.display === 'flex') {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // 点击菜单项后关闭
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // 点击外部关闭
  document.addEventListener('click', (e) => {
    if (navMenu.style.display === 'flex' && !mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

// 跑马灯复制内容以实现无缝滚动
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.innerHTML += marqueeTrack.innerHTML;
}

// 时间轴节点自动生成
function createTimelineDots() {
  const timeline = document.querySelector('.game-timeline');
  if (!timeline) return;
  
  // 清除旧节点
  timeline.querySelectorAll('.timeline-dot').forEach(d => d.remove());
  
  const cards = timeline.querySelectorAll('.game-card-wrapper');
  cards.forEach(card => {
    const dot = document.createElement('div');
    dot.className = 'timeline-dot';
    const top = card.offsetTop + card.offsetHeight / 2;
    dot.style.top = top + 'px';
    timeline.appendChild(dot);
  });
}

// 页面加载完成后生成节点
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(createTimelineDots, 100);
  });
} else {
  setTimeout(createTimelineDots, 100);
}

// 窗口大小变化时重新生成
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(createTimelineDots, 200);
});

// 邮箱点击复制
document.querySelectorAll('[data-email]').forEach(card => {
  card.addEventListener('click', () => {
    const email = card.getAttribute('data-email');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
    } else {
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    showToast('邮箱已复制到剪贴板！');
  });
});

// Toast 提示
function showToast(message) {
  let toast = document.querySelector('.toast-message');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-message';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// 双击作品集卡片跳转小红书链接
document.querySelector('.photo-gallery').addEventListener('dblclick', (e) => {
  const item = e.target.closest('.photo-item');
  if (!item) return;
  const link = item.querySelector('.photo-link');
  if (link && link.href) {
    window.open(link.href, '_blank');
  }
});
