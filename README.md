# 🧭 DXF Viewer – Full Stack App

A full-stack application to upload DXF (Drawing Exchange Format) files, extract and store entities (blocks, shapes, etc.), and display them interactively with pagination support.

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- ShadCN UI
- React Router
- Axios

### Backend
- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- Multer (file upload)
- dxf-parser

---

## 📁 Project Structure

dxf-viewer/ 
├── frontend/ # React app with file upload, entity view, pagination 
├── backend/ # Express API with DXF parsing and PostgreSQL integration 
└── README.md # You're here!


---

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/your-username/dxf-viewer.git
cd dxf-viewer 
```

🔧 1. Setup Backend

```bash
cd backend
npm install
```

Create  ```.env``` file in ```/backend```:

```bash
PORT=5000
DATABASE_URL=your_postgres_connection_string
```

Run the backend:

```bash
npm run dev
```

This starts the backend on ```http://localhost:5000```

🎨 2. Setup Frontend

```bash
cd ../frontend
npm install
```

Start the frontend dev server:

```bash
npm run dev
```

Runs at: ```http://localhost:5173```



🌐 API Endpoints

File Upload
    * ```POST /api/v1/file```
        * Upload a DXF file (Multer-based)
        * Returns fileInfo
    
Get Blocks
    * ```GET /v1/blocks/:fileId```
        * Returns all blocks parsed from the DXF

Get Entities (with pagination)
    * ```GET /v1/entities/:blockId?page=1&limit=10```
        * Fetch paginated entities from a block

🎯 Features
* Upload .dxf files and parse blocks/entities

* Store extracted data in PostgreSQL

* View list of blocks and their entities

* Paginated entity listing using ShadCN's pagination component

* React-based dynamic routing for blocks and entities

* Clean Tailwind UI with reusable components

🛠️ Deployment
You can deploy the full app using services like:

* Frontend: Vercel / Netlify / Hostinger

* Backend: Render / Railway / VPS

* Database: Supabase / Neon / Railway / ElephantSQL

🧑‍💻 Author
Abhishek Pawara
abhistack.io
Contact: [LinkedIn](http://linkedin.com/in/abhishek-pawara/) | [GitHub](https://github.com/abtargus7)


🪪 License
This project is open-source and available under the MIT License.

```yaml


---

### 💡 Suggestions

- Add a GIF or screenshot to show the full flow (upload → view blocks → entities).
- Keep your `frontend/README.md` and `backend/README.md` for dev-specific setup if needed.

Let me know if you'd like me to generate those two too!

```


    



