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
    if (form.checkValidity()) {
        alert('Perubahan berhasil disimpan!');
        closeEditModal();
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

    const tbody = document.getElementById('obatTableBody');
    const tr = document.createElement('tr');

    const prodDisplay = formatDateDisplay(prodIso);
    const expDisplay = formatDateDisplay(expIso);

    tr.innerHTML = `
        <td>${nama}</td>
        <td>${penyakit}</td>
        <td>${prodDisplay}</td>
        <td>${expDisplay}</td>
        <td class="${Number(stok) <= Number(batas) ? 'stock-warning' : 'stock-ok'}">${stok}</td>
        <td>${batas}</td>
        <td>Rp ${Number(harga).toLocaleString('id-ID')}</td>
        <td>${dosis}</td>
        <td>${keterangan}</td>
        <td>
            <button class="action-btn btn-edit" onclick="openEditModal('${escapeQuotes(nama)}','${escapeQuotes(penyakit)}','${prodIso}','${expIso}','${stok}','${batas}','${harga}','${escapeQuotes(dosis)}','${escapeQuotes(keterangan)}')">Edit</button>
            <button class="action-btn btn-delete" onclick="deleteRow(this)">Hapus</button>
        </td>
    `;
    tbody.appendChild(tr);
    closeAddModal();
    alert('Obat baru berhasil ditambahkan');
}

function deleteRow(btn) {
    const tr = btn.closest('tr');
    if (confirm('Hapus obat ini?')) tr.remove();
}

function escapeQuotes(str) {
    return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

window.addEventListener('click', (event) => {
    const editModal = document.getElementById('editModal');
    const addModal = document.getElementById('addModal');
    if (event.target === editModal) closeEditModal();
    if (event.target === addModal) closeAddModal();
});

document.addEventListener('DOMContentLoaded', () => {
    try {
        setAllLogos();
    } catch (e) {
        console.warn('error running setAllLogos', e);
    }
});