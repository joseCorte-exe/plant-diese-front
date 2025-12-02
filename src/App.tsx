import { PlantAppDashboard } from "./views/PlantAppDashboard";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/query-client";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen w-full items-center justify-center p-4">
        <PlantAppDashboard />
      </div>
    </QueryClientProvider>
  );
}

export default App;
