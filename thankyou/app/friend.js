// app/[name].js
import { useRouter } from 'next/router';

export default function CustomPage() {
  const router = useRouter();
  const { name } = router.query;  // Mengambil nama dari parameter URL

  // Sesuaikan konten berdasarkan nama
  const getMessage = (name) => {
    switch (name) {
      case 'mawar':
        return 'Halo Mawar! Terima kasih sudah menjadi teman yang luar biasa!';
      case 'gotik':
        return 'Halo Kia! Terima kasih sudah menjadi teman yang penuh keceriaan!';
      case 'celo':
        return 'Halo Celo! Terima kasih sudah menjadi teman yang baik!';
      default:
        return 'Halo Teman! Selamat datang di halaman spesialmu!';
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>{getMessage(name)}</h1>
      <img
        src={`/path/to/${name}-character.png`} // Ganti dengan gambar sesuai nama
        alt={`Karakter ${name}`}
        style={{ width: '200px', borderRadius: '50%' }}
      />
      <p>Ini halaman khusus untukmu, {name}!</p>
      <button onClick={() => alert(`Terima kasih telah mengunjungi halaman ${name}!`)}>
        Klik Aku!
      </button>
    </div>
  );
}
