import React, { useCallback, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { errorMessage } from '../../utils/helper';
import { toast } from 'sonner';
import { AppConfig } from '../../config/app.config';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  count: number
  edit?: boolean
  productId?: string
}
const StarRating = ({ count, edit = false, productId }: Props) => {
  const [rating, setRating] = useState<number>(count);
  const { userId } = useAuth()

  const handleRatingChange = useCallback(async (newRating: number) => {
    try {
      if (userId !== undefined && productId) {
        await axios.put(`${AppConfig.API_URL}/rate/${userId}`, {
          rating: newRating,
          productId: productId
        })
        setRating(newRating)
        toast.success("Rated successfully")
      } else {
        toast.error("Please login to continue")
      }
    } catch (error) {
      toast.error(errorMessage(error))
    }
    setRating(newRating);
  }, [productId, userId])

  return (
    <div>
      <ReactStars
        edit={edit}
        value={rating}
        count={5}
        onChange={handleRatingChange}
        size={24}
        isHalf={false}  // Allows half stars
        activeColor="#ffd700"
      />
    </div>
  );
};

export default StarRating;
