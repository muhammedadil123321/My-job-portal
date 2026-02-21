import { createContext, useState, useEffect, useCallback } from "react";

export const JobContext = createContext();

const EMPLOYER_API = "http://localhost:5001/api/jobs";
const ADMIN_API    = "http://localhost:5001/api/admin";

export function JobProvider({ children }) {
  const [jobs,    setJobs]    = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  // ─────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────
  const getToken = () => localStorage.getItem("token");

  const getUserRole = () => {
    try {
      const token = getToken();
      if (!token) return null;
      return JSON.parse(atob(token.split(".")[1])).role;
    } catch {
      return null;
    }
  };

  const authHeader = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  });

  // ─────────────────────────────────────────
  // FETCH JOBS  (role-based URL)
  // ─────────────────────────────────────────
  const fetchJobs = useCallback(async () => {
    const role = getUserRole();

    if (!role) {
      setError("Unauthorized: no valid token found");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url =
        role === "admin"
          ? `${ADMIN_API}/jobs`
          : `${EMPLOYER_API}/my-jobs`;

      const res  = await fetch(url, { headers: authHeader() });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch jobs");

      setJobs(data);
    } catch (err) {
      setError(err.message);
      console.error("fetchJobs error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (getToken()) fetchJobs();
  }, [fetchJobs]);

  // ─────────────────────────────────────────
  // HELPER: update one job's status in state
  // ─────────────────────────────────────────
  const updateJobInState = (id, updatedJob) => {
    setJobs((prev) =>
      prev.map((job) => (job._id === id ? updatedJob : job))
    );
  };

  // ─────────────────────────────────────────
  // HELPER: call admin PUT endpoint
  // ─────────────────────────────────────────
  const adminPut = async (id, action) => {
    const res  = await fetch(`${ADMIN_API}/jobs/${id}/${action}`, {
      method:  "PUT",
      headers: authHeader(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `${action} failed`);
    // Backend must return { job: {...} }
    return data.job;
  };




   // ─────────────────────────────────────────
  // UPDATE JOB
  // ─────────────────────────────────────────

  const updateJob = async (id, updatedData) => {

    try {

      const res = await fetch(`${EMPLOYER_API}/${id}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(updatedData)
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Update failed");

      // update local state immediately
      setJobs(prev =>
        prev.map(job =>
          job._id === id ? data : job
        )
      );

      return data;

    } catch (err) {

      console.error("updateJob error:", err);
      throw err;

    }

  };

  // ─────────────────────────────────────────
  // DELETE JOB  (role-based URL)
  // ─────────────────────────────────────────
  const deleteJob = async (id) => {
    try {
      const role = getUserRole();
      const url  =
        role === "admin"
          ? `${ADMIN_API}/jobs/${id}`
          : `${EMPLOYER_API}/${id}`;

      const res = await fetch(url, {
        method:  "DELETE",
        headers: authHeader(),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Delete failed");
      }

      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.error("deleteJob error:", err);
      throw err;
    }
  };

  // ─────────────────────────────────────────
  // APPROVE JOB
  // ─────────────────────────────────────────
  const approveJob = async (id) => {
    try {
      const updatedJob = await adminPut(id, "approve");
      updateJobInState(id, updatedJob);
    } catch (err) {
      console.error("approveJob error:", err);
      throw err;
    }
  };

  // ─────────────────────────────────────────
  // REJECT JOB
  // ─────────────────────────────────────────
  const rejectJob = async (id) => {
    try {
      const updatedJob = await adminPut(id, "reject");
      updateJobInState(id, updatedJob);
    } catch (err) {
      console.error("rejectJob error:", err);
      throw err;
    }
  };

  // ─────────────────────────────────────────
  // BLOCK JOB
  // ─────────────────────────────────────────
  const blockJob = async (id) => {
    try {
      const updatedJob = await adminPut(id, "block");
      updateJobInState(id, updatedJob);
    } catch (err) {
      console.error("blockJob error:", err);
      throw err;
    }
  };

  // ─────────────────────────────────────────
  // UNBLOCK JOB
  // ─────────────────────────────────────────
  const unblockJob = async (id) => {
    try {
      const updatedJob = await adminPut(id, "unblock");
      updateJobInState(id, updatedJob);
    } catch (err) {
      console.error("unblockJob error:", err);
      throw err;
    }
  };

  // ─────────────────────────────────────────
  // PROVIDER
  // ─────────────────────────────────────────
  return (
    <JobContext.Provider
      value={{
        jobs,
        loading,
        error,
        fetchJobs,
        deleteJob,
        approveJob,
        rejectJob,
        blockJob,
        unblockJob,
        updateJob
      }}
    >
      {children}
    </JobContext.Provider>
  );
}