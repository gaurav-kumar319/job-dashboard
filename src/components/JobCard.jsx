import { Link } from "react-router-dom";
import { saveJob } from "../utils/localStorage";

function JobCard({ job }) {
  return (
    <div style={styles.card}>
      <h3>{job.title}</h3>
      <p>{job.company_name}</p>
      <p>{job.candidate_required_location}</p>

      <div style={{ display: "flex", gap: "10px" }}>
        <Link to={`/job/${job.id}`}>View</Link>

        <button onClick={() => saveJob(job)}>Save</button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "8px",
  },
};

export default JobCard;