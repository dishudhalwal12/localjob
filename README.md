# LOCALJOB.

A modern, peer-to-peer marketplace for local services. Connect directly with electricians, plumbers, painters, and more—without any middlemen.

## 🚀 Getting Started

Follow these steps to get the application running on your local machine.

### 1. Prerequisites
- **Node.js**: Ensure you have Node.js (v18 or higher) installed. [Download here](https://nodejs.org/).
- **Git**: Ensure Git is installed.

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/dishudhalwal12/localjob.git
cd localjob
npm install
```

### 3. Environment Configuration
Create a file named `.env.local` in the root directory and add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Running the App
Start the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠 Features

- **Two-Role System**: Dedicated workflows for Workers (listing, dashboard, bookings) and Customers (browsing, booking, messaging).
- **Service Packages**: Workers can define custom service plans and prices.
- **Real-time Messaging**: Instant chat between customers and workers.
- **Booking Management**: Track service requests, status (Accept/Decline), and history.
- **Location Pinning**: Workers can pin their current location for better local discovery.
- **Reviews & Ratings**: Build trust with verified customer feedback.

## 📦 Deployment

The app is built with Next.js 14 and is optimized for deployment on [Vercel](https://vercel.com). Simply connect your GitHub repository to Vercel and it will deploy automatically.

## 📄 License
This project is for private use by the client.
