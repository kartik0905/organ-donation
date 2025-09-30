document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const userInfo = document.getElementById("user-info");
  const dataContainer = document.getElementById("data-container");
  const logoutBtn = document.getElementById("logout-btn");


  if (!token) {
    window.location.href = "index.html";
    return;
  }


  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });


  function parseJwt(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null; 
    }
  }

  const decodedToken = parseJwt(token);
  if (!decodedToken) {

    localStorage.removeItem("token");
    window.location.href = "index.html";
    return;
  }

  const userRole = decodedToken.user.role;
  userInfo.textContent = `${userRole} User`;


  const renderDonors = (donors) => {
    if (donors.length === 0) {
      dataContainer.innerHTML = "<p>No donors found.</p>";
      return;
    }
    let tableHTML = `
            <h4>All Donors</h4>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Blood Group</th>
                        <th>Organ</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${donors
                      .map(
                        (donor) => `
                        <tr>
                            <td>${donor.fullName}</td>
                            <td>${donor.bloodGroup}</td>
                            <td>${donor.organToDonate}</td>
                            <td>${donor.status}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>`;
    dataContainer.innerHTML = tableHTML;
  };

  const renderHospitalDashboard = () => {
    dataContainer.innerHTML = `
            <h4>Add New Donor</h4>
            <form id="add-donor-form" class="dashboard-form">
                 <div class="form-group">
                    <label for="fullName">Full Name</label>
                    <input type="text" id="fullName" required>
                </div>
                 <div class="form-group">
                    <label for="bloodGroup">Blood Group</label>
                    <input type="text" id="bloodGroup" required>
                </div>
                 <div class="form-group">
                    <label for="organToDonate">Organ to Donate</label>
                    <input type="text" id="organToDonate" required>
                </div>
                 <div class="form-group">
                    <label for="contactInfo">Contact Info</label>
                    <input type="text" id="contactInfo" required>
                </div>
                <button type="submit" class="btn">Add Donor</button>
                <p id="form-message"></p>
            </form>
        `;

    document
      .getElementById("add-donor-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const formMessage = document.getElementById("form-message");
        const donorData = {
          fullName: document.getElementById("fullName").value,
          bloodGroup: document.getElementById("bloodGroup").value,
          organToDonate: document.getElementById("organToDonate").value,
          contactInfo: document.getElementById("contactInfo").value,
        };

        try {
          const res = await fetch("http://localhost:3000/api/donors", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
            body: JSON.stringify(donorData),
          });
          if (!res.ok) throw new Error("Failed to add donor.");
          formMessage.textContent = "Donor added successfully!";
          formMessage.style.color = "green";
          document.getElementById("add-donor-form").reset();
        } catch (err) {
          formMessage.textContent = err.message;
          formMessage.style.color = "red";
        }
      });
  };

  const loadData = async () => {
    try {
      if (userRole === "Admin") {
        const res = await fetch("http://localhost:3000/api/donors", {
          headers: { "x-auth-token": token },
        });
        if (!res.ok) throw new Error("Failed to fetch data.");
        const donors = await res.json();
        renderDonors(donors);
      } else if (userRole === "Hospital") {
        renderHospitalDashboard();
      }
    } catch (error) {
      dataContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
  };

  loadData();
});
