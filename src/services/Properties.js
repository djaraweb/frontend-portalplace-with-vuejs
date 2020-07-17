const API_URL = process.env.VUE_APP_API_URL;
const appProperty = {};

appProperty.getPropperties = async (page = 1, perpage = 10, title = "") => {
  let url = `${API_URL}/properties?page=${page}&perpage=${perpage}&title=${title}`;
  return await fetch(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
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

appProperty.getProppertiesPrivate = async (
  page = 1,
  perpage = 10,
  title = ""
) => {
  let url = `${API_URL}/propertiesforuser?page=${page}&perpage=${perpage}&title=${title}`;
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

appProperty.addNumberVisits = async (idProperty) => {
  let url = `${API_URL}/property/addvisits/${idProperty}`;
  return await fetch(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
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

appProperty.save = async (inputData) => {
  let url = !inputData.id
    ? `${API_URL}/properties`
    : `${API_URL}/properties/${inputData.id}`;
  let token_authorized = localStorage.getItem("access_token"); // Token ok User
  //console.log(token_authorized, url, { property: { property } });
  let requestInfo = {
    method: !inputData.id ? "POST" : "PUT",
    body: JSON.stringify(inputData),
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token_authorized}`,
    }),
  };

  return await fetch(url, requestInfo)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log("Activity: Exception=>", err);
    });
};

appProperty.destroy = async (idProperty) => {
  let url = `${API_URL}/properties/${idProperty}`;
  let token_authorized = localStorage.getItem("access_token"); // Token ok User
  return await fetch(url, {
    method: "DELETE",
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

appProperty.sendemail = async (idProperty) => {
  let url = `${API_URL}/property/sendemail/${idProperty}`;
  return await fetch(url, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
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

export default appProperty;
