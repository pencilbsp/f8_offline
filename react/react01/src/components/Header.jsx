// import { Fragment } from "react";

export default function Header({ showMenu }) {
  return (
    <>
      <header>HEADER</header>
      <header>HEADER2</header>

      {showMenu && (
        <>
          <div>Menu Item</div>
          <div>Menu Item</div>
        </>
      )}
    </>
  );
}
