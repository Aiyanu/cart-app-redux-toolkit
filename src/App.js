import { useDispatch, useSelector } from "react-redux";
import CardContainer from "./components/CardContainer";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { calculateTotals } from "./features/cart/cartSlice";
import Modal from "./components/Modal";


function App() {
  const { cartItems } = useSelector((state) => state.cart)
  const { isOpen } = useSelector((state) => state.modal)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(calculateTotals())
  },[cartItems])
  return <main>
    {isOpen && <Modal/>}
    <Navbar />
    <CardContainer/>
  </main>;
}
export default App;
