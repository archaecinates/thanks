// app/page.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Halo, ini halaman utama!</h1>
      <img
        src="/path/to/your-character.png" // Ganti dengan path gambar karakter kamu
        alt="Karakter Utama"
        style={{ width: '200px', borderRadius: '50%' }}
      />
      <p>Ini adalah halaman karakter utama. Pilih teman yang ingin kamu beri kejutan!</p>

      <div>
        <Link href="/mawar">
          <button style={{ margin: '10px', padding: '10px' }}>Kirim Ke Mawar</button>
        </Link>
        <Link href="/gotik">
          <button style={{ margin: '10px', padding: '10px' }}>Kirim Ke Kia</button>
        </Link>
        <Link href="/cello">
          <button style={{ margin: '10px', padding: '10px' }}>Kirim Ke Celo</button>
        </Link>
      </div>
    </div>
  );
}
