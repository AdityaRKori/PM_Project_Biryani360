
# 🍲 Biryani360: The Art of Dum
### A Hyper-Vertical Food Discovery Platform

![Version](https://img.shields.io/badge/Version-1.3.0-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Prototype-blue?style=for-the-badge)
![Stack](https://img.shields.io/badge/React-Tailwind-blueviolet?style=for-the-badge)

---

## 🎓 Academic Context
**Project Type:** PGDM Capstone / Product Management Lab  
**Focus Area:** Product vs. Service Differentiation, UX Strategy, & Feature Prioritization.

> **Objective:** To simulate the lifecycle of a modern food-tech product, moving beyond simple aggregation to creating an *experience-led* marketplace. This project demonstrates the ability to think like a Product Manager by balancing user delight (UI/UX) with business viability (Logistics/Gamification).

---

## 🚀 Executive Summary
**Biryani360** is not just another food delivery app; it is a premium, sensory-focused discovery platform dedicated exclusively to the art of *Dum Pukht*. 

While generic aggregators (Zomato/Swiggy) commoditize food into list items, Biryani360 treats every handi as a story. We solve the "Paradox of Choice" by curating only heritage kitchens and enhance unit economics through gamified logistics (Eco-Walk).

---

## 🧠 Product Management Analysis

### 1. The Core Problem
*   **Cognitive Load:** Users are overwhelmed by thousands of options when they just want a specific, high-quality meal.
*   **Loss of Heritage:** Authentic kitchens get buried under fast-food chains in generic algorithms.
*   **High Logistics Costs:** Last-mile delivery eats into thin restaurant margins.

### 2. Product vs. Service Differentiation
As part of the PGDM coursework, we analyzed the distinct value propositions:

| Dimension | **The Product (The App)** | **The Service (The Experience)** |
| :--- | :--- | :--- |
| **Tangibility** | **Digital Interface:** Dark mode UI, Haptic feedback, Steam animations. | **Physical Good:** The temperature, aroma, and packaging of the Biryani upon arrival. |
| **Core Value** | **Discovery:** "Story-first" restaurant pages that educate the user on the origin. | **Reliability:** Timely delivery and hygiene standards (Simulated via Tracking). |
| **User Role** | **Co-Creator:** Customizing spice levels via the "Rice Grain Slider". | **Consumer:** Enjoying the meal and engaging in the community. |
| **Scale** | **Infinite:** Code scales to millions of users instantly. | **Finite:** Limited by kitchen capacity and rider fleet. |

### 3. Feature Tree (MoSCoW Method)

*   **Must Have (MVP):**
    *   📍 Geolocation & Maps (Leaflet Integration)
    *   🛒 Dynamic Cart with Spice Customization
    *   💳 Simulated Checkout & Order Tracking
*   **Should Have (Differentiation):**
    *   🌿 **Eco-Walk:** Gamified pickup to reduce delivery costs & carbon footprint.
    *   📖 **Story Mode:** Magazine-style restaurant details vs. standard menus.
    *   🔥 **Sensory UI:** Steam animations and "Rice Grain" sliders.
*   **Could Have (Retention):**
    *   🏆 **Leaderboard:** "Spice Master" badges for frequent reviewers.
    *   👨‍🍳 **Masterclass:** Internal recipes page (Content-led commerce).
*   **Won't Have (For Now):**
    *   Live Rider GPS (Simulated for Demo), Real Payment Gateway.

---

## ✨ Key Features & UX Design

### 🎨 Sensory-First Design
Moved away from the sterile white interfaces of competitors. Used a **Charcoal & Saffron** palette to evoke the feeling of a clay pot cooking over coal.
*   *Implementation:* Custom Tailwind colors (`bg-charcoal-950`, `text-saffron-500`).

### 📖 Story-First Restaurant Pages
Instead of dumping a menu immediately, we force a "Slow UX" approach. Users see the *Origin Story* and *Chef's Craft* first, building anticipation and justifying premium pricing.

### 🌿 Eco-Walk (Business Logic)
**The Problem:** Delivery costs ₹40-60 per order.
**The Product Solution:** A toggle in the cart that awards users "Wallet Points" for walking to pick up food within 1km.
**Business Impact:** Reduces fleet dependency and increases profit margins while promoting health.

---

## 📸 Application Screenshots

| **Landing & Discovery** | **Story & Menu** |
| :---: | :---: |
| <img src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600" alt="Landing Concept" width="400"/> <br/> *Cinematic Entry* | <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600" alt="Menu Concept" width="400"/> <br/> *Interactive Menu* |

| **Gamification (Eco-Walk)** | **Community & Leaderboard** |
| :---: | :---: |
| <img src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=600" alt="Eco Walk" width="400"/> <br/> *Sustainability Logic* | <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=600" alt="Community" width="400"/> <br/> *Social Proof* |

*(Note: Images above are conceptual representations of the React UI)*

---

## 🛠️ Technical Implementation

This project is built using modern frontend architecture to ensure performance and scalability.

*   **Frontend Library:** React 18
*   **Styling:** Tailwind CSS (Custom Config for Dark/Light Themes)
*   **Icons:** Lucide React
*   **Maps:** Leaflet / React-Leaflet
*   **State Management:** React Hooks (`useState`, `useEffect`, `useContext` pattern)

### Folder Structure
```bash
src/
├── components/       # Reusable UI (Cart, Menu, Tracking, etc.)
├── constants.ts      # Mock Data (Restaurants, Recipes)
├── types.ts          # TypeScript Interfaces
├── App.tsx           # Main Router & Layout
└── index.css         # Tailwind directives & Animations
```

---

## 🏁 Getting Started

To run this demo locally for evaluation:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/biryani360.git
    ```
2.  **Install Dependencies**
    ```bash
    npm install
    ```
3.  **Run Development Server**
    ```bash
    npm start
    ```
4.  **Open in Browser**
    Navigate to `http://localhost:3000`

---

## 📝 License
This project is for educational purposes only (PGDM Coursework). All images used are from Unsplash/Placeholder sources.

**Developed by:** [Your Name/Aditya]
