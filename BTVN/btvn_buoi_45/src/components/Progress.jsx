import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function Progress({ value }) {
  return <div className="fixed w-full left-0 top-0 h-1 bg-sky-500"></div>;
}

export function CircleProgress({ value, className, strokeWidth = 16 }) {
  return (
    <div className={className}>
      <CircularProgressbar value={value} strokeWidth={strokeWidth} />
    </div>
  );
}
