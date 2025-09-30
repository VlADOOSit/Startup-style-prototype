import { useState, useRef, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import Autocomplete from "../components/Autocomplete";
import SearchBar from "../components/SearchBar";
import api from "../api/api";

export default function Search() {
  const allSkills = [
    "React",
    "Node.js",
    "TypeScript",
    "GraphQL",
    "JavaScript",
    "Vue.js",
    "Angular",
    "Python",
    "Django",
    "Ruby on Rails",
  ];

  const popularSkills = ["React", "Node.js", "TypeScript", "GraphQL"];

  const [results, setResults] = useState([]);

  const [error, setError] = useState(null);

  const [inputValue, setInputValue] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsVisible, setSuggestionsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchContainerRef = useRef(null);

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const res = await api.get("/profiles");

        console.log(res);
        setResults(res.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    getProfiles();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSuggestionsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setActiveIndex(-1);

    if (value.length > 0) {
      const filteredSuggestions = allSkills.filter(
        (skill) =>
          skill.toLowerCase().includes(value.toLowerCase()) &&
          !selectedSkills.includes(skill)
      );
      setSuggestions(filteredSuggestions);
      setSuggestionsVisible(true);
    } else {
      setSuggestions([]);
      setSuggestionsVisible(false);
    }
  };

  const addSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setInputValue("");
    setSuggestions([]);
    setSuggestionsVisible(false);
    setActiveIndex(-1);
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSuggestionClick = (skill) => {
    addSkill(skill);
  };

  const handleKeyDown = (e) => {
    if (!isSuggestionsVisible) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter") {
      if (activeIndex !== -1) {
        e.preventDefault();
        addSkill(suggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setSuggestionsVisible(false);
      setActiveIndex(-1);
    }
  };

  async function search() {
    try {
      const profiles_api = await api.post("/search", {
        skills: selectedSkills,
      });
      console.log(profiles_api);
      setResults(profiles_api.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="py-10 px-6">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Search Profiles
          </h1>

          <div className="relative" ref={searchContainerRef}>
            <SearchBar
              {...{
                selectedSkills,
                removeSkill,
                inputValue,
                handleInputChange,
                handleKeyDown,
                setSuggestionsVisible,
              }}
            />
            <Autocomplete
              {...{
                isSuggestionsVisible,
                suggestions,
                handleSuggestionClick,
                activeIndex,
              }}
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-wrap gap-2">
              {popularSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 text-sm font-medium py-1 px-3 rounded-full"
                >
                  {skill}
                </button>
              ))}
            </div>

            <button
              onClick={search}
              className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {results.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            id={Number(profile.id)}
          />
        ))}
        {error && <div style={{ color: "red" }}>error: {error}</div>}
      </div>
    </div>
  );
}
