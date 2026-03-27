loadDataFromJson();

async function loadDataFromJson() {
  const response = await fetch("layout.json");
  const result = await response.json();

  function dashboard(user) {
    const contentDisplay = document.querySelector("#content-display");
    contentDisplay.innerHTML = `
      <h2>👋 Welcome, ${user.username || user.email}!</h2>
      <p>You are now logged in.</p>
      <button id="logoutBtn">Logout</button>
    `;

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      location.hash = "#login";
    });
  }

  function switchForms(type) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      dashboard(currentUser);
      return;
    }

    const JsonData = result[type];
    const contentDisplay = document.querySelector("#content-display");
    contentDisplay.innerHTML = "";

    const content = document.createElement("div");

    let HTML = `<h2>${JsonData.title}</h2>`;
    HTML += `<form id="${type}-form">`;

    JsonData.inputs.forEach(input => {
      HTML += `
        <label for="${input.id}">${input.label || input.id}</label><br>
        <input 
          type="${input.type}" 
          id="${input.id}" 
          name="${input.name || input.id}" 
          required><br><br>
      `;
    });

    HTML += `
      <button type="${JsonData.button.type}" id="${JsonData.button.id}">
        ${JsonData.button.text}
      </button>
    </form>
    <p id="${JsonData.footer?.id || ""}">${JsonData.footer?.text || ""}</p>
    <div id="message" style="color:red; margin-top:10px;"></div>
    `;

    content.innerHTML = HTML;
    contentDisplay.appendChild(content);

    // ✅ Add submit listener AFTER form is rendered
    document.getElementById(`${type}-form`).addEventListener("submit", function (e) {
      e.preventDefault();
      const form = new FormData(e.target);
      const data = Object.fromEntries(form.entries());
      const message = document.getElementById("message");

      if (type === "register") {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.find(u => u.email === data.email)) {
          message.textContent = "⚠ Email already registered.";
          return;
        }
        users.push(data);
        localStorage.setItem("users", JSON.stringify(users));
        message.style.color = "green";
        message.textContent = "✅ Registered! Go login.";
      }

      if (type === "login") {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const found = users.find(u => u.email === data.email && u.password === data.password);
        if (found) {
          localStorage.setItem("currentUser", JSON.stringify(found));
          dashboard(found); // ✅ fixed function name
        } else {
          message.textContent = "❌ Invalid credentials.";
        }
      }
    });
  }

  function router() {
    const type = location.hash.replace("#", "") || "login";
    switchForms(type);
  }

  window.addEventListener("hashchange", router);
  router(); // initial call
}
