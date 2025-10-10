import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HistoryPage from "./Pages/HistoryPage/index.jsx";
import CalculatorPage from "./Pages/CalculatorPage/index.jsx";

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
