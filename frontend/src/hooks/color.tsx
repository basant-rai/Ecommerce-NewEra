
interface Props {
  colorChange: any
  buttonName: string
  buttonColor: string
}

const Color = ({ colorChange, buttonName, buttonColor }: Props) => {

  return (
    <div>
      <button
        onClick={colorChange}
        className={`border ${buttonColor} text-white px-5 py-2`}
      >
        {buttonName}
      </button>
    </div>
  )
}

export default Color