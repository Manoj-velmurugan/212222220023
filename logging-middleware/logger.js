import axios from 'axios';

const LOG_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";

export async function Log(stack, level, pkg, message) {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.warn("No access token found. Skipping log.");
    return;
  }

  try {
    const res = await axios.post(
      LOG_ENDPOINT,
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log("Log Success:", res.data.message);
  } catch (error) {
    console.error("Log Failed:", error.response?.data || error.message);
  }
}
