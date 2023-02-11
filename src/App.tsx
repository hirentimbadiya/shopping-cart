import { Route, Routes } from "react-router";
import { Container } from "react-bootstrap";
import { Home, Store, About } from "./pages";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
