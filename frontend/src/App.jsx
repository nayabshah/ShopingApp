import Header from "./components/Header";
import ProductList from "./components/ProductList";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="container">
      <div>
        <h1>Shop</h1>
      </div>
      <Header />
      <ProductList />
      <Toaster />
    </div>
  );
}

export default App;
