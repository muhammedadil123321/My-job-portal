import { createContext, useState } from "react";
import { INITIALJOBS } from "../jobDetails/jobCardDetails";

export const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState(INITIALJOBS);

  // UPDATE JOB (Generic update for any field)
  const updateJob = (id, updatedData) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, ...updatedData } : job
      )
    );
  };

  // DELETE JOB
  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  // CLOSE JOB
  const closeJob = (id) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, jobStatus: "closed" } : job
      )
    );
  };

  // APPROVE JOB (pending → active)
  const approveJob = (id) => {
    updateJob(id, { jobStatus: "active" });
  };

  // REJECT JOB (any status → rejected)
  const rejectJob = (id) => {
    updateJob(id, { jobStatus: "rejected" });
  };

  // BLOCK JOB (active → blocked)
  const blockJob = (id) => {
    updateJob(id, { jobStatus: "blocked" });
  };

  // UNBLOCK JOB (blocked → active)
  const unblockJob = (id) => {
    updateJob(id, { jobStatus: "active" });
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        setJobs,
        updateJob,
        deleteJob,
        closeJob,
        approveJob,
        rejectJob,
        blockJob,
        unblockJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}