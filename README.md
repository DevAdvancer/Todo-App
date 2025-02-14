# Todo App

This is a Todo App project with a Flask backend and a React frontend using TypeScript.

## Project Structure

```
Todo App/
│
├── backend/          # Flask backend
│   ├── app.py        # Main application file
│   ├── requirements.txt  # Python dependencies
│   └── ...           # Other backend files
│
├── frontend/         # React frontend
│   ├── src/          # Source files
│   ├── public/       # Public files
│   ├── package.json  # Node.js dependencies
│   └── ...           # Other frontend files
│
└── README.md         # Project documentation
```

## Getting Started

### Prerequisites

- Python 3.x
- Node.js
- npm or yarn

### Backend Setup

1. Navigate to the `backend` folder:
  ```sh
  cd backend
  ```

2. Create a virtual environment:
  ```sh
  python -m venv venv
  ```

3. Activate the virtual environment:
  - On Windows:
    ```sh
    venv\Scripts\activate
    ```
  - On macOS/Linux:
    ```sh
    source venv/bin/activate
    ```

4. Install the dependencies:
  ```sh
  pip install -r requirements.txt
  ```

5. Run the Flask application:
  ```sh
  flask app.py
  ```

### Frontend Setup

1. Navigate to the `Frontend` folder:
  ```sh
  cd frontend
  ```

2. Install the dependencies:
  ```sh
  npm install
  ```
  or
  ```sh
  yarn install
  ```

3. Start the React application:
  ```sh
  npm run dev
  ```
  or
  ```sh
  yarn run dev
  ```

## Usage

- There is as example env file contents api example for backend
- The Flask backend will be running on `http://127.0.0.1:3000/`
- The React frontend will be running on `http://localhost:5173/`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
