import { useState } from "react";

import Color from "../../hooks/color"
import ReactHook from "../../hooks/hook"

const Home = () => {
  const [color, setColor] = useState('bg-green-50');

  return (
    <div>
      <ReactHook />

      <div className={`${color} p-20`}>{color}</div>

      <Color
        buttonName="Change To Blue"
        buttonColor={"bg-blue-500"}
        colorChange={() => setColor("bg-blue-500")}
      />

      <Color
        buttonName="Change To Yellow"
        colorChange={() => setColor("bg-yellow-500")}
        buttonColor={"bg-yellow-500"}
      />
      <Color
        buttonName="Change To Purple"
        colorChange={() => setColor("bg-purple-500")}
        buttonColor={"bg-purple-500"}
      />
      <Color
        buttonName="Change To Red"
        colorChange={() => setColor("bg-red-500")}
        buttonColor={"bg-red-500"}
      />
      <Color
        buttonName="Change To Pink"
        buttonColor={"bg-pink-500"}
        colorChange={() => setColor("bg-pink-500")}
      />
    </div>
  )
}

export default Home