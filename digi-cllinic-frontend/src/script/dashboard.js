let currentUser = null;

        function hideAllDashboards() {
            document.getElementById('mainDashboard').classList.add('hidden');
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('registerForm').classList.add('hidden');
            document.getElementById('apotekerDashboard').classList.add('hidden');
        }

        function showDashboard() {
            hideAllDashboards();
            document.getElementById('mainDashboard').classList.remove('hidden');
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('registerForm').classList.add('hidden');
            document.getElementById('apotekerDashboard').classList.add('hidden');
            
            updateNavbar(false);
        }

        function showLogin() {
            hideAllDashboards();
            document.getElementById('loginForm').classList.remove('hidden');
            document.getElementById('registerForm').classList.add('hidden');
            document.getElementById('apotekerDashboard').classList.add('hidden');
        }

        function showRegister() {
            hideAllDashboards();
            document.getElementById('registerForm').classList.remove('hidden');
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('apotekerDashboard').classList.add('hidden');
        }

        function showApotekerDashboard() {
            hideAllDashboards();
            document.getElementById('apotekerDashboard').classList.remove('hidden');
            
            setTimeout(() => {
                showNotification();
            }, 500);
        }

        function handleLogin(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simulated login (ganti dengan autentikasi nyata nanti)
            console.log('Login attempt:', email, password);

            // Simpan status login di sessionStorage dan redirect ke halaman setelah login
            const user = { email }; // tambahkan role jika ada
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'home-login.html';
        }

        function handleRegister(event) {
            event.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const role = document.getElementById('registerRole').value;
            
            // Simulated registration - replace with actual backend
            console.log('Register attempt:', name, email, role);
            alert('Pendaftaran berhasil! Silahkan login.');
            showLogin();
        }

        function updateNavbar(isLoggedIn) {
            const navMenu = document.getElementById('navMenu');
            
            if (isLoggedIn && currentUser && currentUser.role === 'apoteker') {
                navMenu.innerHTML = `
                    <li><a href="#" onclick="showApotekerDashboard()">Manajemen Obat</a></li>
                    <li><a href="#" onclick="logout()">Logout</a></li>
                `;
            } else {
                navMenu.innerHTML = `
                    <li><a href="#" onclick="showLogin()">Login</a></li>
                    <li><a href="#" onclick="showRegister()">Register</a></li>
                `;
            }
        }

        function logout() {
            try {
                sessionStorage.removeItem('currentUser');
            } catch (e) {
                console.warn('logout storage error', e);
            }
            window.location.href = 'index.html';
        }

        function showNotification() {
            document.getElementById('notificationModal').style.display = 'flex';
        }

        function closeNotification() {
            document.getElementById('notificationModal').style.display = 'none';
        }

        // pastikan semua logo pakai file yang sama
        function setAllLogos() {
            try {
                const logos = document.querySelectorAll('.logo-img');
                logos.forEach(img => {
                    const desired = '../images/DIGICLINIC.png';
                    if (img.getAttribute('src') !== desired) {
                        img.setAttribute('src', desired);
                    }
                });
                console.info('All logos set to images/DIGICLINIC.png');
            } catch (e) {
                console.warn('setAllLogos error', e);
            }
        }

        // jalankan cek setelah DOM siap (tambahkan setAllLogos sebelum pengecekan)
        document.addEventListener('DOMContentLoaded', () => {
            try {
                // pastikan semua logo merujuk ke gambar yang disepakati
                setAllLogos();
            } catch (e) {
                console.warn('error running setAllLogos', e);
            }
            
            // ...if existing code had checkLogoAvailability or other init, keep it here...
            // existing init (e.g., check logo availability) will still run
        });