/* eslint-disable react/prop-types */
import Couter from "./Couter";

export default function ShowCouter({ step1, step2 }) {
  return (
    <div>
      <Couter step={step1} />
      <Couter step={step2} />
    </div>
  );
}
