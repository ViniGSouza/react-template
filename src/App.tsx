/**
 * App Component
 * Componente principal da aplicação
 */

import { AppProviders } from "@/providers";
import { AppRoutes } from "@/routes";

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;
