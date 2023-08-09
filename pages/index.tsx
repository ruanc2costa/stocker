import Header from "../components/Header";
import TickerList from "../components/TickerList";

export default function index() {
  return (
    <>
      {Header()}
      {TickerList()}
    </>
  );
}
