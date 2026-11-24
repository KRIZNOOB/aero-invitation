/**
 * Google Apps Script untuk menerima data RSVP dari Next.js dan menyimpannya ke Google Sheets.
 *
 * Cara pakai:
 * 1. Buat Google Spreadsheet baru.
 * 2. Klik menu: Extensions -> Apps Script.
 * 3. Hapus semua kode bawaan, lalu paste seluruh kode ini dan Save (Ctrl + S).
 * 4. Klik: Deploy -> New deployment -> pilih jenis "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Klik Deploy, izinkan akses (Authorize access -> Advanced -> Go to ... -> Allow).
 * 6. Copy Web app URL (berakhiran /exec) dan masukkan ke GOOGLE_SHEETS_WEBHOOK_URL
 *    di .env.local (lokal) dan Vercel Environment Variables (production).
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Buat header otomatis jika baris pertama masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Waktu (WITA)", "Nama", "Kehadiran", "Catatan / Alasan"]);
      sheet.getRange(1, 1, 1, 4).setFontWeight("bold");
    }

    var data = JSON.parse(e.postData.contents || "{}");
    var timestamp = data.timestamp || new Date().toLocaleString("id-ID");
    var name = data.name || "";
    var status = data.status || "";
    var note = data.note || "-";

    sheet.appendRow([timestamp, name, status, note]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "Viskal Outing RSVP Webhook Ready" })
  ).setMimeType(ContentService.MimeType.JSON);
}
