📌 Local Services & Shop Finder

A MERN stack web application that connects local shopkeepers (service providers) with customers. Shopkeepers can list their businesses, and customers can search for nearby services based on location, category, and filters.

🌟 Features

👤 Shopkeeper Features

Signup/Login (JWT Authentication)

Manage Profile & Business Information

Add, Edit, or Remove Services

Set Business Hours & Availability

Location Setup & Google Maps Integration

🛒 Customer Features

Signup/Login

Search for Services by Location, Category & Filters

View Shop Listings & Business Details

Check Availability & Ratings

Leave Reviews

🛠️ Admin Features (Future Scope)

Manage Users & Shop Listings

Approve/Reject Business Profiles

Moderate Reviews & Content

🏗️ Tech Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB & Mongoose

Authentication: JWT (JSON Web Tokens)

Geolocation: Google Maps API

🚀 Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/your-repo/local-services-shop-finder.git
cd local-services-shop-finder

2️⃣ Backend Setup

cd backend
npm install

Configure Environment Variables

Create a .env file inside the backend folder:

MONGO_URI=mongodb+srv://your_mongo_uri
JWT_SECRET=your_secret_key
PORT=5000

Run the backend server:

npm start

3️⃣ Frontend Setup

cd ../frontend
npm install
npm start

⚡ API Endpoints (Backend)

Method

Endpoint

Description

POST

/api/auth/signup

User Signup

POST

/api/auth/login

User Login

GET

/api/shops

Fetch All Shops

GET

/api/shops/:id

Get Shop Details

POST

/api/reviews

Add Review

🔄 Git Workflow

Each team member works on their own branch (ashish, teammate)

Develop features & push changes to GitHub

Create a Pull Request (PR) to main

Merge after review

📌 To-Do (Future Enhancements)



🤝 Contributing

Feel free to contribute by forking the repository and submitting a pull request!

📜 License

This project is MIT Licensed.

🔥 **Developed by **🚀

Ashish Rolan

Harsh Tiwari