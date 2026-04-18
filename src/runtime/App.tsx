import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Gallery } from "./pages/Gallery";
import { Preview } from "./pages/Preview";
import { Render } from "./pages/Render";
import { HowTo } from "./pages/HowTo";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/docs" element={<HowTo />} />
        <Route path="/:compositionId" element={<Preview />} />
        <Route path="/render/:compositionId" element={<Render />} />
      </Routes>
    </BrowserRouter>
  );
}
