# LukášŘiháček.cz – Prezentační web psychologických služeb

Tato webová aplikace slouží jako moderní prezentační platforma pro Lukáše Řiháčka, který poskytuje psychologické služby. Cílem je nabídnout přehledné informace o službách, zkušenostech a možnostech kontaktu pro potenciální klienty.

---

## 🌐 Live ukázka

> `https://lukasrihacek.cz`

---

## 🧠 Funkce

- Prezentační obsah (o mně, nabídka služeb, ceník)
- Možnost kontaktu prostřednictvím formuláře
- Responzivní design optimalizovaný pro mobilní zařízení
- Admin rozhraní pro správu obsahu (přes Strapi)

---

## 🛠 Použité technologie

### Frontend

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- HTML5

### Backend

- [Strapi CMS](https://strapi.io/) – headless CMS pro správu obsahu
- REST API (možno rozšířit o GraphQL)

---

## 🚀 Spuštění projektu lokálně

### 🔧 Požadavky

- Node.js (doporučeno 18+)
- Yarn nebo npm
- Git

### 📁 Struktura

/projekt/
├── frontend/
└──── backend/ # Strapi backend

### 1. Klonování repozitáře

```bash
git clone https://github.com/DanielKroupa/lukasrihacek.git
cd lukasrihacek
```

### 2. Spuštění frontend části

- npm install # nebo yarn
- npm run dev # spuštění frontend serveru

### 3. Spuštění backend části

- cd backend # nebo yarn
- npm run develop # spuštění frontend serveru ve vývojářském režimu
