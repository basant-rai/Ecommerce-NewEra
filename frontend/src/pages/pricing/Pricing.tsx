import { useContext, useEffect } from 'react';
import Children1 from '../../component/childrens/children1';
import { GlobalContext } from '../../component/context/global-context';

const Pricing = () => {

  const { setName } = useContext(GlobalContext);

  useEffect(() => {
    setName("This is parent Name")
  }, [setName])

  return (
    <div>
      <Children1 />
    </div>
  )
}

export default Pricing