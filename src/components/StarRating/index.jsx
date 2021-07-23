import React, { useState } from 'react';
// import { AiFillStar } from 'react-icons/ai';
import StarContainer from './styles';
import { FaStar } from 'react-icons/fa';

function StarRating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
		<StarContainer>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
					<label htmlFor=''>
						<input
							type='radio'
							name='rating'
							value={ratingValue}
              />
						<FaStar
							onClick={() => setRating(ratingValue)}
							className={star}
							color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
							size={20}
							onMouseEnter={() => setHover(ratingValue)}
							onMouseLeave={() => setHover(null)}
						/>
					</label>
				);
      })}
		</StarContainer>
	);
}

export default StarRating;
