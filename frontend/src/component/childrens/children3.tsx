import React, { useContext } from 'react'
import { GlobalContext } from '../context/global-context'

const Children3 = ({ parentName2 }: any) => {
  const { name } = useContext(GlobalContext);
  
  return (
    <div>
      {name}
    </div>
  )
}

export default Children3