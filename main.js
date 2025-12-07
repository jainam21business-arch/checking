// main.js - General Website Functionality

// 1. Initialize AOS (Scroll Animations)
AOS.init({ duration: 1000, once: true });

// 2. Mobile Menu Logic
function openNav() { document.getElementById("myNav").style.width = "100%"; }
function closeNav() { document.getElementById("myNav").style.width = "0%"; }

// 3. Booking Modal Logic
function openModal() { document.getElementById('bookingModal').style.display = 'flex'; }
function closeModal() { document.getElementById('bookingModal').style.display = 'none'; }

// 4. Scroll Progress Bar
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("scrollProgress").style.width = scrolled + "%";
    
    // Trigger Counter Animation if visible
    const statsBar = document.querySelector('.stats-bar');
    if(statsBar && statsBar.getBoundingClientRect().top < window.innerHeight) {
        startCounters();
    }
};

// 5. Number Counter Logic
let countersStarted = false;
function startCounters() {
    if(countersStarted) return;
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText.replace('+','').replace(',','');
            const inc = target / 200;
            if(count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target.toLocaleString() + "+";
            }
        };
        updateCount();
    });
    countersStarted = true;
}

// 6. Cookie Banner Logic
window.addEventListener('load', () => {
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            document.getElementById('cookie-banner').style.bottom = '0';
        }, 2000);
    }
});

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-banner').style.bottom = '-100px';
}
