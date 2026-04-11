import axios from "axios";

const BASE_URL = "https://remotive.com/api/remote-jobs";

export const fetchJobs = async () => {
  const res = await axios.get(BASE_URL);
  return res.data.jobs;
};