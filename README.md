# Kelinciku

Interactive prototype of **Kelinciku**, a school communication app for SNIK (Sekolah Nusantara Ibu Kelinci), an Indonesian preschool. It connects teachers, parents, and school administrators in one place.

This is a prototype for demonstration. All names, students, fees, and dates in it are fictional. The login is an example, not real authentication, and there is no backend.

## Try it

Open `index.html` in a browser. Nothing needs to be installed. An internet connection is needed the first time, because React and the fonts load from a CDN.

Demo accounts (password for all: `kelinciku`). The login page also fills these in for you.

| Role | Name | Email |
| --- | --- | --- |
| Parent | Bunda Anindya (Kirana, Kelas Kancil) | anindya@keluarga.example |
| Parent | Ayah Reza (Arka, Kelas Merak) | reza@keluarga.example |
| Teacher | Ibu Ratna (Kelas Kancil) | ratna@snik.example |
| Teacher | Ibu Sekar (Kelas Merak) | sekar@snik.example |
| Teacher | Pak Bayu (Kelas Merak) | bayu@snik.example |
| Administrator | Ibu Hartini | hartini@snik.example |

The account menu at the top right switches roles without logging in again, opens the public Open House page, and resets the demo data. The **Ponsel / Desktop** switch shows any page in phone size.

## What it does

**Parent** (designed for phones)

- Beranda: today's attendance, the latest class activity, teacher notes, announcements, upcoming events
- Aktivitas: daily activity feed with learning objective, developmental area, and skills
- Perkembangan: teacher observations in five areas, milestones, and weekly reports
- Pesan: messages with the class teachers
- Profil: child data, tuition (SPP) status, photo consent switch

**Teacher**

- Dashboard with a to-do list for the day
- Kehadiran: mark present, late, or absent, and correct past days
- Aktivitas: publish a daily activity with photo and skills
- Laporan: weekly report template, with drafts and preview
- Siswa: search and filter the class, write observations, message parents

**Administrator**

- Overview of students, teachers, attendance, weekly reports, and Open House registrations
- Siswa & Kelas: read-only directory
- Kehadiran: summary per class and a five-day table
- Laporan: which classes have published their weekly report, with a reminder button
- Pembayaran: tuition status per student (paid, due, late), mark as paid, send reminders
- Pengumuman: publish or withdraw announcements

**Open House**: a public page that introduces SNIK and Kelinciku, with a registration form.

The roles are connected. For example, when a teacher saves attendance, publishes an activity, or publishes a weekly report, the parent of that class sees it, and the administrator's report count updates.

## Privacy rules in the prototype

- A parent sees only their own child's records.
- A teacher sees only their own class, and never payment data.
- Photo consent is set by the parent and shown to the teacher.
- The public Open House page shows no student data or photos.

## Project structure

```
index.html        Built app, ready to open or host
build.js          Bundles src/ into index.html
package.json
src/
  app.jsx         App shell, account switcher, routing between views
  data.js         Fixed data, date helpers, and the sample data
  store.js        App state, actions, and saving to the browser
  ui.jsx          Shared components (icons, cards, forms, chat, batik tiles)
  login.jsx       Example login page
  parent.jsx      Parent screens
  teacher.jsx     Teacher screens
  admin.jsx       Administrator screens, including payments
  openhouse.jsx   Public Open House page
  styles.css      All styles
```

## Change the code

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run build
```

Edit the files in `src/`, run `npm run build`, then reload `index.html`. Do not edit `index.html` by hand, because the build overwrites it.

## Where the data lives

Data is saved in the browser's `localStorage`, on that device only. It is not shared between devices or users. "Atur ulang data demo" in the account menu returns everything to the sample data.

Sample photos are shown as batik-pattern tiles. Photos a teacher uploads are stored in the same browser storage.

## Put it online with GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, then save.
4. After a minute, the app is live at `https://<your-username>.github.io/<repository-name>/`.

## Built with

React 18 (loaded from cdnjs), plain CSS, and esbuild for bundling. Fonts: Plus Jakarta Sans and DM Sans.
