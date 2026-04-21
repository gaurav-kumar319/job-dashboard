import { createContext, useEffect, useState } from "react";
import { fetchJobs } from "../api/jobsApi";

export const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    type: "all",
    location: "all",
  });

  const [savedJobs, setSavedJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("savedJobs")) || [];
  });

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const data = await fetchJobs();
        setJobs(data || []);
      } catch (err) {
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  // ✅ FIXED SAVE LOGIC (IMPORTANT)
  const saveJob = (job) => {
    if (!job) return;

    const id =
      job.id ||
      job.slug ||
      job.url ||
      job.title; // fallback unique key

    setSavedJobs((prev) => {
      const exists = prev.some((j) => {
        const jid = j.id || j.slug || j.url || j.title;
        return jid === id;
      });

      let updated;

      if (exists) {
        updated = prev.filter((j) => {
          const jid = j.id || j.slug || j.url || j.title;
          return jid !== id;
        });
      } else {
        updated = [...prev, { ...job, _key: id }];
      }

      localStorage.setItem("savedJobs", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        savedJobs,
        saveJob,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};