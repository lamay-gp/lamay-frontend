# Lamay

Lamay is a responsive online store for browsing and purchasing Apple gadgets and accessories. The application provides product discovery, filtering, product details, favourites, a shopping cart, checkout, and contact pages in a clean, mobile-friendly interface.

## Live Preview

[Open the deployed Lamay store](https://lamay-gp.github.io/lamay-frontend/)

## Technologies Used

- React 19 and React DOM
- TypeScript
- Vite
- React Router
- Tailwind CSS 4
- shadcn/ui and Base UI components
- Zustand for client-side state management
- i18next and react-i18next for English and Ukrainian translations
- Embla Carousel for product and promotional sliders
- EmailJS for contact form delivery
- Lucide React for icons
- ESLint, Prettier, and Husky for code quality and Git hooks

## Features

- Responsive home page with promotional banners and product sections
- Product catalog with search, sorting, category filters, price range, capacity, and colour filters
- Product detail pages with image galleries, zoom, specifications, and related products
- Add-to-cart, quantity selection, cart summary, and multi-step checkout flow
- Favourites list persisted in the browser
- English and Ukrainian language switching
- Contact form integration through EmailJS
- Mobile navigation and responsive layouts for desktop, tablet, and mobile screens
- GitHub Pages deployment through GitHub Actions

## Getting Started

### Prerequisites

- Node.js `24.21.0` (the required version is listed in `.nvmrc`)
- npm

### Clone the repository

```bash
git clone https://github.com/lamay-gp/lamay-frontend.git
cd lamay-frontend
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the project root and add the variables required by the application:

```env
VITE_GADGETS_URL=https://raw.githubusercontent.com/superpooperxxx/mate-group-project/refs/heads/master/public/gadgets
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

The gadgets URL supplies the product catalogue. EmailJS values are only needed for the contact form.

### Run the project locally

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

### Create a production build

```bash
npm run build
```

### Check code quality

```bash
npm run lint
npm run format:check
```

## Design Reference

The interface was developed from the Lamay product-store design brief. No public Figma file is included in this repository.
