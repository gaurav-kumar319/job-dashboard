import { useContext, useState } from "react";
import { JobsContext } from "../context/JobsContext";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import useDebounce from "../hooks/useDebounce";

function Home() {
  const {
    jobs,
    loading,
    error,
    searchQuery,
    filters,
    setFilters,
  } = useContext(JobsContext);

  const debouncedSearch = useDebounce(searchQuery, 400);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  // ✅ CLEAN FILTER LOGIC (FIXED API ISSUES)
  const filteredJobs = jobs
    .filter((job) =>
      (job.title || "")
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    )
    .filter((job) => {
      if (filters.type === "all") return true;

      const text = JSON.stringify(job).toLowerCase();

      if (filters.type === "full") return text.includes("full");
      if (filters.type === "part") return text.includes("part");
      if (filters.type === "contract") return text.includes("contract");

      return true;
    })
    .filter((job) => {
      if (filters.location === "all") return true;

      const text = JSON.stringify(job).toLowerCase();

      if (filters.location === "remote") return text.includes("remote");
      if (filters.location === "india") return text.includes("india");
      if (filters.location === "usa") return text.includes("usa");

      return true;
    });

  const start = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(start, start + jobsPerPage);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredJobs.length / jobsPerPage)
  );

  if (loading) return <h3 style={{ padding: 20 }}>Loading...</h3>;
  if (error) return <h3 style={{ padding: 20 }}>{error}</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <SearchBar />

      {/* FILTERS */}
      <div className="filters">
        <select
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value })
          }
        >
          <option value="all">All Types</option>
          <option value="full">Full Time</option>
          <option value="part">Part Time</option>
          <option value="contract">Contract</option>
        </select>

        <select
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
        >
          <option value="all">All Locations</option>
          <option value="remote">Remote</option>
          <option value="india">India</option>
          <option value="usa">USA</option>
        </select>
      </div>

      {/* JOB LIST */}
      {currentJobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        currentJobs.map((job, index) => (
          <JobCard key={job.id || job.slug || index} job={job} />
        ))
      )}

      {/* PAGINATION */}
      <div className="pagination">
        <button
          onClick={() =>
            setCurrentPage((p) => Math.max(p - 1, 1))
          }
        >
          Prev
        </button>

        <span>
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((p) => Math.min(p + 1, totalPages))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;