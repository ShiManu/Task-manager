import "../styles/statsBar.css";

export default function StatsBar({ tasks }) {
  const active = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="stats-bar">
      <span>{active} active</span>
      <span className="divider">·</span>
      <span>{completed} completed</span>
    </div>
  );
}
