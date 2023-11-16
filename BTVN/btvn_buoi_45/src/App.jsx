import Player from "./components/Player";
import History from "./components/History";
import ThemeToggle from "./components/ThemeToggle";
import { HistoryProvider } from "./context/History";

function App() {
  return (
    <div className="container max-w-5xl">
      <div className="flex justify-between py-4 items-center">
        <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">
          Chào mừng bạn đến với trò chơi đoán số!
        </h1>
        <ThemeToggle />
      </div>

      <div className="flex flex-col gap-y-6">
        <HistoryProvider>
          <Player />
          <History />
        </HistoryProvider>
      </div>
    </div>
  );
}

export default App;
