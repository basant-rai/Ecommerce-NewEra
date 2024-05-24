import { FunctionComponent, createContext, useState } from "react"
import { IProduct } from "../../interface/product"

interface IContext {
  name?: string
  setName?: any,
  products?: IProduct[],
}

interface Props {
  children: React.ReactNode
}

export const GlobalContext = createContext<IContext>({
  name: undefined,
  setName: null,
  products: undefined
})

const GlobalContextProvider: FunctionComponent<Props> = ({ children }) => {

  const [name, setName] = useState();


  return (
    <GlobalContext.Provider value={{ name, setName }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider