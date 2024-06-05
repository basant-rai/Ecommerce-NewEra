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
    <div>
      <button type="button" onClick={handleCount}>
        Count {count}
      </button>
    </div>
  )
}

export default Pricing