export const signup = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.find(
    (u) => u.email === email && u.password === password
  );
};
