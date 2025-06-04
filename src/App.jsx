import { Toaster } from "sonner";
import AppRoutes from "./routes";
import { ThemeProvider } from "./components/ui/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <div>
        <AppRoutes />
        <Toaster position="top-right" />
      </div>
    </ThemeProvider>
  );
}

export default App;
