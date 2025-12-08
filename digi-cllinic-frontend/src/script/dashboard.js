alert('dashboard.js loaded');
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
    fetchObatTable();
    setTimeout(() => {
        showNotification();
    }, 500);
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    console.log('Login attempt:', email, password);
    const user = { email };
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'home-login.html';
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('registerRole') ? document.getElementById('registerRole').value : null;
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

function openEditModal(namaObat, penyakit, tglProduksi, tglKadaluarsa, stok, batasStok, harga, dosis, keterangan) {
    document.getElementById('namaObat').value = namaObat;
    document.getElementById('penyakit').value = penyakit;
    document.getElementById('tglProduksi').value = tglProduksi;
    document.getElementById('tglKadaluarsa').value = tglKadaluarsa;
    document.getElementById('stok').value = stok;
    document.getElementById('batasStok').value = batasStok;
    document.getElementById('harga').value = harga;
    document.getElementById('dosis').value = dosis;
    document.getElementById('keterangan').value = keterangan;
    document.getElementById('editModal').classList.add('show');
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('show');
}

function saveChanges() {
    const form = document.getElementById('editObatForm');
    const id = form.dataset.id;
    if (form.checkValidity()) {
        fetch(`https://ii3120-tugas-besar-digiclinic.onrender.com/api/dashboard/medicine/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: document.getElementById('namaObat').value,
                disease: document.getElementById('penyakit').value,
                // productionDate: document.getElementById('tglProduksi').value,
                // expiryDate: document.getElementById('tglKadaluarsa').value,
                stock: parseInt(document.getElementById('stok').value),
                stockLimit: parseInt(document.getElementById('batasStok').value),
                price: parseInt(document.getElementById('harga').value),
                dose: document.getElementById('dosis').value,
                description: document.getElementById('keterangan').value
            })
        })
        .then(res => res.json())
        .then(result => {
            alert(result.message);
            closeEditModal();
            fetchObatTable();
        });
    } else {
        alert('Harap isi semua field yang diperlukan');
    }
}

function openAddModal() {
    document.getElementById('addObatForm').reset();
    document.getElementById('addModal').classList.add('show');
}

function closeAddModal() {
    document.getElementById('addModal').classList.remove('show');
}

function formatDateDisplay(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
}

function saveNewObat() {
    const form = document.getElementById('addObatForm');
    if (!form.checkValidity()) {
        alert('Harap isi semua field yang diperlukan');
        return;
    }
    const nama = document.getElementById('addNama').value.trim();
    const penyakit = document.getElementById('addPenyakit').value.trim();
    const prodIso = document.getElementById('addTglProduksi').value;
    const expIso = document.getElementById('addTglKadaluarsa').value;
    const stok = document.getElementById('addStok').value;
    const batas = document.getElementById('addBatasStok').value;
    const harga = document.getElementById('addHarga').value;
    const dosis = document.getElementById('addDosis').value.trim();
    const keterangan = document.getElementById('addKeterangan').value.trim();

    fetch('https://ii3120-tugas-besar-digiclinic.onrender.com/api/dashboard/medicine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: nama,
            disease: penyakit,
            productionDate: prodIso,
            expiryDate: expIso,
            stock: parseInt(stok),
            stockLimit: parseInt(batas),
            price: parseInt(harga),
            dose: dosis,
            description: keterangan
        })
    })
    .then(res => res.json())
    .then(result => {
        if (result.medicine && result.medicine.id) {
            alert('Obat baru berhasil ditambahkan');
            closeAddModal();
            fetchObatTable(); 
        } else {
            alert('Gagal menambah obat');
        }
    });
}

function deleteMedicine(id) {
    if (!confirm('Hapus obat ini?')) return;
    fetch(`https://ii3120-tugas-besar-digiclinic.onrender.com/api/dashboard/medicine/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(result => {
        alert(result.message);
        fetchObatTable(); 
    });
}

function escapeQuotes(str) {
    return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function fetchObatTable() {
    fetch('https://ii3120-tugas-besar-digiclinic.onrender.com/api/dashboard/dashboard')
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('obatTableBody');
            tbody.innerHTML = '';
            let lowStockList = [];
            data.medicines.forEach(med => {
                const stockClass = med.stock < 100 ? 'stock-warning' : 'stock-ok';
                if (med.stock < 100) lowStockList.push(`${med.name} (Stok: ${med.stock})`);
                tbody.innerHTML += `
                    <tr>
                        <td>${med.name}</td>
                        <td>${med.disease}</td>
                        <td>${med.productionDate}</td>
                        <td>${med.expiryDate}</td>
                        <td class="${stockClass}">${med.stock}</td>
                        <td>${med.stockLimit}</td>
                        <td>Rp ${med.price}</td>
                        <td>${med.dose}</td>
                        <td>${med.description}</td>
                        <td>
                            <button class="action-btn btn-edit" onclick="showEditForm(${med.id})">Edit</button>
                            <button class="action-btn btn-delete" onclick="deleteMedicine(${med.id})">Hapus</button>
                        </td>
                    </tr>
                `;
            });

            if (lowStockList.length > 0) {
                showLowStockNotification(lowStockList);
            }
        });
}

function showLowStockNotification(list) {
    const notifModal = document.getElementById('notificationModal');
    const notifList = notifModal.querySelector('.notification-list');
    notifList.innerHTML = '';
    list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        notifList.appendChild(li);
    });
    notifModal.style.display = 'flex';
}

function showEditForm(id) {
    fetch('https://ii3120-tugas-besar-digiclinic.onrender.com/api/dashboard/medicine/' + id)
        .then(res => res.json())
        .then(med => {
            document.getElementById('namaObat').value = med.name;
            document.getElementById('penyakit').value = med.disease;
            document.getElementById('tglProduksi').value = med.productionDate;
            document.getElementById('tglKadaluarsa').value = med.expiryDate;
            document.getElementById('stok').value = med.stock;
            document.getElementById('batasStok').value = med.stockLimit;
            document.getElementById('harga').value = med.price;
            document.getElementById('dosis').value = med.dose;
            document.getElementById('keterangan').value = med.description;
            document.getElementById('editObatForm').dataset.id = id;
            document.getElementById('editModal').classList.add('show');
        });
}

window.addEventListener('click', (event) => {
    const editModal = document.getElementById('editModal');
    const addModal = document.getElementById('addModal');
    if (event.target === editModal) closeEditModal();
    if (event.target === addModal) closeAddModal();
});

document.addEventListener('DOMContentLoaded', () => {
    setAllLogos();
    showApotekerDashboard();
});