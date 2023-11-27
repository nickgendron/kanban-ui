import axios from "axios";
import session from "redux-persist/lib/storage/session";
// import Global from "../../../Global.js";

const baseUrl = "http://localhost:5093";
export const kanbanApi = axios.create({
  baseURL: baseUrl,
  // withCredentials: true,
});

function getCookieValue(cookieName) {
  // Split the cookie string into individual cookies
  const cookies = document.cookie.split(";");

  // Iterate through each cookie to find the one with the specified name
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    // Check if the cookie starts with the desired name
    if (cookie.startsWith(`${cookieName}=`)) {
      // Extract and return the cookie value
      return cookie.substring(cookieName.length + 1);
    }
  }

  // Return null if the cookie is not found
  return null;
}
console.log("instianted");
console.log(await session.getItem("accessToken"))
const accessTokenValue = await session.getItem("accessToken");
console.log(accessTokenValue);
kanbanApi.defaults.headers.common[
  "Authorization"
] = `bearer ${accessTokenValue}`;

let isRefreshing = false;
kanbanApi.interceptors.response.use(
  async (response) => {
    const newAccessToken = response.headers["set-cookie"];
    console.log(newAccessToken);
    if (newAccessToken) {
      console.log("new access token");
      kanbanApi.defaults.headers.common[
        "Authorization"
      ] = `bearer ${newAccessToken}`;
      // Update your cookies or storage as needed
      // ...
    }
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      console.log("401");
      if (
        error.response.headers["is-token-expired"] === "true" &&
        !isRefreshing
      ) {
        isRefreshing = true;
        try {
          // const newAccessToken = await refreshToken();
          // const retryFailedRequest = error.config;
          // retryFailedRequest.headers[
          //   "Authorization"
          // ] = `bearer ${newAccessToken}`;
          // return kanbanApi(retryFailedRequest);
        } catch (error) {
          console.log(error);
        } finally {
          isRefreshing = false;
        }
      }
      // return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
