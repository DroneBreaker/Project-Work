const UserApi = {
  borrowBook: async (isbn, userId) => {
    const res = await fetch("/user/borrow", {
      method: "POST",
      body: JSON.stringify({ isbn, userId }),
      headers: { "Content-Type": "application/json" },
    })
    return res.json()
  },
  returnBook: async (isbn, userId) => {
    const res = await fetch("/user/return", {
      method: "POST",
      body: JSON.stringify({ isbn, userId }),
      headers: { "Content-Type": "application/json" },
    })
    return res.json()
  },
  getBorrowBook: async () => {
    const res = await fetch("https://librarysystemapi.azurewebsites.net/api/user/borrowed-books", { method: "GET" })
    return res.json()
  },
  login: async (username, password) => {
    const res = await fetch("/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
    return res.json()
  },
  getProfile: async () => {
    const res = await fetch("/user/profile", { method: "GET" })
    return res.json()
  },
  logout: async () => {
    const res = await fetch("/user/logout", { method: "GET" })
    return res.json()
  },
}

module.exports = { UserApi }
