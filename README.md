# 🛒 Daily Price Tracker for Local Markets (কাঁচাবাজার)

## 📌 Project Name: TazaRate
## 📌 Project Slogan: “Track Fresh, Shop Fresh.”


## 📌 Project Objective

To help users get updated local market prices of essential items and compare them across different markets. Vendors will update prices, and users can use the platform to view, track, and compare data. Includes monetization options like product purchases and sponsor advertisement placements.

---

## ✅ Submission Requirements

- 🔁 20+ meaningful client commits & 12+ server commits with descriptive messages  
- 📄 Include a `README.md` with:  
  - Project name  
  - Purpose  
  - Live URL  
  - Key features  
  - NPM packages used  
- 📱 Fully responsive on mobile, tablet & desktop  
- 🔐 Secure Firebase & MongoDB credentials via environment variables  
- 🎨 Eye-pleasing, recruiter-friendly UI (No “Gobindo” design)  

---

## 🚀 Deployment Guidelines

- ❌ No CORS/404/504 errors in production  
- 🔁 Live site must work on landing and refresh  
- 🔐 Private route refresh must not redirect to login  
- 🌐 Add domain in Firebase Auth settings  

---

## 🧱 Layout & Structure

- **Header:** Dynamic per route  
- **Footer:** Logo, name, contact, social links  
- **Main Section:** Route-based and dynamic  

---

## 🔐 Authentication & Authorization

### 📝 User Registration:
- Form for users to sign up as **user**.
- **Input Fields:**  
  - Name  
  - Email  
  - Photo (You can use a direct link or upload via **imgbb**)  
  - Password  
- 🔍 **Note:** Don’t worry about standardization — implement as described here.




### 🔑 User Login:
- JWT-based authentication.  
- Token is generated upon successful login to securely manage sessions.  
- 🔗 **Google Login:**  
  - Implement social login using Google.  
  - Upon login, assign role as **user** by default.  
  - 💡 *Hint:* Ensure the system assigns the user role gracefully during social login.




### 🔒 Role-Based Access Control:
- Use **middleware** to check user roles and permissions.  
- Protect routes to ensure only authorized users can access specific endpoints.


---

## 🏠 Home Page

### 🔝 Navbar Includes:
- 🌟 Logo  
- 📝 Website Name  
- 🛍️ All Products (Public route)  
- 🔐 Login / Sign Up (if not logged in)  
- 👤 User profile picture (if logged in)  
- 🚪 Logout button  
- 📊 Dashboard button (based on role)

### 📷 Banner
- React Responsive Carousel with a local market-themed background  

## 🛍️ Product Section

Display a set of **6 product cards** from different market days or categories using the **MongoDB `limit` operator**.

### 📦 Each Product Card Includes:
- 🖼️ Product Image  
- 🛒 Market Name  
- 📅 Date  
- 📋 List of Items with Current Prices (e.g., 🧅 Onion — ৳30/kg)  
- 🔍 **“View Details”** button  

### 🔐 View Details Behavior:
- If **not logged in**: Clicking the button redirects to the **Login** page  
- If **logged in**: Redirects to the **Product Details** page  

> ⚠️ Only **approved products** should be displayed  
> 🚫 Do **not** show pending or rejected items  
> 🧠 **Hint:** Check if the price data corresponds to **today’s** or **recent** dates

---

## 📢 Advertisement Highlights

Explore all current promotions and vendor ads through an **interactive carousel**.  
- Ads are **dynamically loaded** from the database  
- Data is managed via the **Vendor Dashboard**

---

## ➕ Extra Sections

Add **2 relevant and meaningful extra sections** to enrich the homepage.  
Examples:  
- 📈 Market Trends Overview  
- 🧑‍🌾 Vendor Testimonials  
- 📰 Market News Updates  
- 🎯 Price Saving Tips

---

## 🎨 Animations

- Must implement **smooth animations** using **Framer Motion**  
- Apply animations to:
  - 🎯 Banner section  
  - 🛍️ Product Section  
  - ✅ Other major sections  


### Footer
- Logo, website name, contact info, terms & conditions, social media links

---

## 📄 Product Details Page (Private Route)

This is where the full breakdown appears after clicking “View Details.”

### 🧾 Includes:
- 🏪 **Market Name**
- 🖼️ **Product Image**
- 📅 **Date**
- 🥕 **Full item list with prices** (e.g., 🧅 Onion — ৳30/kg)
- 👨‍🌾 **Vendor Info** (who submitted the prices)
- 💬 **User Reviews/Comments**
- ⭐ **“Add to Watchlist”** button  
  - 🔒 Disabled for **Admin** and **Vendor**
- 🛒 **Buy Product** button  
  - Clicking this redirects the user to a **Stripe payment page**
  - Upon successful payment:
    - The purchase is saved in the database
    - A success or error message is shown via **React-Toastify**
  - Clicking the **Add to Watchlist** button (if enabled) saves the product to the user’s **watchlist collection**

---

### 💬 Review & Comment Section:
- Logged-in users can share feedback on current market prices
- Each review includes:
  - ⭐ Star rating (e.g., using `react-rating`)
  - 📝 Short comment (e.g., “Too high”, “Fair”, “Dropped recently”)
  - 👤 User’s name, email, and submission date

---

### 📊 Comparison with Previous Data:
- Users can select a previous date to compare price trends
- Uses **bar or line chart** (built with **Recharts**)
- Visually represents price changes over time  
  - Example: If tomato price increased by ৳5 since yesterday, the chart highlights this difference
- Helps both buyers and vendors track ongoing market fluctuations

---

## 🛍️ All Products Page (Public Route)

This page allows users to explore all products listed across different markets and dates.

### 🔍 Features:

🧺 **List of all products** with the following details:
- 🖼️ Product Image  
- 🥕 Product Name  
- 💵 Current Price  
- 📅 Date  
- 🏪 Market Name  
- 👨‍🌾 Vendor Name  

---

### 🧭 Sorting Options:
- 🔼 Price: Low to High  
- 🔽 Price: High to Low  

---

### 🧪 Filter Options:
- 📅 **Date Filter**: Users can select a specific date or date range to filter products  

> 🧠 **Hint:** Apply filter and sorting logic in the **backend** using MongoDB query (e.g., by date range) for better performance.


---

## 👤 User Dashboard (Private Route)

### 📂 Routes:
- 📊 **View Price Trends**
- 🛠️ **Manage Watchlist**
- 🛒 **My Order List**

---

### 📊 View Price Trends:
- Show interactive graphs 📈 displaying price changes over days/weeks for tracked items.
- 💡 **Hint:** Use the **Recharts** library for smooth and interactive visualizations.

---

### 🛠️ Manage Watchlist:
- Display all watchlisted items in a **table format**  
- Each row includes:
  - 🥕 Product Name  
  - 🏪 Market Name  
  - 📅 Date  
- Add two action buttons per row:
  - ➕ **Add More** — Navigates to the **All Products** page to add more items  
  - ❌ **Remove** — Opens a **confirmation modal** to remove the item from the watchlist

> 🔔 Show **success or error messages** using **React-Toastify** for both actions.

---

### 🛒 My Order List:
- Display all ordered items in a **table format**  
- Each row includes:
  - 🥕 Product Name  
  - 🏪 Market Name  
  - 💵 Price  
  - 📅 Date  
- Add one action button per row:
  - 🔍 **View Details** — Navigates to the **Product Details** page


---

## 🧑‍🌾 Vendor Dashboard (Private Route)

### 📂 Routes:
- 📝 **Add Product**
- 📄 **My Products**
- 📢 **Add Advertisement**
- 📊 **My Advertisements**

---

### 📝 Add Product:
Vendors submit daily price updates for local market items. This helps users track market trends and pricing accurately.

#### 📥 Input Fields:
- 📧 Vendor Email (read-only)  
- 🧑‍🌾 Vendor Name (read-only or optional)  
- 🏪 Market Name  
- 📅 Date (default: today) — Use `react-datepicker`  
- 📝 Market Description  
  - *Include location, establishment details, and relevant info*  
- 🥦 Item Name (e.g., Onion)  
- 📄 Status (default: pending)  
- 🖼️ Product Image (upload or image URL)  
- 💵 Price per Unit (e.g., ৳30/kg)  
- 💵 Price History:
  ```json
  "prices": [
    { "date": "2025-07-01", "price": 25 },
    { "date": "2025-07-02", "price": 28 },
    { "date": "2025-07-03", "price": 26 }
  ]



### 📄 View My Products

This page displays all products submitted by the currently logged-in vendor in a **table format**.

#### 📋 Each Table Row Includes:
- 🥦 Item Name  
- 💵 Price per Unit  
- 🏪 Market Name  
- 📅 Date  
- 📄 Status (e.g., pending / approved / rejected with feedback)  
- ✏️ **Update** button — Navigates to the **Update Product** page  
- ❌ **Delete** button — Opens a confirmation modal to delete the product entry

---

### ✏️ Update Product Page

- Uses the **same form** as the Add Product page  
- All input fields should be **pre-filled** with the existing product data  
- 🛎️ Show success or error messages using **React-Toastify**

---

### 📢 Advertisement Page

#### 📝 Form Fields:
- 📌 Ad Title  
- ✏️ Short Description  
- 🖼️ Image Upload (banner or promotional image)  
- 📄 Status (default: pending)

---

### 📊 My Advertisements

This page displays all advertisements submitted by the currently logged-in vendor in a **table format**.

#### 📋 Each Table Row Includes:
- 📌 Ad Title  
- ✏️ Short Description  
- 📄 Status (default: pending)  
- ✏️ **Update** button — Opens a modal with the same form (pre-filled with ad data)  
- ❌ **Delete** button — Opens a confirmation modal to delete the ad entry

> 🛎️ Show success or error messages using **React-Toastify**

---

## 🛠️  Admin Dashboard (Private Route)

### 📂 Routes:
- 👥 **All Users**
- 📋 **All Products**
- 📢 **All Advertisements**
- 🛒 **All Orders**

---

### 👥 All Users
- Display all users in a **tabular format**  
- Admin can:
  - View users with their assigned roles  
  - 🔄 Update any user's role

---

### 📋 All Products
- Display all products submitted by vendors in a **tabular format**  
- Admin can:
  - ✅ Approve a **pending** product  
  - ❌ **Reject** a product (with feedback — see Challenge Point 4)  
  - ✏️ **Update** any product (uses the **Vendor Update Product** page)  
  - 🗑️ **Remove** any product (opens a confirmation modal)

---

### 📢 All Advertisements
- Display all advertisements submitted by vendors in a **tabular format**  
- Admin can:
  - 🔄 Change advertisement status (e.g., approve/reject)  
  - 🗑️ Delete any advertisement

---

### 🛒 All Orders
- Display all orders in a **tabular format**  
- Admin can:
  - 👀 View all order details


---

## 🧪 Additional Features

- ⏳ Loading Page  
- ❌ Error Page  
- Miscellaneous usability features  

---

## ⚡ Challenge Requirements

1. 🔍 All Users Page Search (by name/email - backend implemented)  
2. 🔐 JWT login, token stored in `localStorage`  
3. 📄 Pagination on at least 2 pages  
4. ❌ Rejection Modal must collect reason  
   - ✅ Vendor sees rejection feedback  

---

## ⭐ Optional Tasks

1. 🧠 Implement Axios Interceptor  
2. 🎯 Admin can post special market offers (e.g., discounts)  
3. 📋 Public “Offers” page to display those deals  

---

## 📤 What to Submit

- 👤 Admin Email/Password  
- 🌐 Live Site URL  
- 🧑‍💻 Client Repo Link  
- 🔗 Server Repo Link  