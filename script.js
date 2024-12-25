const container = document.querySelector('.destination-cards');
container.addEventListener('wheel', (event) => {
    event.preventDefault();
    container.scrollBy({ left: event.deltaY, behavior: 'smooth' });
});

// Inisialisasi EmailJS
emailjs.init('xSOBS_fPTwRXnY3f_'); // Ganti dengan User ID Anda dari EmailJS

// Event listener untuk tombol Send
document.getElementById('sendButton').addEventListener('click', function () {
    const emailInput = document.getElementById('email').value;

    // Validasi email
    if (emailInput === '' || !emailInput.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    // Kirim email menggunakan EmailJS
    emailjs.send('service_f53xnbd', 'template_vqr6zx9', {
        to_email: emailInput, // Email yang diinput pengguna
        message: 'Saya siap mendapatkan promo dari TSM Travel'
    })
    .then(() => {
        // Tampilkan modal sukses
        const modal = document.getElementById('successModal');
        modal.style.display = 'flex';

        // Sembunyikan modal setelah 3 detik
        setTimeout(() => {
            modal.style.display = 'none';
        }, 3000);

        // Reset input email
        document.getElementById('email').value = '';
    })
    .catch((error) => {
        console.error('EmailJS error:', error);
        alert('Failed to send email. Please try again.');
    });
});

// Ambil semua tautan menu dan elemen section
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

// Fungsi untuk memperbarui menu aktif
function updateActiveMenu() {
    let index = sections.length;

    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove('active'));
    navLinks[index].classList.add('active');
}

// Tambahkan event listener untuk scroll
window.addEventListener('scroll', updateActiveMenu);

// Jalankan fungsi pertama kali saat halaman dimuat
updateActiveMenu();

// Fungsi untuk scroll mulus saat menu diklik
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Mencegah perilaku default klik

        // Ambil ID target dari href
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        // Scroll ke bagian target dengan animasi mulus
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});


