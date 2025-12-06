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
            
            // Show notification for low stock
            setTimeout(() => {
                showNotification();
            }, 500);
        }

        function handleLogin(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simulated login - replace with actual authentication
            console.log('Login attempt:', email, password);
            alert('Login berhasil! (Fitur lengkap akan datang)');
            showDashboard();
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
            currentUser = null;
            showDashboard();
            alert('Anda telah logout');
        }

        function showNotification() {
            document.getElementById('notificationModal').style.display = 'flex';
        }

        function closeNotification() {
            document.getElementById('notificationModal').style.display = 'none';
        }