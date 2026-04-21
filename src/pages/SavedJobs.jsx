import { useContext } from "react";
import { JobsContext } from "../context/JobsContext";
import JobCard from "../components/JobCard";

function SavedJobs() {
  const { savedJobs } = useContext(JobsContext);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Saved Jobs</h2>

      {savedJobs.length === 0 ? (
        <p>No saved jobs</p>
      ) : (
        savedJobs.map((job, index) => (
          <JobCard key={job._key || index} job={job} />
        ))
      )}
    </div>
  );
}

export default SavedJobs;