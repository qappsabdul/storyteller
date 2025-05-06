# Node.js Core Project Structure

A structured Node.js project template with Express, following MVC architecture patterns.

## Project Structure

```
.
├── src/                   # Source code
│   ├── config/            # Application configuration
│   │   ├── db.js          # Database connection configuration
│   │   └── env.js         # Environment variables setup
│   ├── controllers/       # Controllers for handling routes logic
│   │   └── sampleController.js
│   ├── middleware/        # Express middleware
│   │   ├── authMiddleware.js  # Authentication middleware
│   │   └── errorMiddleware.js # Error handling middleware
│   ├── models/            # Data models
│   │   └── SampleModel.js
│   ├── routes/            # Route definitions
│   │   ├── index.js       # Main router
│   │   └── sampleRoutes.js
│   └── index.js           # Application entry point
├── tests/                 # Test files
├── .env                   # Environment variables (not committed)
├── .env.example           # Example environment variables
├── .gitignore             # Git ignore file
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

## Features

- MVC architecture pattern
- Express.js for routing and middleware
- Environment-based configuration
- Error handling middleware
- Authentication middleware setup
- API route structure
- Simple model implementation

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/node-project.git
   cd node-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot-reload
- `npm test`: Run tests using Jest

## API Endpoints

- `GET /`: Base route - API status
- `GET /api/samples`: Get all sample items
- `GET /api/samples/:id`: Get a sample item by ID

## Development

### Adding New Routes

1. Create a new controller in `src/controllers/`
2. Create a new route file in `src/routes/`
3. Add the new route to `src/routes/index.js`

### Environment Variables

Configure your environment by editing the `.env` file:

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (`development`, `production`)
- `DB_URI`: Database connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRES_IN`: JWT token expiration

## Testing

Tests are located in the `tests/` directory and can be run with:

```bash
npm test
```

## License

ISC