import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HistoryPage from "@pages/HistoryPage/index.jsx";
import CalculatorPage from "@pages/CalculatorPage/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CalculatorPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
