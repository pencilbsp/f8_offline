
/* eslint-disable react/prop-types */
export default function Input({ name, type = "text" }) {
  const id = Date.now() + Math.random();
  return (
    <div>
      <label htmlFor={id}>{name}</label>
      <input type={type} placeholder={name} id={id} />
    </div>
  );
}
