import "../styles/filterBar.css";

const FILTERS = ["All", "Active", "Completed"];

export default function FilterBar({ active, onChange }) {
  return (
    <div className="filter-bar">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={active === f ? "active" : ""}
          onClick={() => onChange(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
