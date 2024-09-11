const API_URL = "http://localhost:3000";

function updateUI() {
  const token = localStorage.getItem("token");
  if (token) {
    document.getElementById("signin-form").classList.add("hidden");
    document.getElementById("signup-form").classList.add("hidden");
    document.getElementById("userinfo").classList.remove("hidden");
  } else {
    document.getElementById("signin-form").classList.add("hidden");
    document.getElementById("signup-form").classList.remove("hidden");
    document.getElementById("userinfo").classList.add("hidden");
  }
}

async function signup() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  try {
    const response = await axios.post(`${API_URL}/signup`, {
      username,
      password,
    });

    alert(`Hey ${username}, you've successfully signed up`);

    document.getElementById("signup-form").classList.add("hidden");
    document.getElementById("signup-button").classList.add("hidden");

    document.getElementById("signin-form").classList.remove("hidden");
  } catch (error) {
    console.error("Sign-up error:", error);
    document.getElementById("signup-message").innerText =
      (error.response && error.response.data && error.response.data.message) ||
      "Error signing up";
  }
}

async function signin() {
  const username = document.getElementById("signin-username").value;
  const password = document.getElementById("signin-password").value;

  try {
    const response = await axios.post(`${API_URL}/signin`, {
      username,
      password,
    });
    localStorage.setItem("token", response.data.token);
    alert(`Hey ${username}, you've successfully signed in`);
    updateUI();
  } catch (error) {
    console.error("Sign-in error:", error);
    document.getElementById("signin-message").innerText =
      (error.response && error.response.data && error.response.data.message) ||
      "Error signing in";
  }
}

// Get User Info Function
async function getUserInfo() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: token,
      },
    });
    document.getElementById(
      "user-info-message"
    ).innerText = `Username: ${response.data.username}`;
  } catch (error) {
    console.error("User info error:", error);
    document.getElementById("user-info-message").innerText =
      (error.response && error.response.data && error.response.data.message) ||
      "Error fetching user info";
  }
}

// Sign Out Function
function signOut() {
  localStorage.removeItem("token");
  updateUI();
}

updateUI();

document.getElementById("signup-button").addEventListener("click", signup);
document.getElementById("signin-button").addEventListener("click", signin);
document.getElementById("signout-button").addEventListener("click", signOut);
document
  .getElementById("getuserinfo-button")
  .addEventListener("click", getUserInfo);
