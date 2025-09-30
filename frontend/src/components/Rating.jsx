export default function Rating({ value }) {
  const fullStars = Math.floor(value);
  const halfStar = value % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i}>★</span>
      ))}
      {halfStar && <span>☆</span>}
      <span className="text-gray-700 ml-1">{value.toFixed(1)}</span>
    </div>
  );
}
