import React from 'react';
import { observer } from 'mobx-react';
import "./category.scss";


const CategoryView = observer(({ category }) => {
  const handleToggleTimer = () => {
    if (category.running) {
      category.pauseTimer();
    } else {
      category.startTimer();
    }
  };

  return (
    <div className='c'>
      <div className='category row'>
        <p className='category-name col'>{category.name}</p>
        <p className='category-p col-2'>{category.formattedTime}</p>
        <button className='category-btn col-2' onClick={handleToggleTimer}>{category.running ? 'Pause' : 'Start'}</button>
      </div>
    </div>
 
  );
});
export default CategoryView;
