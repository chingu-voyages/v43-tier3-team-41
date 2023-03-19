import React from 'react';

const ReviewsCard = (props) => {
  const { title, body, author, imageUrl } = props;
  return (
    <div className='relative'>
      <div className='card p-4'>
        <p className='text-lg font-semibold mb-2'>{title}</p>
        <p className='text-sm mb-4'>{body}</p>
        <div className='flex items-center'>
          <img
            className='w-8 h-8 rounded-full mr-2'
            src={imageUrl}
            alt={author}
          />
          <p className='text-sm font-medium'>{author}</p>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 w-full h-2 bg-primary'></div>
    </div>
  );
};

export default ReviewsCard;
