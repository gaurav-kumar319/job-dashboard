import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchJobs } from "../services/api";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJobs().then((jobs) => {
      const found = jobs.find((j) => String(j.id) === id);
      setJob(found);
    });
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{job.title}</h2>
      <h4>{job.company_name}</h4>

      {/* FIX IS HERE 👇 */}
      <div dangerouslySetInnerHTML={{ __html: job.description }} />

      <a href={job.url} target="_blank">
        Apply Now
      </a>
    </div>
  );
}

export default JobDetails;