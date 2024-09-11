declare module 'react-rating-stars-component' {
  const ReactStars: React.FC<{
    count: number;
    onChange: (newRating: number) => void;
    size?: number;
    isHalf?: boolean;
    activeColor?: string;
    value: number
    edit: boolean
  }>;

  export default ReactStars;
}
