import { useParams, useNavigate } from "react-router-dom";
import { INITIALCANDIDATES } from "../../jobDetails/jobCardDetails";
import {
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Globe,
  Clock,
} from "lucide-react";
import workerAvatar from "../../assets/images/workeravathar.png";

export default function AdminViewProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedApplicant = INITIALCANDIDATES.find(
    (item) => item.id === Number(id)
  );

  if (!selectedApplicant) {
    return <p className="p-10 text-center">Applicant not found</p>;
  }

  return (
    <div className="min-h-screen flex justify-center p-6">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-y-auto">

        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-8">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 text-white"
          >
            <X />
          </button>

          <div className="flex items-center gap-6 text-white">
            <img
              src={selectedApplicant.profile || workerAvatar}
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <div>
              <h2 className="text-3xl font-bold">
                {selectedApplicant.name}
              </h2>
              <p className="text-blue-100">{selectedApplicant.city} , {selectedApplicant.state}</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-8 grid md:grid-cols-2 gap-6">
          <Info icon={<Phone />} label="Phone" value={selectedApplicant.phone} />
          <Info icon={<Mail />} label="Email" value={selectedApplicant.email} />
          <Info icon={<MapPin />} label="Address" value={selectedApplicant.address} />
          <Info icon={<Calendar />} label="Age" value={`${selectedApplicant.age} years`} />
          <Info icon={<Globe />} label="Language" value={selectedApplicant.language} />
          <Info icon={<Clock />} label="Availability" value={selectedApplicant.education} />
        </div>

        {/* Skills */}
        <div className="px-8 pb-6">
          <h3 className="font-bold text-lg mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {selectedApplicant.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="px-8 pb-8">
          <h3 className="font-bold text-lg mb-2">About</h3>
          <p className="text-gray-700">{selectedApplicant.about}</p>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex gap-3 bg-gray-50 p-4 rounded-xl border">
      <div className="text-blue-600">{icon}</div>
      <div>
        <p className="text-xs uppercase text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
