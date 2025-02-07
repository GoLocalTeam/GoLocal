<h1>📌 Local Services & Shop Finder</h1>

<p>A <strong>MERN stack web application</strong> that connects local shopkeepers (service providers) with customers. Shopkeepers can list their businesses, and customers can search for nearby services based on location, category, and filters.</p>

<hr>

<h2>🌟 Features</h2>

<h3>👤 Shopkeeper Features</h3>
<ul>
  <li>Signup/Login (JWT Authentication)</li>
  <li>Manage Profile & Business Information</li>
  <li>Add, Edit, or Remove Services</li>
  <li>Set Business Hours & Availability</li>
  <li>Location Setup & Google Maps Integration</li>
</ul>

<h3>🛒 Customer Features</h3>
<ul>
  <li>Signup/Login</li>
  <li>Search for Services by Location, Category & Filters</li>
  <li>View Shop Listings & Business Details</li>
  <li>Check Availability & Ratings</li>
  <li>Leave Reviews</li>
</ul>

<h3>🛠️ Admin Features (Future Scope)</h3>
<ul>
  <li>Manage Users & Shop Listings</li>
  <li>Approve/Reject Business Profiles</li>
  <li>Moderate Reviews & Content</li>
</ul>

<hr>

<h2>🏗️ Tech Stack</h2>
<ul>
  <li><strong>Frontend:</strong> React.js, Tailwind CSS</li>
  <li><strong>Backend:</strong> Node.js, Express.js</li>
  <li><strong>Database:</strong> MongoDB & Mongoose</li>
  <li><strong>Authentication:</strong> JWT (JSON Web Tokens)</li>
  <li><strong>Geolocation:</strong> Google Maps API</li>
</ul>

<hr>

<h2>🚀 Installation & Setup</h2>

<h3>1️⃣ Clone the Repository</h3>
<pre>
git clone https://github.com/your-repo/local-services-shop-finder.git
cd local-services-shop-finder
</pre>

<h3>2️⃣ Backend Setup</h3>
<pre>
cd backend
npm install
</pre>

<h4>Configure Environment Variables</h4>
<p>Create a <code>.env</code> file inside the <code>backend</code> folder:</p>
<pre>
MONGO_URI=mongodb+srv://your_mongo_uri
JWT_SECRET=your_secret_key
PORT=5000
</pre>

<p>Run the backend server:</p>
<pre>
npm start
</pre>

<h3>3️⃣ Frontend Setup</h3>
<pre>
cd ../frontend
npm install
npm start
</pre>

<hr>

<h2>⚡ API Endpoints (Backend)</h2>
<table border="1">
  <tr>
    <th>Method</th>
    <th>Endpoint</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/auth/signup</td>
    <td>User Signup</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/auth/login</td>
    <td>User Login</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/shops</td>
    <td>Fetch All Shops</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/shops/:id</td>
    <td>Get Shop Details</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/reviews</td>
    <td>Add Review</td>
  </tr>
</table>

<hr>

<h2>🔄 Git Workflow</h2>
<ol>
  <li>Each team member works on <strong>their own branch</strong> (<code>ashish</code>, <code>teammate</code>)</li>
  <li>Develop features & push changes to GitHub</li>
  <li>Create a <strong>Pull Request (PR) to main</strong></li>
  <li>Merge after review</li>
</ol>

<hr>

<h2>📌 To-Do (Future Enhancements)</h2>
<ul>
  <li>☑ Add Booking System</li>
  <li>☑ Implement Notifications</li>
  <li>☑ Payment Integration</li>
</ul>

<hr>

<h2>🤝 Contributing</h2>
<p>Feel free to contribute by <strong>forking</strong> the repository and submitting a <strong>pull request</strong>!</p>

<hr>

<h2>📜 License</h2>
<p>This project is <strong>MIT Licensed</strong>.</p>

<hr>

<p>🔥 <strong>Developed by Ashish Rolan and Harsh Tiwari</strong> 🚀</p>
