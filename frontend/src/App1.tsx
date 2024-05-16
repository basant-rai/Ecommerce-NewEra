import Header from './layout/Header';
import Footer from './layout/Footer';

import Display from './component/Display';



function App() {

  const handleClick = () => {
    console.log("Clicked")
  }
  const handleClick2 = () => {
    console.log("I am clicked")
  }
  return (
    <div>
      <Header />
      <Display
        FirstName={"Alesh"}
        LastName={"Maharjan"}
        address={"aaa"}
        age={50}
        onClick={handleClick}
      />
      <Display
        FirstName={"aaaa"}
        LastName={"Maharjan"}
        address={"aaa"}
        age={50}
        onClick={handleClick2}
      />
      <Footer />
    </div>

  );
}

export default App;
