
interface Props {
  colorChange: any
  buttonName: string
}

const Color = ({ colorChange, buttonName }: Props) => {

  return (
    <div>
      <button
        onClick={colorChange}
        className='border bg-black text-white px-5 py-2'
      >
        {buttonName}
      </button>
    </div>
  )
}

export default Color