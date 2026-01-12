const modal = document.getElementById('orderModal');
  const closeBtn = document.getElementById('closeModal');
  const itemName = document.getElementById('itemName');
  const durationInput = document.getElementById('duration');
  const priceInput = document.getElementById('price');
  const totalInput = document.getElementById('total');
  const orderBtn = document.getElementById('orderBtn');

  // 🔹 Fungsi buka modal
function openModal(name, price = 50000) {
  itemName.textContent = 'Pesan ${name}'; // ← gunakan backtick agar nama muncul
  priceInput.value = price;
  durationInput.value = 2;
  totalInput.value = price * durationInput.value;
  modal.style.display = 'flex';
}

// 🔹 Hitung total otomatis saat durasi berubah
durationInput.addEventListener('input', () => {
  const total = durationInput.value * priceInput.value;
  totalInput.value = total;
});

// 🔹 Tutup modal
closeBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

// 🔹 Klik card (lapangan & equipment)
document.querySelectorAll('.card, .equipment-card').forEach(card => {
  card.addEventListener('click', () => {
    const titleEl = card.querySelector('h3') || card.querySelector('p');
    const name = titleEl ? titleEl.textContent : 'Item';
    const price = card.dataset.price ? parseInt(card.dataset.price) : 50000;
    openModal(name, price);
  });
});

// 🔹 Tombol pesan
orderBtn.addEventListener('click', () => {
  const orderData = {
    item: itemName.textContent.replace('Pesan ', ''),
    duration: durationInput.value,
    time: document.getElementById('time').value,
    price: priceInput.value,
    total: totalInput.value,
    date: new Date().toLocaleString()
  };

  // Simpan ke localStorage
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(orderData);
  localStorage.setItem('orders', JSON.stringify(orders));

  alert('✅ Pemesanan berhasil!\nItem: ${orderData.item}\nTotal: Rp${orderData.total}');
  modal.style.display = 'none';
});