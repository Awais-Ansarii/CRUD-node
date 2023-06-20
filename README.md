## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

## Technologies Used

- MongoDB
- Express
- Node.js

## Getting Started

To get started with this project, you will need to have Node.js and MongoDB installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/your-username/project.git
```

2. Install the Dependency of server:

```bash
cd project
npm install
```

3. Create Env File in Server's Root Directory:

```bash
cd Configs
touch config.env
nano config.env
```

4. Put Env File Content as:

```bash
DATABASE = mongodb://username:<PASSWORD>@mongodb.net/dbName
DATABASE_PASSWORD = your password
PORT = XXXX
JWT_SECRET = your JWT SECRET
```

5. Run Server:

```bash
npm run dev
```

## Folder Structure

```
├── App.js
├── Configs
│   ├── config.env
│   ├── Database.js
│   └── env.example
├── Controllers
│   ├── productControllers.js
│   └── userControllers.js
├── Middlewares
│   ├── Error.js
│   └── project.js
├── Models
│   ├── productModel.js
│   └── userModel.js
├── package.json
├── package-lock.json
├── README.md
├── Routes
│   ├── auth.routes.js
│   └── product.routes.js
├── Server.js
└── Utilities
    ├── cookieParser.js
    ├── ErrorHandler.js
    ├── hashPassword.js
    └── signJwt.js


```

## Contributing

If you find any issues or bugs, please open an issue or submit a pull request.
