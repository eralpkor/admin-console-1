import { fetchUtils } from "react-admin";

const apiUrl = "http://localhost:5000/api";

export const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const { token } = JSON.parse(localStorage.getItem("auth")) || {};
  options.headers.set("Authorization", `${token}`);
  return fetchUtils.fetchJson(url, options);
};

// eslint-disable-next-line import/no-anonymous-default-export
export const authProvider = {
  // called when the user attempts to log in
  login: ({ username, password }) => {
    const request = new Request(`${apiUrl}/authenticate`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((auth) => {
        localStorage.setItem(
          "auth",
          JSON.stringify({ ...auth, username: username })
        );
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("auth")
      ? Promise.resolve()
      : Promise.reject({ message: "Login required" });
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => {
    const auth = JSON.parse(localStorage.getItem("auth")) || {};
    if (auth.role === "SUPERADMIN") {
      return Promise.resolve("SUPERADMIN");
    } else if (auth.role === "ADMIN") {
      return Promise.resolve("ADMIN");
    } else {
      return Promise.resolve("USER");
    }
  },

  getIdentity: () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return Promise.resolve({
      id: auth.id,
      username: auth.username,
      role: auth.role,
      fullName: `${auth.firstName} ${auth.lastName}`,
    });
  },
};
