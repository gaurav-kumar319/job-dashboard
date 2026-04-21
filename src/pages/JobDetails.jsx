import { useContext } from "react";
import { useParams } from "react-router-dom";
import { JobsContext } from "../context/JobsContext";

function JobDetails() {
  const { id } = useParams();
  const { jobs } = useContext(JobsContext);

  // ✅ safe matching (handles API inconsistency)
  const job = jobs.find((j) => {
    const jid = j.id || j.slug || j.url || j.title;
    return String(jid) === String(id);
  });

  if (!job) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Job not found</h2>
        <p>Please go back and try again.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h1>{job.title}</h1>

      <h3>{job.company_name || job.company || "Company not available"}</h3>

      <p>
        <b>Location:</b> {job.location || job.candidate_required_location || "Remote"}
      </p>

      <hr />

      <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
        {job.description || "No description available"}
      </div>

      {job.url && (
        <a href={job.url} target="_blank" rel="noreferrer">
          <button
            style={{
              marginTop: "20px",
              padding: "10px 15px",
              border: "none",
              background: "#22c55e",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Apply Now
          </button>
        </a>
      )}
    </div>
  );
}

export default JobDetails;