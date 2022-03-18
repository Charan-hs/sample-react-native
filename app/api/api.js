import storage from "../auth/storage";
import { baseUrl } from "../config/baseUrl";

export const postApi = async (path, body = {}) => {
  try {
    const token = await storage.getToken();
    const header = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    console.log(`${baseUrl}${path}`);

    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(body),
    });

    const responseJson = response.json();

    return responseJson;
  } catch (err) {
    console.log(err);
    return { message: err, status: 500 };
  }
};
