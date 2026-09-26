import './StatusBadge.css';

export default function StatusBadge({ status }) {
  return (
    <span className={`status-badge status-badge--${status.toLowerCase().replaceAll(' ', '-')}`}>
      <span aria-hidden="true" />
      {status}
    </span>
  );
}
