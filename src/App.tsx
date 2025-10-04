import { RouterProvider } from "react-router-dom";
import { AppProviders } from "@/providers";
import { createAppRouter } from "@/shared/lib/router";
import { routes } from "@/routes";

const router = createAppRouter(routes);

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
