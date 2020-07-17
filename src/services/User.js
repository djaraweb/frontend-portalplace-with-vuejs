const API_URL = process.env.VUE_APP_API_URL;
const appUser = {};

appUser.verifiedAccess = async (inputData) => {
  let url = `${API_URL}/login`;
  let requestInfo = {
    method: "POST",
    body: JSON.stringify(inputData),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  };

  return await fetch(url, requestInfo)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("User-Login: Exception=>", err);
    });
};

appUser.registerUser = async (inputData) => {
  let url = `${API_URL}/users`;
  let requestInfo = {
    method: "POST",
    body: JSON.stringify(inputData),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  };

  return await fetch(url, requestInfo)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("User-Register: Exception=>", err);
    });
};

appUser.getCurrentUser = async () => {
  let url = `${API_URL}/users/current`;
  let token_authorized = localStorage.getItem("access_token"); // Token ok User
  return await fetch(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token_authorized}`,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("Properties: Exception=>", err);
    });
};

export default appUser;
