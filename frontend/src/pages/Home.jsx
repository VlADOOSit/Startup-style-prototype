import TagCloudComponent from "../components/TagCloud";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="mt-16 flex items-center justify-center bg-white">
      <div className="w-11/12 max-w-5xl p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[450px]">
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-6xl font-extrabold text-gray-900 mb-8 leading-none">
              Welcome to
              <br />
              the Platform
            </h1>
            <Link
              to="/search"
              className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-xl 
                         hover:bg-indigo-700 transition duration-300"
            >
              Go to Search
            </Link>
          </div>

          <div className="flex flex-col justify-end items-end">
            <TagCloudComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
