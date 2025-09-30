document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault(); 

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      errorMessage.textContent = ""; 

      try {

        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.msg || "Login failed");
        }


        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
      } catch (error) {
        errorMessage.textContent = error.message;
      }
    });
  }
});
