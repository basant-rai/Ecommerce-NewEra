
import SwiperSlider from "../../component/home/silder";
import { useAppSelector } from "../../hooks/redux";

const Home = () => {

  const count = useAppSelector((state) => state.count.count)

  return (
    <div>
      {/* <HomeSlider /> */}
      <SwiperSlider />
      <h1>{count}</h1>
    </div>
  )
}

export default Home