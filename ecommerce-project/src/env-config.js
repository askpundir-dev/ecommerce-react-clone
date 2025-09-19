// env-config.js
let API_URL = "";

if (import.meta.env.MODE === "development") {
  API_URL = "http://localhost:3000/api"; // your local backend
} else {
  API_URL = "https://ecommmerce-clone-react.onrender.com/api"; // your deployed backend
}

export default API_URL;
