import Login from "./components/Login";
import { useAuth0 } from "@auth0/auth0-react";
import Support from "./components/Support";

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {!isAuthenticated ? <Login /> : <Support user={user} />}
    </div>
  );
}

export default App;
