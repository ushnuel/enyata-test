## CRUD Application using `Node.js`, `Express.js` and `PostgreSQL`

This application creates, updates, reads and delete a user from the Postgres database.

## Installation
Clone the repository. On your terminal, run the command `git clone [repository_url]`.

Install the packages by running:

```bash
npm install
```

## Usage

To start the API, run the command 
```bash
npm start
```

You can also run the command below if you have installed nodemon globally. To install nodemon globally, run `npm install --global nodemon`
```bash
npm run dev
```
The API would be started on PORT 8000. Below are the routes to connect to the API

- `POST http://localhost:8000/users/create` - creates a new user
- `GET http://localhost:8000/users/retrieve` - reads a user from the database
- `PUT http://localhost:8000/users/:id/update` - updates a user's record
- `DELETE http://localhost:8000/users/:id/delete` - deletes a user from the database
