import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  X,
  Plus,
  CheckCircle,
  ArrowLeft,
  Send,
  ArrowRight,
  Loader2,
  AlertCircle,
  MapPin,
  Clock,
  IndianRupee,
} from "lucide-react";
import { Briefcase, Building2 } from "lucide-react";

const API_URL = "http://localhost:5001/api/jobs";
const WORKER_PROFILE_API = "http://localhost:5001/api/worker-profile/me";

const EDUCATION_OPTIONS = [
  "Secondary Education",
  "Higher Secondary Education",
  "Advanced Education",
];

/* ── Auto-grow textarea ───────────────────────────────────────── */
function AutoTextarea({ value, onChange, placeholder, className }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [value]);
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={3}
      className={className}
      style={{ resize: "none", overflow: "hidden" }}
    />
  );
}

/* ── Pill tag ─────────────────────────────────────────────────── */
function Tag({ label, color, onRemove }) {
  const s = {
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    sky: "bg-sky-50  text-sky-700  border border-sky-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${s[color]}`}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="opacity-40 hover:opacity-100 transition-opacity ml-0.5"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}

/* ── Job card — shown at top after heading ────────────────────── */
function JobCard({ job }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      {/* Section title — same style as contact/profile section titles */}
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Job Details
      </h2>

      <div className="flex items-start gap-4">
        {/* Company logo */}
        <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden">
          {job?.employer?.profileImage ? (
            <img
              src={job.employer.profileImage}
              alt="Company logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <Building2 className="w-5 h-5 text-blue-600" />
          )}
        </div>

        {/* Text content */}
        <div className="flex flex-col">
          {/* Job Title */}
          <h3 className="text-lg font-semibold text-gray-900 mt-1">
            {job?.jobTitle || "Job Title"}
          </h3>

          {/* Location and JobType in flex row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
            {job?.workPlaceName && (
              <div className="flex items-center gap-1.5 text-sm">
                <Building2 className="w-4 h-4 text-gray-400" />
                {job.workPlaceName}
              </div>
            )}
            {(job?.city || job?.state) && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gray-400" />
                {[job.city, job.state].filter(Boolean).join(", ")}
              </div>
            )}
            {job?.jobType && (
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-gray-400" />
                <span className="capitalize">{job.jobType}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Field row ────────────────────────────────────────────────── */
function FieldRow({ label, last = false, children }) {
  return (
    <div className={`py-5 ${!last ? "border-b border-gray-100" : ""}`}>
      <p className="text-md text-gray-600  mb-1.5">{label}</p>
      {children}
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────── */
export default function ReviewApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [workerProfile, setWorkerProfile] = useState(null);
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  const [editingContact, setEditingContact] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);

  const [contactForm, setContactForm] = useState({
    fullName: "",
    phoneNumber: "",
    area: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [profileForm, setProfileForm] = useState({
    skills: [],
    education: "",
    age: "",
    languages: [],
    about: "",
  });
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submitApplication = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5001/api/applications/${jobData._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName: workerProfile.fullName,
            email: user.email,
            phoneNumber: workerProfile.phoneNumber,

            area: workerProfile.area,
            district: workerProfile.district,
            state: workerProfile.state,
            pincode: workerProfile.pincode,

            education: workerProfile.education,
            skills: workerProfile.skills,
            languages: workerProfile.languages,
            about: workerProfile.about,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to submit application");

      const data = await res.json();

      console.log("Application submitted:", data);

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Failed to submit application");
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const pRes = await fetch(WORKER_PROFILE_API, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (pRes.status === 404) {
          navigate("/worker/profile-form");
          return;
        }
        if (!pRes.ok) throw new Error("Failed to load worker profile");
        const pData = await pRes.json();

        const jRes = await fetch(`${API_URL}/${id}`, {
          headers: { "Content-Type": "application/json" },
        });
        if (!jRes.ok) throw new Error("Failed to load job details");
        const jData = await jRes.json();

        setWorkerProfile(pData);
        setJobData(jData);
        setContactForm({
          fullName: pData.fullName || "",
          phoneNumber: pData.phoneNumber || "",
          area: pData.area || "",
          district: pData.district || "",
          state: pData.state || "",
          pincode: pData.pincode || "",
        });
        setProfileForm({
          skills: pData.skills || [],
          education: pData.education || "",
          age: pData.age || "",
          languages: pData.languages || [],
          about: pData.about || "",
        });
      } catch (e) {
        setError(e.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const cc = (f, v) => setContactForm((p) => ({ ...p, [f]: v }));
  const pc = (f, v) => setProfileForm((p) => ({ ...p, [f]: v }));

  const saveContact = async () => {
    try {
      const token = localStorage.getItem("token");

      const updatedProfile = {
        ...workerProfile,
        ...contactForm,
      };

      const res = await fetch(WORKER_PROFILE_API, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!res.ok) throw new Error("Failed to update contact info");

      const data = await res.json();

      // update local profile
      setWorkerProfile(data.profile);

      // update navbar immediately
      updateUser({
        name: data.profile.fullName,
        profileImage: data.profile.profileImage,
      });

      setEditingContact(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save contact info");
    }
  };

  const cancelContact = () => {
    setContactForm({
      fullName: workerProfile?.fullName || "",
      phoneNumber: workerProfile?.phoneNumber || "",
      area: workerProfile?.area || "",
      district: workerProfile?.district || "",
      state: workerProfile?.state || "",
      pincode: workerProfile?.pincode || "",
    });
    setEditingContact(false);
  };
  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const updatedProfile = {
        ...workerProfile,
        ...profileForm,
      };

      const res = await fetch(WORKER_PROFILE_API, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const data = await res.json();

      setWorkerProfile(data.profile);

      updateUser({
        name: data.profile.fullName,
        profileImage: data.profile.profileImage,
      });

      setEditingProfile(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    }
  };

  const cancelProfile = () => {
    setProfileForm({
      skills: workerProfile?.skills || [],
      education: workerProfile?.education || "",
      age: workerProfile?.age || "",
      languages: workerProfile?.languages || [],
      about: workerProfile?.about || "",
    });
    setNewSkill("");
    setNewLanguage("");
    setEditingProfile(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileForm.skills.includes(newSkill.trim())) {
      pc("skills", [...profileForm.skills, newSkill.trim()]);
      setNewSkill("");
    }
  };
  const addLang = () => {
    if (
      newLanguage.trim() &&
      !profileForm.languages.includes(newLanguage.trim())
    ) {
      pc("languages", [...profileForm.languages, newLanguage.trim()]);
      setNewLanguage("");
    }
  };

  const inp =
    "w-full px-3.5 py-2.5 text-sm text-gray-800 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 transition";

  /* ── Loading ── */
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={36} className="animate-spin text-blue-600" />
          <p className="text-sm text-gray-500 font-medium">
            Loading your application...
          </p>
        </div>
      </div>
    );

  /* ── Error ── */
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="flex flex-col items-center gap-3 text-center max-w-xs">
          <AlertCircle size={36} className="text-red-500" />
          <p className="text-base font-bold text-gray-900">Failed to load</p>
          <p className="text-sm text-gray-500">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  if (!workerProfile || !jobData) return null;

  /* ── Success ── */
  if (submitted)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Application Submitted!
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            Your application for{" "}
            <span className="font-semibold text-gray-800">
              {jobData?.jobTitle}
            </span>{" "}
            at{" "}
            <span className="font-semibold text-gray-800">
              {jobData?.workPlaceName}
            </span>{" "}
            has been sent successfully.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-8 py-3 rounded-full transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );

  /* ────────────────────────────────────────────────────────────
   *  SectionBar — title now matches "Job Details" style
   * ──────────────────────────────────────────────────────────── */
  const SectionBar = ({ title, editing, onEdit, onSave, onCancel }) => (
    <div className="flex items-center justify-between mb-3">
      {/* ✅ Same font/weight as JobCard's "Job Details" heading */}
      <p className="text-lg  font-semibold text-gray-900">{title}</p>
      {!editing ? (
        <button
          onClick={onEdit}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          Edit
        </button>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={onSave}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="text-sm font-medium text-gray-400 hover:text-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* ── Page body ── */}
      <div className="max-w-xl mx-auto px-5 pt-6 pb-20">
        {/* Main Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Please review your application
        </h1>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          You will not be able to make changes after you submit your
          application.
        </p>

        {/* Job Details Card */}
        <JobCard job={jobData} />

        <div className="h-14 flex items-center justify-start">
          <button
            onClick={() => (step === 1 ? navigate(-1) : setStep(1))}
            className="flex items-center gap-2 text-gray-900 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go back</span>
          </button>
        </div>

        {/* ═══════════════════════════════════ */}
        {/*  STEP 1  —  Contact Information    */}
        {/* ═══════════════════════════════════ */}
        {step === 1 && (
          <>
            <SectionBar
              title="Contact information"
              editing={editingContact}
              onEdit={() => setEditingContact(true)}
              onSave={saveContact}
              onCancel={cancelContact}
            />

            <div className="bg-white border border-gray-200 rounded-2xl px-5 mb-8 shadow-sm">
              <FieldRow label="Full name">
                {editingContact ? (
                  <input
                    type="text"
                    value={contactForm.fullName}
                    onChange={(e) => cc("fullName", e.target.value)}
                    className={inp}
                    placeholder="Your full name"
                  />
                ) : (
                  <p className="text-base font-semibold text-gray-900">
                    {workerProfile?.fullName || (
                      <span className="text-gray-400 font-normal text-sm">
                        Not provided
                      </span>
                    )}
                  </p>
                )}
              </FieldRow>

              <FieldRow label="Email">
                <p className="text-base font-semibold text-gray-900">
                  {user?.email || "Not provided"}
                </p>
                <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
                  To reduce fraud, we may hide your email address. If hidden, an
                  employer will not be able to see your real email address.
                </p>
              </FieldRow>

              <FieldRow label="Phone number">
                {editingContact ? (
                  <input
                    type="tel"
                    value={contactForm.phoneNumber}
                    onChange={(e) => cc("phoneNumber", e.target.value)}
                    className={inp}
                    placeholder="e.g. +91 98765 43210"
                  />
                ) : (
                  <p className="text-base font-semibold text-gray-900">
                    {workerProfile?.phoneNumber || (
                      <span className="text-gray-400 font-normal text-sm">
                        Not provided
                      </span>
                    )}
                  </p>
                )}
              </FieldRow>

              <FieldRow label="Address" last>
                {editingContact ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={contactForm.area}
                        onChange={(e) => cc("area", e.target.value)}
                        className={inp}
                        placeholder="Area"
                      />

                      <input
                        type="text"
                        value={contactForm.district}
                        onChange={(e) => cc("district", e.target.value)}
                        className={inp}
                        placeholder="District"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={contactForm.state}
                        onChange={(e) => cc("state", e.target.value)}
                        className={inp}
                        placeholder="State"
                      />

                      <input
                        type="text"
                        value={contactForm.pincode}
                        onChange={(e) => cc("pincode", e.target.value)}
                        className={inp}
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-base font-semibold text-gray-900">
                    {workerProfile?.area ||
                    workerProfile?.district ||
                    workerProfile?.state ||
                    workerProfile?.pincode ? (
                      `${workerProfile?.area || ""}, ${
                        workerProfile?.district || ""
                      }, ${workerProfile?.state || ""} - ${
                        workerProfile?.pincode || ""
                      }`
                    ) : (
                      <span className="text-gray-400 font-normal text-sm">
                        Not provided
                      </span>
                    )}
                  </p>
                )}
              </FieldRow>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold py-3.5 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* ═══════════════════════════════════ */}
        {/*  STEP 2  —  Profile Details        */}
        {/* ═══════════════════════════════════ */}
        {step === 2 && (
          <>
            <SectionBar
              title="Profile details"
              editing={editingProfile}
              onEdit={() => setEditingProfile(true)}
              onSave={saveProfile}
              onCancel={cancelProfile}
            />

            <div className="bg-white border border-gray-200 rounded-2xl px-5 mb-6 shadow-sm">
              {/* ── Education ── */}
              <FieldRow>
                <div className="grid grid-cols-2 gap-4">
                  {/* Education */}
                  <div>
                    <p className="text-base text-gray-600 mb-1">Education</p>

                    {editingProfile ? (
                      <select
                        value={profileForm.education}
                        onChange={(e) => pc("education", e.target.value)}
                        className={inp}
                      >
                        <option value="" disabled>
                          Select education level…
                        </option>
                        {EDUCATION_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-base font-semibold text-gray-900">
                        {workerProfile?.education || (
                          <span className="text-gray-400 font-normal text-sm">
                            Not provided
                          </span>
                        )}
                      </p>
                    )}
                  </div>

                  {/* Age */}
                  <div>
                    <p className="text-base text-gray-600 mb-1">Age</p>

                    {editingProfile ? (
                      <input
                        type="number"
                        value={profileForm.age}
                        onChange={(e) => pc("age", e.target.value)}
                        className={inp}
                        placeholder="Enter age"
                        min="18"
                        max="30"
                      />
                    ) : (
                      <p className="text-base font-semibold text-gray-900">
                        {workerProfile?.age || (
                          <span className="text-gray-400 font-normal text-sm">
                            Not provided
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </FieldRow>

              {/* Skills + Languages */}
              <div className="py-5 border-b border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Skills */}
                  <div>
                    <p className="text-base text-gray-600 mb-2">Skills</p>
                    {editingProfile ? (
                      <div className="space-y-2.5">
                        <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                          {profileForm.skills.map((s, i) => (
                            <Tag
                              key={i}
                              label={s}
                              color="blue"
                              onRemove={() =>
                                pc(
                                  "skills",
                                  profileForm.skills.filter((x) => x !== s)
                                )
                              }
                            />
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && addSkill()}
                            className={inp}
                            placeholder="Add skill…"
                          />
                          <button
                            onClick={addSkill}
                            className="px-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex-shrink-0"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {workerProfile?.skills?.length > 0 ? (
                          workerProfile.skills.map((s, i) => (
                            <Tag key={i} label={s} color="blue" />
                          ))
                        ) : (
                          <span className="text-sm text-gray-400">
                            Not provided
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Languages */}
                  <div>
                    <p className="text-base text-gray-600 mb-2">Languages</p>
                    {editingProfile ? (
                      <div className="space-y-2.5">
                        <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                          {profileForm.languages.map((l, i) => (
                            <Tag
                              key={i}
                              label={l}
                              color="sky"
                              onRemove={() =>
                                pc(
                                  "languages",
                                  profileForm.languages.filter((x) => x !== l)
                                )
                              }
                            />
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newLanguage}
                            onChange={(e) => setNewLanguage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && addLang()}
                            className={inp}
                            placeholder="Add language…"
                          />
                          <button
                            onClick={addLang}
                            className="px-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex-shrink-0"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {workerProfile?.languages?.length > 0 ? (
                          workerProfile.languages.map((l, i) => (
                            <Tag key={i} label={l} color="sky" />
                          ))
                        ) : (
                          <span className="text-sm text-gray-400">
                            Not provided
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* About me */}
              <FieldRow label="About me" last>
                {editingProfile ? (
                  <AutoTextarea
                    value={profileForm.about}
                    onChange={(e) => pc("about", e.target.value)}
                    placeholder="Tell us about yourself…"
                    className={`${inp} leading-relaxed`}
                  />
                ) : (
                  <p className="text-base font-bold text-gray-900 whitespace-pre-line leading-relaxed">
                    {workerProfile?.about || (
                      <span className="text-gray-400 font-normal text-sm">
                        Not provided
                      </span>
                    )}
                  </p>
                )}
              </FieldRow>
            </div>

            {/* Consent */}
            <p className="text-xs text-gray-400 text-center leading-relaxed mb-5 px-4">
              By submitting, you confirm all information is accurate and agree
              to share it with the employer.
            </p>

            {/* Submit */}
            <button
              onClick={submitApplication}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold py-3.5 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit your application
            </button>
          </>
        )}
      </div>
    </div>
  );
}
