import { useEffect, useRef } from "react";
import TagCloud from "TagCloud";

const skills = [
  "React", "Node.js", "TypeScript", "GraphQL",
  "JavaScript", "CSS", "Express", "PostgreSQL"
];

export default function TagCloudComponent() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const cloud = TagCloud(containerRef.current, skills, {
        radius: 150,
        maxSpeed: "fast",
        initSpeed: "normal",
        direction: 135,
        keep: true
      });

      // Проставляем классы для стилизации как "чипсы"
      const spans = containerRef.current.querySelectorAll("span");
      spans.forEach((el) => {
        el.classList.add(
          "px-3",
          "py-1",
          "bg-blue-100",
          "text-blue-600",
          "rounded-full",
          "text-sm",
          "font-medium",
          "shadow-sm"
        );
      });

      return () => cloud.destroy();
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-64">
      <span ref={containerRef} />
    </div>
  );
}
