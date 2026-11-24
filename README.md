# Farewell Vintern Web Invitation

Web undangan digital bernuansa **Fun & Playful** untuk acara perpisahan kelompok intern **Vintern**, dibangun dengan **Next.js (App Router)**, **TypeScript**, dan **Tailwind CSS**.

## Fitur Utama
- **Cover Undangan Interaktif** dengan efek confetti saat dibuka.
- **Personalisasi Nama Tamu via URL**: tambahkan `?to=Nama+Tamu` di ujung link (contoh: `http://localhost:3000/?to=Kak+Budi`), nama tamu akan muncul di cover, hero, dan otomatis terisi di form RSVP.
- **Live Countdown Timer** menuju tanggal & jam acara + tombol **Simpan ke Google Calendar**.
- **Detail Acara, Rundown & Google Maps** (peta embed, tombol buka Google Maps, dan salin alamat).
- **RSVP Konfirmasi Kehadiran** sederhana (Nama, Hadir / Tidak Hadir, dan catatan opsional) yang tersimpan otomatis di `data/rsvps.json`.

## Cara Menjalankan Lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) (atau coba `http://localhost:3000/?to=Tim+Viskal`).

## Cara Mengubah Detail Acara
Cukup edit satu file: `src/config/event.ts` untuk mengganti:
- Detail kelompok intern (`Vintern`), periode magang, quote, dan fun stats.
- Tanggal & jam acara (`dateISO` & `endISO` untuk countdown dan Google Calendar).
- Lokasi, alamat, link Google Maps, dress code, dan rundown acara.
