import { useEffect, useState } from "react";
import { getSavedJobs } from "../utils/localStorage";
import JobCard from "../components/JobCard";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(getSavedJobs());
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Saved Jobs</h2>

      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default SavedJobs;