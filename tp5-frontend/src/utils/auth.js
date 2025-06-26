export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/"; // redirige a la página de login
}
