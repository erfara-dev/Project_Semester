const tableBody = document.querySelector('#ordersTable tbody');
    const clearBtn = document.getElementById('clearOrders');

    // Ambil data dari localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Tampilkan data ke tabel
    if (orders.length > 0) {
      orders.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${order.item}</td>
          <td>${order.duration} jam</td>
          <td>${order.time}</td>
          <td>Rp${order.price}</td>
          <td>Rp${order.total}</td>
          <td>${order.date}</td>
        `;
        tableBody.appendChild(row);
      });
    } else {
      tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Belum ada pesanan</td></tr>';
    }

    // Tombol hapus semua pesanan
    clearBtn.addEventListener('click', () => {
      if (confirm('Yakin ingin menghapus semua pesanan?')) {
        localStorage.removeItem('orders');
        location.reload();
      }
    });

    window.addEventListener('storage', () => location.reload());