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



### Database Schema
The database schema is designed to store items and their associated details.

Tables:

#### `file` Table

| Field        | Type        | Description                                   |
|--------------|-------------|-----------------------------------------------|
| `id`         | UUID        | Primary Key, Auto-generated (UUIDV4)          |
| `fileName`   | STRING      | Name of the file                             |
| `fileType`   | STRING      | Type of the file (e.g., 'image', 'pdf')      |
| `size`       | INTEGER     | Size of the file in bytes                    |
| `path`       | STRING      | File path on the server                      |
| `createdAt`  | DATE        | Timestamp when the file was created          |
| `updatedAt`  | DATE        | Timestamp when the file was last updated     |


#### `block` Table

| Field        | Type        | Description                                   |
|--------------|-------------|-----------------------------------------------|
| `id`         | UUID        | Primary Key, Auto-generated (UUIDV4)          |
| `name`       | STRING      | Name of the block                            |
| `positionX`  | FLOAT       | X-coordinate of the block                    |
| `positionY`  | FLOAT       | Y-coordinate of the block                    |
| `positionZ`  | FLOAT       | Z-coordinate of the block                    |
| `handle`     | STRING      | Handle of the block                           |
| `ownerHandle`| STRING      | Owner's handle for the block                 |
| `name2`      | STRING      | Additional name for the block                |
| `xrefPath`   | STRING      | Path to the external reference               |
| `fileId`     | UUID        | Foreign Key referencing the `file` table     |
| `createdAt`  | DATE        | Timestamp when the block was created         |
| `updatedAt`  | DATE        | Timestamp when the block was last updated    |

#### `entity` Table

| Field               | Type        | Description                                   |
|---------------------|-------------|-----------------------------------------------|
| `id`                | UUID        | Primary Key, Auto-generated (UUIDV4)          |
| `blockId`           | UUID        | Foreign Key referencing the `block` table    |
| `type`              | STRING      | Type of the entity (e.g., 'line', 'circle')   |
| `coOrdinates`       | JSONB       | Coordinates of the entity                     |
| `handle`            | STRING      | Handle of the entity                          |
| `ownerHandle`       | STRING      | Owner's handle for the entity                 |
| `color`             | INTEGER     | Color of the entity (encoded in integer)      |
| `colorIndex`        | INTEGER     | Index for color in a color palette           |
| `shape`             | BOOLEAN     | Boolean indicating if the entity has a shape |
| `normalVector`      | JSONB       | Normal vector for the entity                  |
| `degreeOfSplineCurve`| INTEGER    | Degree of the spline curve (if applicable)    |
| `createdAt`         | DATE        | Timestamp when the entity was created         |
| `updatedAt`         | DATE        | Timestamp when the entity was last updated    |

### Relationships:
The file table has a one-to-many relationship with the block table, where each file can have multiple blocks.

The block table has a one-to-many relationship with the entity table, where each block can contain multiple entities.

### Reasoning Behind Library Choices

* Frontend: React was chosen for its component-based architecture and extensive ecosystem, making it a great choice for building dynamic and scalable UIs.

* Backend: Node.js with Express was selected because of its non-blocking, event-driven architecture, ideal for handling multiple I/O operations efficiently.

* Database: PostgreSQL was chosen for its robustness and ability to handle complex queries, along with features like ACID compliance and strong support for relational data.

* ORM: Sequelize was used for interacting with PostgreSQL, as it provides an easy-to-use interface for managing database models and migrations.

## Challenges Faced and How I Overcame Them

1. **Database Schema Design:**
   One of the initial challenges was designing a suitable database schema to store the data. I had to ensure that the relationships between files, blocks, and entities were properly defined and optimized for querying. This involved setting up foreign keys and understanding how to structure the data for efficient retrieval.

2. **Pagination and Limit:**
   Implementing pagination for handling large sets of data efficiently was another challenge. I had to ensure that when querying the database for files, blocks, or entities, I could retrieve the data in manageable chunks using pagination techniques and apply limits to avoid performance issues.

3. **Writing the `README.md`:**
   Writing a comprehensive `README.md` was a bit challenging as it involved documenting the entire process, from setting up the project to explaining the database schema and the reasoning behind my library choices. I had to balance technical detail with clarity to make the instructions understandable for future developers.

4. **Learning About CAD Files, Coordinates, Blocks, and Entities:**
   A major learning curve was understanding CAD files and the structure of entities within them. I had to study how entities are represented in CAD software, particularly how their coordinates are stored and how they relate to blocks. Blocks in CAD files are often groups of entities that are treated as a single unit, and each block can contain multiple entities with various properties such as type, position, and color. This knowledge was crucial in defining the relationships between the `block` and `entity` models in the database.

5. **Learning Sequelize and PostgreSQL:**
   Another challenge was getting familiar with Sequelize and PostgreSQL. I had to understand how Sequelize ORM works and how to set up models, relationships, and migrations in the context of PostgreSQL. Learning the nuances of PostgreSQL, like how to define data types, handle migrations, and structure queries efficiently, was essential for ensuring smooth data operations in the project.

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


    



