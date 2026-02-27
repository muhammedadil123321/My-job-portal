import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Globe,
  Clock,
  ArrowLeft
} from "lucide-react";
import workerAvatar from "../../assets/images/workeravathar.png";

export default function AdminViewProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5001/api/admin/workers/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setSelectedApplicant(data.worker);
        } else {
          setError(data.message || "Failed to fetch worker details");
        }

      } catch (error) {
        console.error("Error fetching worker details:", error);
        setError("Error fetching worker details");
      } finally {
        setLoading(false);
      }
    };

    fetchWorker();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </div>
    );
  }

  if (error || !selectedApplicant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error || "Applicant not found"}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-sm border border-gray-200 overflow-hidden">

        {/* Back Button Header */}
        <div className="bg-white px-8 py-4 border-b border-gray-200">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Worker Management
          </button>
        </div>

        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-8">
          <div className="flex items-center gap-6 text-white">
            <img
              src={selectedApplicant.profileImage || workerAvatar}
              className="w-24 h-24 rounded-full object-cover border-4 border-white bg-gray-200"
              alt={selectedApplicant.name}
            />
            <div>
              <h2 className="text-3xl font-bold">
                {selectedApplicant.name}
              </h2>
              <p className="text-blue-100">{selectedApplicant.city} {selectedApplicant.state ? `, ${selectedApplicant.state}` : ''}</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-8 grid md:grid-cols-2 gap-6">
          <Info icon={<Phone />} label="Phone" value={selectedApplicant.phone} />
          <Info icon={<Mail />} label="Email" value={selectedApplicant.email} />
          <Info icon={<MapPin />} label="Address" value={selectedApplicant.address} />
          <Info icon={<Calendar />} label="Age" value={`${selectedApplicant.age} ${selectedApplicant.age !== 'N/A' ? 'years' : ''}`} />
          <Info icon={<Globe />} label="Language" value={selectedApplicant.language} />
          <Info icon={<Clock />} label="Education" value={selectedApplicant.education} />
        </div>

        {/* Skills */}
        <div className="px-8 pb-6">
          <h3 className="font-bold text-lg mb-2 text-gray-900">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {selectedApplicant.skills && selectedApplicant.skills.length > 0 ? (
              selectedApplicant.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No skills provided</span>
            )}
          </div>
        </div>

        {/* About */}
        <div className="px-8 pb-8">
          <h3 className="font-bold text-lg mb-2 text-gray-900">About</h3>
          <p className="text-gray-700 leading-relaxed">{selectedApplicant.about}</p>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
      <div className="text-blue-600">{icon}</div>
      <div>
        <p className="text-xs uppercase text-gray-500 font-semibold">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}
