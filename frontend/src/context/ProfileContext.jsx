import { createContext, useState } from "react";
import { INITIALEMPLOYER, INITIALCANDIDATES } from "../jobDetails/jobCardDetails";

export const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [workerProfile, setWorkerProfile] = useState(INITIALCANDIDATES);
   const [employerProfile, setEmployerProfile] = useState(INITIALEMPLOYER);

  const updateWorkerProfile = (updatedProfile) => {
    setWorkerProfile(updatedProfile);
  };
   const updateEmployerProfile = (updatedProfile) => {
    setEmployerProfile(updatedProfile);
  };

  return (
    <ProfileContext.Provider value={{ workerProfile, updateWorkerProfile,employerProfile,updateEmployerProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}