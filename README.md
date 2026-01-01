# Collab.io | Brand & Influencer Collaboration Platform

**Developed by Abhinay Mente**  
*Aspiring CSE Student | AI & Web Development Enthusiast*

**🔴 Live Demo:** [https://brand-collab1.vercel.app](https://brand-collab1.vercel.app)

---

## 📖 Overview

**Collab.io** is a full-stack web application designed to streamline the influencer marketing ecosystem. It bridges the gap between brands and content creators by providing a unified, role-based platform for discovery, negotiation, and campaign management.

This project demonstrates a modern, scalable approach to web development, leveraging **Next.js 16 (App Router)** for server-side rendering and **Tailwind CSS 4** for a high-performance, premium design system.

## 🚀 Key Features

### 🏢 For Brands (The Client)
*   **Campaign Management Dashboard**: Create and track marketing campaigns with specific budgets (₹) and timelines.
*   **Smart Discovery**: Filterable search engine to find influencers based on niche, engagement metrics, and location.
*   **Applicant Review**: Streamlined interface to review proposals from creators.

### 🎨 For Creators (The Talent)
*   **Professional Media Kit**: Dynamic profile page showcasing portfolio, social signals, and audience demographics.
*   **Opportunity Feed**: "Find Work" section to browse and apply for relevant brand campaigns.
*   **Proposal System**: Structured submission flow for pitch decks and rate cards.

## 🛠️ Technical Architecture

This application was built with a focus on **performance**, **maintainability**, and **user experience**.

*   **Frontend**: React 19, TypeScript, Tailwind CSS (OKLCH Color implementation).
*   **Framework**: Next.js 16 using the App Router for SEO-optimized Server Components.
*   **UI System**: Custom component library built on top of `clsx` and `class-variance-authority` (CVA) for maximum reusability.
*   **State Management**: URL-based state (search params) for shareable, bookmarkable UI states.

## � Getting Started

This project is configured for easy local development.

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/brand-collab.git
    cd brand-collab
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the application**
    ```bash
    npm run dev
    ```
    Access the app at [http://localhost:3000](http://localhost:3000).

## 🔮 Roadmap

*   **Database Integration**: Migration from mock data to a robust PostgreSQL schema (via Supabase).
*   **Real-time Messaging**: Implementation of WebSockets for instant brand-creator negotiation logic.
*   **Payment Gateway**: Secure escrow integration using Stripe Connect.

---
*© 2024 Abhinay Mente. Open for collaboration and feedback.*
