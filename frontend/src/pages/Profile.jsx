import { useState, useEffect } from "react";
import Rating from "../components/Rating";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await api(`/profiles/${id}`);
        setProfile(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getProfile();
  }, []);

  return (
    <div className="max-w-lg mx-auto py-10">
      <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto" />
      <h2 className="text-2xl font-bold text-center mt-4">{profile.name}</h2>
      <p className="text-center text-gray-600">
        {profile.age}, {profile.city}
      </p>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {profile.skills?.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
      <h3 className="text-lg font-semibold mt-6">About</h3>
      <p className="text-gray-700">{profile?.about}</p>
      <div className="flex justify-center mt-4">
        {profile.rating !== undefined && <Rating value={profile.rating} />}
      </div>
    </div>
  );
}
