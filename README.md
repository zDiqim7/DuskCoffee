# DuskCoffee

Simple coffee shop website built as a practice project. This repo evolved from a simple static build into a full-stack web application featuring dynamic catalog rendering, guest checkout, and cloud database integration.

## About

DuskCoffee is a practice project aimed at mastering full-stack web development fundamentals—ranging from frontend UI layout and DOM manipulation to RESTful API design, database schemas, and cloud deployment.

Inspired by **WPU (Web Programming Unpas)**, hosted by Pak Sandhika Galih.
Check out his original tutorial playlist:
> [Membuat WEBSITE Kedai Kopi RESPONSIVE - WPU Playlist](https://youtu.be/kvyJPvJKTBI?si=1Ja-VCTyIJdvF-WC)

I followed his project series, but since the tutorial series stopped before reaching full backend/database integration, I decided to take this project further by building a custom Express.js backend, relational database, and deploying it live.

---

## Live Preview & Deployment

- **Live Web App:** [https://duskcoffee-production.up.railway.app](https://duskcoffee-production.up.railway.app)
- **Frontend Pages (GitHub Pages static preview):**
  - [Index Page](https://zdiqim7.github.io/DuskCoffee/public/index.html)
  - [Menu Page](https://zdiqim7.github.io/DuskCoffee/public/menu.html)
  - [Products Page](https://zdiqim7.github.io/DuskCoffee/public/products.html)
  - [Checkout Page](https://zdiqim7.github.io/DuskCoffee/public/checkout.html)

---

## Current Features

- **Fullstack Architecture:** Decoupled static frontend (`public/`) served via Express.js backend (`src/`) with dynamic environment handling.
- **Dynamic Catalog API:** Menu items (pastries, beverages, food) and Products (coffee beans) fetched dynamically from a live Cloud MySQL database via REST endpoints (`/api/products/menu` & `/api/products/beans`).
- **Guest Checkout Schema:** Relational database setup (`orders` and `order_items` tables with proper Foreign Key & Check constraints) allowing customers to order without registering an account.
- **Interactive Shopping Cart:** Slide-out cart panel with real-time DOM updates, item list tracking, and checkout routing.
- **Responsive Dark Theme UI:** Built using CSS custom variables (`:root`), Flexbox, Grid, and Feather Icons.

---

## Tech Stack

**Frontend:**
- HTML5 & CSS3 (Custom Variables, Flexbox, Grid)
- Vanilla JavaScript (Fetch API, DOM Manipulation, Async/Await)
- Feather Icons

**Backend & Infrastructure:**
- **Node.js & Express.js:** RESTful API & Static file server
- **Database:** MariaDB / MySQL (`mysql2/promise` connection pool)
- **Cloud Hosting & Deployment:** 
  - **Railway:** Express backend service (Live with SSL)
  - **Aiven Cloud:** Managed MySQL Database
- **Environment Management:** `dotenv`

---

## How to Run Locally

If you want to run and test the project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/zDiqim7/DuskCoffee.git](https://github.com/zDiqim7/DuskCoffee.git)
   cd DuskCoffee

2. **Install depedencies:**
   ```bash
   npm install

3. **Set up environment variables:** 

   create .env file in the root directory
   ```bash
    PORT=3000
    NODE_ENV=development
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=duskcoffee_db 

4. **Import database schema & seed:**
    ```bash
    mariadb -h 127.0.0.1 -u your_db_user -p duskcoffee_db < schema.sql
    mariadb -h 127.0.0.1 -u your_db_user -p duskcoffee_db < seed.sql

5. **Start the local server:**
   ```bash
   npm start

---

## Might do later
1. Email OTP Verification MechanismCurrent Status: Temporarily disabled.Future Idea: Swapping Resend for Nodemailer with Gmail App Passwords so guests can actually get their verification codes... if I feel like setting up SMTP again.

2. Order Queue & Confirmation FlowCurrent Status: The database saves transactions fine, but the post-checkout experience is pretty plain right now.Future Idea: Adding a real-time order queue screen (pending $\rightarrow$ paid $\rightarrow$ completed) and an instant digital receipt, assuming I don't get distracted by another project.

3. Contact Form MailerCurrent Status: The UI form looks nice, but submit doesn't send anything yet.Future Idea: Hooking it up to the mailer service whenever I get around to fixing the email pipeline.

4. Nodemailer in Express routes for OTP, Auto-clear the localStorage cart after checkout and Call it a day and grab an actual coffee.

## Contributing

This is primarily a personal practice repo, but contributions and suggestions are welcome. If you want to help:
- Fork and open a PR with a short description of changes
- Keep changes focused and explain why they help the learning goals

## License
Distributed under the MIT License. See LICENSE for more information.

## Contact
Author: zDiqim7
Project: DuskCoffee — practice project for learning front-end and later full-stack skills.
