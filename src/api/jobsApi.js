import axios from "axios";

const BASE_URL = "https://www.arbeitnow.com/api/job-board-api";

/**
 * Fetch all jobs from API
 */
export const fetchJobs = async () => {
  try {
    const res = await axios.get(BASE_URL);

    // ✅ correct structure for arbeitnow API
    if (!res.data || !res.data.data) {
      return [];
    }

    return res.data.data; // 👈 IMPORTANT FIX
  } catch (error) {
    console.error("Failed to fetch jobs:", error.message);
    return [];
  }
};