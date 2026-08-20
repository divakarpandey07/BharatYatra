# 🇮🇳 BharatYatra (भारत यात्रा) - Comprehensive India Tourism Portal

BharatYatra is a production-grade, high-performance web application built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, and **Tailwind CSS**. It provides detailed travel guides, district-by-district heritage insights, AI travel itinerary generation, and landmark discovery for all 36 States and Union Territories (covering 750+ Districts) across India.

---

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router & Server Components)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS + Framer Motion (Animations)
- **Icons:** Lucide React
- **Data Engine:** Local High-Performance JSON/TS Datasets (Zero API Key Dependency)
- **Interactive Maps:** `@svg-maps/india`

---

## 🌟 Key Features

1. **All 36 States & UTs Explorer:** Detailed guides, top destinations, local food, culture, and travel tips.
2. **750+ District Guides:** Deep coverage of every district with verified high-definition landmark photography and local travel itineraries.
3. **AI Travel Architect:** Instant offline & AI-powered itinerary generator supporting English and Hinglish prompts (e.g., *"Suggest a 3 days trip to Eluru within 5000 budget"*).
4. **Compare Destinations:** Side-by-side comparison of states and districts.
5. **Wishlist & Saved Places:** Client-side local storage bookmarking for travel planning.
6. **Strict District-Scoped Content Engine:** Zero cross-district place mixing or generic placeholders.

---

## 🛠️ Project Structure

```text
BharatYatra/
├── app/                        # Next.js 14 App Router Directory
│   ├── api/                    # REST API Endpoints (States & Districts)
│   ├── compare/                # Compare Destinations Page
│   ├── components/             # Reusable UI Client Components
│   ├── district/[stateId]/     # District Detail Route
│   ├── experiences/            # Category-wise Travel Experiences
│   ├── states/                 # States Directory & Detail Routes
│   ├── wishlist/               # Saved Destinations & Wishlist Page
│   ├── layout.tsx              # Root Layout & Navigation
│   └── page.tsx                # Homepage
├── src/                        # Core Data Layer & Business Logic
│   ├── data/                   # Structured Datasets (indiaData, customDistricts, kaggleDistricts)
│   └── lib/                    # Data Service Layer, Rate Limiter & AI Itinerary Engine
├── public/                     # Static Assets & Images
├── .env.example                # Environment Variable Template
├── next.config.mjs             # Next.js Configuration
├── tsconfig.json               # TypeScript Compiler Config
└── package.json                # Project Dependencies & Scripts
```

---

## ⚙️ Environment & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/divakarpandey07/BharatYatra.git
   cd BharatYatra
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional):**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📄 API Endpoints

- `GET /api/states` - Returns list of all 36 States & Union Territories.
- `GET /api/states/[stateId]` - Returns state details and district list.
- `GET /api/districts/[districtId]` - Returns complete place details for a given district.

---

## 🤝 Contributing

Contributions are welcome! Please ensure all code passes static analysis (`npm run lint`) and production build checks (`npm run build`) before opening a Pull Request.

---

## 📜 License

MIT License. Developed with ❤️ for exploring India.
