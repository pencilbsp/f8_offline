import "./App.css";

import Input from "./components/Input";

function App() {
  return (
    <>
      <Input name="name" type="text" />
      <Input name="email" type="email" />
      <Input name="phone" type="phone" />
    </>
  );
}

export default App;
