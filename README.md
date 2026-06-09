```text
___________                                     __      __      ___.    
\_   _____/______   _______  _______    ____   /  \    /  \ ____\_ |__  
 |    __) \_  __ \_/ __ \  \/ /\__  \  /    \  \   \/\/   // __ \| __ \ 
 |     \   |  | \/\  ___/\   /  / __ \|   |  \  \        /\  ___/| \_\ \
 \___  /   |__|    \___  >\_/  (____  /___|  /   \__/\  /  \___  >___  /
     \/                \/           \/     \/         \/       \/    \/ 
```

<div align="center">
  <p align="center">
    <a href="https://github.com/fredyyfajarr/frevan-ecommerce-web/issues">
      <img src="https://img.shields.io/github/issues/fredyyfajarr/frevan-ecommerce-web?style=for-the-badge&color=blue" alt="Issues" />
    </a>
    <a href="https://github.com/fredyyfajarr/frevan-ecommerce-web/pulls">
      <img src="https://img.shields.io/github/issues-pr/fredyyfajarr/frevan-ecommerce-web?style=for-the-badge&color=blue" alt="Pull Requests" />
    </a>
    <a href="https://github.com/fredyyfajarr/frevan-ecommerce-web/stargazers">
      <img src="https://img.shields.io/github/stars/fredyyfajarr/frevan-ecommerce-web?style=for-the-badge&color=blue" alt="Stars" />
    </a>
  </p>
</div>

## Table of Contents
- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License / Copyright](#license--copyright)

## About The Project

Frevan Ecommerce Web is a modern, blazing-fast frontend application designed for an interactive e-commerce shopping experience. Built to handle complex product browsing, cart management, and user authentication, this web client interfaces seamlessly with the Frevan API backend. It prioritizes user experience with smooth animations, intuitive state management, and a highly responsive layout tailored for all device sizes.

The platform heavily utilizes React ecosystem tools, centralizing global state across products, carts, and user sessions via Redux Toolkit. Beautiful, accessible UI components are styled using TailwindCSS and DaisyUI, reducing boilerplate while maintaining an aesthetic and consistent design language.

## Key Features

- **Robust State Management:** Utilizes Redux Toolkit for centralized `cartSlice`, `userSlice`, and `wishlistSlice`.
- **Dynamic Product Browsing:** View, filter, and add products to the cart or wishlist seamlessly.
- **Secure Authentication:** Integrated user login and registration flows via protected React Router routes.
- **Interactive UI Animations:** Engaging micro-interactions and page transitions powered by Framer Motion.
- **User Profiles & Order Tracking:** Dedicated views for users to update their profile and monitor past orders.
- **Dark/Light Mode Ready:** Incorporates `ThemeSwitcher` component integrated with DaisyUI themes.

## Tech Stack

- **Framework:** [React 18](https://reactjs.org/) & [Vite](https://vitejs.dev/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & `react-redux`
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [AOS](https://michalsnik.github.io/aos/)
- **HTTP Client:** [Axios](https://axios-http.com/)

## Project Structure

```text
frevan-ecommerce-web/
├── src/
│   ├── api.js              # Axios configuration and API endpoints
│   ├── components/         # Reusable UI components (Nav, Footer, Buttons, Modals)
│   ├── context/            # React Contexts (e.g., CartContext)
│   ├── features/           # Redux slices (cartSlice, userSlice, wishlistSlice)
│   ├── Layouts/            # Page wrappers and layout structures
│   ├── page/               # Route components (Home, Cart, Checkout, Profile, etc.)
│   ├── utils/              # Helper functions
│   ├── store.js            # Redux store configuration
│   ├── App.jsx             # Main application component & Router wrapper
│   └── main.jsx            # Entry point for React DOM
├── public/                 # Static assets (images, logos)
├── tailwind.config.js      # Tailwind & DaisyUI configuration
├── vite.config.js          # Vite build tool configuration
└── package.json            # Project dependencies and scripts
```

## Getting Started

### Prerequisites
Make sure you have Node.js installed to run the Vite development server.
- Node.js (v18.x or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fredyyfajarr/frevan-ecommerce-web.git
   ```
2. Navigate into the project directory:
   ```bash
   cd frevan-ecommerce-web
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables (if applicable). Create a `.env` file referencing the backend API URL.

## Usage

1. Start the Vite development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to the local server URL provided in your terminal (typically `http://localhost:5173`).
3. You can browse products, simulate adding them to your cart or wishlist, and proceed to checkout flows.
4. To build for production, run:
   ```bash
   npm run build
   ```

## Contributing

Contributions make the open-source community a fantastic place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License / Copyright

Copyright &copy; 2026 Fredy Fajar Adi Putra. All Rights Reserved.
