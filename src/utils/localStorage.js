export const getSavedJobs = () => {
  return JSON.parse(localStorage.getItem("savedJobs")) || [];
};

export const saveJob = (job) => {
  const jobs = getSavedJobs();
  const exists = jobs.find((j) => j.id === job.id);

  if (!exists) {
    jobs.push(job);
    localStorage.setItem("savedJobs", JSON.stringify(jobs));
  }
};

export const removeJob = (id) => {
  let jobs = getSavedJobs();
  jobs = jobs.filter((job) => job.id !== id);
  localStorage.setItem("savedJobs", JSON.stringify(jobs));
};