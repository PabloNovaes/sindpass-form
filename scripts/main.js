import { success, error } from "./sweet.js";
import "https://unpkg.com/axios/dist/axios.min.js";

const showPass = document.querySelector("i#pass");
const form = document.querySelector("form");
const allInputs = form.querySelectorAll("input");

const loader = {
  element: document.querySelector(".loader"),
  startLoader() {
    const buttonText = this.element.parentElement.querySelector("p");
    this.element.style.display = "flex";
    buttonText.style.display = "none";
  },
  stopLoader() {
    const buttonText = this.element.parentElement.querySelector("p");
    this.element.style.display = "none";
    buttonText.style.display = "flex";
  },
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  loader.startLoader();
  const data = new FormData(form);
  return await formMethods.submitForm(Object.fromEntries(data.entries()));
});

const formMethods = {
  valuesIsEmpty() {
    return Array.from(allInputs).every((input) => {
      return input.value.trim() !== "";
    });
  },
  async submitForm(data) {
    try {
      if (!formMethods.valuesIsEmpty()) {
        return error("Preencha todos os campos!");
      }
      const request = await axios.post("http://192.168.0.174:5000/form", {
        user: data,
      });
      const res = request;
      setTimeout(() => {
        return loader.stopLoader();
      }, 1400);
    } catch (err) {
      return error(err);
    }
  },
};

showPass.addEventListener("click", (e) => {
  const input = e.target.parentElement.querySelector("input");
  input.type = input.type === "password" ? "text" : "password";
  input.type == "password"
    ? (showPass.classList.add("ph-eye-slash"),
      showPass.classList.remove("ph-eye"))
    : (showPass.classList.add("ph-eye"),
      showPass.classList.remove("ph-eye-slash"));
});
