// REGISTER USER
const register = async (userData) => {
  const response = await fetch(
    `https://cook-master-backend.onrender.com/api/users`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 400) {
    throw new Error("Акант с такъв имейл вече съществува");
  }

  if (response.status === 201) {
    const user = await response.json();
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
};

// LOGIN user
const login = async (userData) => {
  const response = await fetch(
    `https://cook-master-backend.onrender.com/api/users/login`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 401) {
    throw new Error("Невалидни имейл или парола");
  }

  if (response.status === 200) {
    const user = await response.json();
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
};

// LOGOUT user
const logout = () => localStorage.removeItem("user");

const authService = {
  register,
  login,
  logout,
};

export default authService;
