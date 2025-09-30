import { Link, NavLink } from "react-router-dom";
import Rating from "./Rating";

export default function ProfileCard({ profile, id }) {
  return (
    <Link to={`/profile/${id}`}>
      <div className="p-4 bg-white border-1 border-gray-200 shadow rounded-2xl flex flex-col gap-2 transform transition-transform duration-300 hover:scale-105">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto" />
        <h2 className="text-lg font-semibold text-center">{profile.name}</h2>
        <p className="text-sm text-gray-500 text-center">
          {profile.age}, {profile.city}
        </p>
        <div className="flex flex-wrap justify-center gap-1">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-700 text-center">{profile.about}</p>
        <div className="flex justify-center mt-2">
          <Rating value={profile.rating} />
        </div>
      </div>
    </Link>
  );
}
