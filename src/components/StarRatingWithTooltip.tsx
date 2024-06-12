import StarRating from './StarRating';
import { Tooltip } from 'react-tooltip';

interface StarRatingWithTooltipProps {
  rating: number;
  tooltipContent: string;
}

function StarRatingWithTooltip({ rating, tooltipContent }: StarRatingWithTooltipProps) {
  return (
    <Tooltip id={`tooltip-${rating}`} content={tooltipContent} place="top">
      <StarRating rating={rating} />
    </Tooltip>
  );
}

export default StarRatingWithTooltip;
