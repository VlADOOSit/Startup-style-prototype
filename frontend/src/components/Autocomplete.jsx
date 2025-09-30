export default function Autocomplete({
  isSuggestionsVisible,
  suggestions,
  handleSuggestionClick,
  activeIndex,
}) {
  return (
    <>
      {isSuggestionsVisible && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`px-4 py-2 cursor-pointer hover:bg-indigo-50 ${
                index === activeIndex ? "bg-indigo-100" : ""
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
