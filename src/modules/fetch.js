import { instance } from "./axios";

async function loginUser(email, password) {
  try {
    const response = await instance.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "something went wrong.");
  }
}

async function registerUser(name, email, password) {
  try {
    const response = await instance.post("/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong.");
  }
}

async function getBooks() {
  try {
    const response = await instance.get("/books");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong.");
  }
}

export { loginUser, registerUser, getBooks };
