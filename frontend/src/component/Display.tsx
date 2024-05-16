
interface Props {
  FirstName: string;
  LastName?: string;
  age?: number;
  address?: string;
  onClick?: any;
}

const Display = ({
  FirstName,
  LastName,
  age,
  address,
  onClick
}: Props) => {

  return (
    <div>
      <p>{FirstName}</p>
      <p>{LastName}</p>
      <p> {age}</p>
      <p>{address}</p>

      <button type="button" onClick={onClick}>Click Me</button>
    </div>
  )
}

export default Display