import { BrowserRouter } from "react-router-dom";
// routes
import Router from "@/routes";
// theme
import ThemeProvider from "@/theme";

// ----------------------------------------------------------------------

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
