const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default function SearchBar({
  selectedSkills,
  removeSkill,
  inputValue,
  handleInputChange,
  handleKeyDown,
  setSuggestionsVisible,
}) {
  return (
    <div className="border border-gray-300 rounded-lg p-2 flex flex-wrap items-center gap-2 focus-within:ring-2 focus-within:ring-indigo-500">
      {selectedSkills.map((skill) => (
        <div
          key={skill}
          className="flex items-center bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-sm font-semibold"
        >
          {skill}
          <button
            onClick={() => removeSkill(skill)}
            className="ml-2 text-indigo-500 hover:text-indigo-800 focus:outline-none"
          >
            <XIcon />
          </button>
        </div>
      ))}

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => inputValue && setSuggestionsVisible(true)}
        className="flex-grow bg-transparent focus:outline-none p-1"
        placeholder={selectedSkills.length === 0 ? "Skills" : ""}
      />
    </div>
  );
}
