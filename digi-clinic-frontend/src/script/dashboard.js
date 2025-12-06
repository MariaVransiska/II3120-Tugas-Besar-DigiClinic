let currentUser = null;

        function showDashboard() {
            document.getElementById('mainDashboard').classList.remove('hidden');
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('registerForm').classList.add('hidden');
            document.getElementById('apotekerDashboard').classList.add('hidden');
            
            updateNavbar(false);
        }

        function showLogin() {
            document.getElementById('mainDashboard').classList.add('hidden');
            document.getElementById('loginForm').classList.remove('hidden');
            document.getElementById('registerForm').classList.add('hidden');
            document.getElementById('apotekerDashboard').classList.add('hidden');
        }

        function showRegister() {
            document.getElementById('mainDashboard').classList.add('hidden');
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('registerForm').classList.remove('hidden');
            document.getElementById('apotekerDashboard').classList.add('hidden');
        }

        function showApotekerDashboard() {
            document.getElementById('mainDashboard').classList.add('hidden');
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('registerForm').classList.add('hidden');
            document.getElementById('apotekerDashboard').classList.remove('hidden');
            
            // Show notification for low stock
            setTimeout(() => {
                showNotification();
            }, 500);
        }

        function handleLogin(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            
            // Simulasi login sebagai apoteker
            currentUser = {
                email: email,
                role: 'apoteker'
            };
            
            updateNavbar(true);
            showApotekerDashboard();
        }

        function handleRegister(event) {
            event.preventDefault();
            alert('Registrasi berhasil! Silakan login.');
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

        function fetchDashboardData() {
            fetch('http://localhost:3000/api/dashboard/dashboard')
                .then(res => res.json())
                .then(data => {
                    document.querySelectorAll('.stat-value')[0].textContent = data.medicines.length;
                    document.querySelectorAll('.stat-value')[1].textContent = data.medicines.filter(m => m.stock < 40).length;
                    document.querySelectorAll('.stat-value')[2].textContent = '-';
                });
        }

        function fetchNotifications() {
            fetch('http://localhost:3000/api/notifications/notifications')
                .then(res => res.json())
                .then(notifications => {
                    const notifList = document.querySelector('.notification-list');
                    notifList.innerHTML = '';
                    notifications.forEach(n => {
                        notifList.innerHTML += `<li><strong>${n.message}</strong></li>`;
                    });
                    document.getElementById('notificationModal').style.display = 'block';
                });
        }

        function closeNotification() {
            document.getElementById('notificationModal').style.display = 'none';
        }

        window.addEventListener('DOMContentLoaded', () => {
            fetchDashboardData();
            fetchNotifications();
        });