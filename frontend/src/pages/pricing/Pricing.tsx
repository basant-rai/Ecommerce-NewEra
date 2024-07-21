import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { setCount } from "../../redux/count-slice/count";

const Pricing = () => {

  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.count.count);

  const handleCount
    = useCallback(() => {
      dispatch(setCount({ count: count + 1 }))
    }, [dispatch, count])

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10">
      <button type="button" onClick={handleCount}>
        Count
      </button>
      <h3 className="text-5xl font-bold">{count}</h3>
    </div>
  )
}

export default Pricing