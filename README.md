# DuskCoffee

Simple, static coffee shop website built as a practice project. This repo is a work-in-progress — currently a static build using HTML, CSS, and a bit of JavaScript. I plan to keep updating and making it more complex as I learn new tools and techniques.

## About

DuskCoffee is a small practice project to build a simple website for a coffee shop. The goal is to practice front-end fundamentals (layout, styling, responsive design, small JS interactions) and to create something that can be shipped and iterated on.

Inspired by `WPU (Web Programming Unpas)`, or as known in the community as Mr. Sandhika Galih.

Check out this playlist: 
 > https://youtu.be/kvyJPvJKTBI?si=1Ja-VCTyIJdvF-WC 

I followed his project series, but since there are no new updates/videos and it stopped at the payment gateway feature, I decided to take this project further.

## Current features

- **Fullstack Architecture:** Decoupled static frontend (`public/`) served via Express backend (`src/`).
- **Dynamic Catalog:** Menu (food & beverages) and Products (coffee beans & merch) rendered dynamically via Express REST API and MariaDB.
- **Guest Checkout:** Customers verify their email with a one-time code before placing an order.
- **Interactive Shopping Cart:** Slide-out cart panel with empty state placeholder, scrollable item list, and sticky checkout footer.
- **Responsive & Modular Design:** Dark coffee-themed UI built with custom CSS variables (`:root`), Flexbox/Grid, and Feather Icons.

## Tech stack

**Frontend:**
- HTML5 & CSS3 (Custom Variables, Flexbox, Grid)
- Vanilla JavaScript (Fetch API, DOM Manipulation, Event Delegation)
- Feather Icons

**Backend & Database:**
- Node.js & Express.js (REST API, Static File Serving)
- MariaDB / MySQL (using `mysql2/promise` connection pool, 1 schema file)
- `resend` or `nodemailer` (OTP email delivery)
- `dotenv` (Environment Variable Management)

---

## How to run locally
nah u dont need to, just wait me complete this **** backend so i can deploy on resend.com

but u can still see the preview oh the html page, just change/add the name of the file html `https://zdiqim7.github.io/DuskCoffee/public/name.html`

or just copy (click if it can) this url and paste to ur browser
> https://zdiqim7.github.io/DuskCoffee/public/index.html

> https://zdiqim7.github.io/DuskCoffee/public/menu.html

> https://zdiqim7.github.io/DuskCoffee/public/products.html

> https://zdiqim7.github.io/DuskCoffee/public/checkout.html

---

## Future plans/roadmap

[x] Migrate static layout into Express static server structure.

[x] Set up local MariaDB schema for menu and products.

[x] Build dynamic API routes (GET /api/products/menu & /beans).


[ ] Implement localStorage basket state for persistent shopping cart item management.

[ ] Deploy Fullstack App (Frontend static via Render/Vercel, Express API via Render/Railway, Database via Aiven/Railway

Note: when I integrate frameworks or a backend, how you preview the project will change (from opening files to running a dev server or visiting a deployed site). That's fine — it will be part of the learning process.

## Contributing

This is primarily a personal practice repo, but contributions and suggestions are welcome. If you want to help:
- Fork and open a PR with a short description of changes
- Keep changes focused and explain why they help the learning goals

## License
Distributed under the MIT License. See LICENSE for more information.

## Contact
Author: zDiqim7
Project: DuskCoffee — practice project for learning front-end and later full-stack skills.
