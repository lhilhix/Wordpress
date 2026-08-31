import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ChatWidget from "./components/ChatWidget";
import SEORunner from "./components/SEORunner";
import { ThemeProvider } from "./hooks/useTheme";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SEORunner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <ChatWidget />
      </BrowserRouter>
    </ThemeProvider>
  );
}

