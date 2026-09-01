# DuskCoffee ☕

A simple fullstack coffee shop website I built to practice backend engineering and cloud deployments.

## What it does
- **Live Menu & Products:** Fetching real coffee beans and menu items directly from a cloud database.
- **Guest Checkout:** Allows users to pick items, choose pickup or delivery, and complete an order flow.
- **Email OTP Verification:** Sends actual 6-digit verification codes to the user's email during checkout.
- **Contact Form:** Send feedback directly to the coffee shop inbox.

## Tech Stack
- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** Managed MySQL on Aiven
- **Hosting:** Railway (over HTTPS)
- **Email Service:** Resend API (Production) / Nodemailer (Local dev)

## The Journey & Challenges
Building this was a fun learning process with a lot of real-world debugging:
1. **Database & Cloud setup:** Connecting Express to Aiven MySQL required fixing SSL configuration (`rejectUnauthorized: false`) and handling dynamic ports.
2. **Database Auto-sleep:** Learned the hard way that free-tier cloud databases like Aiven put idle instances to sleep, so I had to make sure the app handles reconnection properly.
3. **Email OTP Delivery:** Railway blocks raw SMTP ports (587), which caused network errors when sending OTPs via Gmail SMTP. Swapped the production flow to use Resend's HTTPS API, keeping Gmail SMTP for local testing.

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/DuskCoffee.git](https://github.com/your-username/DuskCoffee.git)
   cd DuskCoffee
2. Install dependencies:
   ```bash
   npm install
3. Setup ur .env file:
   ```bash
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=duskcoffee
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   RESEND_API_KEY=your_resend_key   
4. Start the server:
   ```bash
   npm start

## About 
This project is actually inspired by **WPU**, i watched his all episode for making this project, but since the tutorial ended at part 5, ended with only static web. im tryna make this project go further, tryna make it more complex, as case for learning the flow of fullstack web, use it as experiment, and more..

and yeah the project is ended like this (for now).

ofc this project cant called as fully production level yet and i dont want to, though its just classic e-commerce web, nothing special, i ship this to stardance just for fun/messing around, i dont expect much, theres stil alot thing i can do either fix the project bugs, make it more convenient/good, add more feature, go further than this or pause it for while (idk when i'll get back to working this shit again lol) and start making something more useful.

this is the channel if u wanna to check it out:
> https://youtu.be/MCVkMmYL-aY

oh ya for the **AI** used, tbh i use a lot of ai in this project like ask him to write all of the readme, debug, add some feature, and use it as partner that i can throw any question. 

that's it, if theres other else i forgot to say/mention just tell me, dont worry to critize me, i open and i think i still need it.
