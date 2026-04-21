import { useContext } from "react";
import { JobsContext } from "../context/JobsContext";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const { savedJobs, saveJob } = useContext(JobsContext);
  const navigate = useNavigate();

  const id = job.id || job.slug || job.url || job.title;

  const isSaved = savedJobs.some((j) => {
    const jid = j.id || j.slug || j.url || j.title;
    return jid === id;
  });

  return (
    <div className="job-card">
      {/* Clickable area for details */}
      <div onClick={() => navigate(`/job/${id}`)}>
        <div className="job-title">{job.title}</div>

        <p className="company">
          {job.company_name || job.company || "Unknown Company"}
        </p>

        <p className="location">
          {job.location || "Remote"}
        </p>
      </div>

      <button
        className={`save-btn ${isSaved ? "unsave" : ""}`}
        onClick={() => saveJob(job)}
      >
        {isSaved ? "Unsave Job" : "Save Job"}
      </button>
    </div>
  );
}

export default JobCard;