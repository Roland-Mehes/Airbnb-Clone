# 🌟 Airbnb Clone 🏠

Welcome to the **Airbnb Clone** project! This is a full-stack web application inspired by Airbnb, built to showcase modern web development practices using **Next.js**, **TypeScript**, and **Prisma**. The app allows users to browse, list, and manage rental properties with ease.

---

## 🚀 Features

✨ **User Authentication**  
Secure login and registration using OAuth (Google, GitHub) and credentials.

🏡 **Property Listings**  
Users can create, view, and manage rental property listings.

🔍 **Dynamic Search**  
Filter properties by category, location, and other criteria.

📸 **Image Upload**  
Upload property images seamlessly using Cloudinary.

📱 **Responsive Design**  
Fully responsive UI for desktop, tablet, and mobile devices.

🗺️ **Interactive Map**  
View property locations on a map (using Leaflet or Mapbox).

⚡ **Error Handling**  
Graceful error handling and validation for a seamless user experience.

---

## 🛠️ Technologies Used

### 🌐 Frontend:

- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Strongly typed JavaScript for better developer experience.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Hook Form**: Form management with validation.

### 🖥️ Backend:

- **Prisma**: ORM for database management.
- **MongoDB**: NoSQL database for storing user and listing data.
- **NextAuth.js**: Authentication library for OAuth and credentials-based login.

### 🛠️ Other Tools:

- **Cloudinary**: Image hosting and management.
- **Axios**: HTTP client for API requests.
- **ESLint & Prettier**: Code linting and formatting.

---

## 📂 Project Structure

```
airbnb-clone/
├── app/
│   ├── actions/            # Server-side actions (e.g., fetching data)
│   ├── api/                # API routes (e.g., listings, authentication)
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── modals/             # Modal components
│   ├── page.tsx            # Main entry point for the homepage
│   └── styles/             # Global styles
├── prisma/
│   ├── schema.prisma       # Prisma schema for database models
├── public/                 # Static assets (e.g., images, icons)
├── .env                    # Environment variables
├── README.md               # Project documentation
└── package.json            # Project dependencies and scripts
```

---

## ⚙️ Setup Instructions

Follow these steps to set up the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Roland-Mehes/Airbnb-Clone
cd airbnb-clone
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/airbnb-clone
NEXTAUTH_SECRET=your_nextauth_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
```

### 4️⃣ Set Up the Database

Run the following commands to apply the Prisma schema and seed the database:

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 5️⃣ Start the Development Server

```bash
npm run dev
```

Visit the app at [http://localhost:3000](http://localhost:3000).

---

## 🌟 Screenshots

### 🏠 Homepage

![Homepage](https://via.placeholder.com/800x400?text=Homepage+Screenshot)

### 🏡 Property Listing

![Property Listing](https://via.placeholder.com/800x400?text=Property+Listing+Screenshot)

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. **Fork the repository**  
   Create your own copy of the project.

2. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit your changes**

   ```bash
   git commit -m 'Add some feature'
   ```

4. **Push to the branch**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a pull request**  
   Submit your changes for review.

---

## 🙌 Acknowledgments

- Inspired by the Airbnb platform.
- Built with ❤️ by **Roland Mehes**.

---

## 📧 Contact

For questions or feedback, feel free to reach out:

- **Email**: [mehesroli@gmail.com](mailto:mehesroli@gmail.com) or [mehesrolieb@gmail.com](mailto:mehesrolieb@gmail.com)
- **GitHub**: [Roland-Mehes](https://github.com/Roland-Mehes)
- **LinkedIn**: [Roland Mehes](https://www.linkedin.com/in/roland-mehes)

---
