
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import CategoryView from '../category/CategoryView';
import pageAllDaysStor from '../pageAllDays/PageAllDaysStor';
import addCategoriesStor from './AddCategoriesStor';
import "./addCategories.scss";
import pageTagStor from '../pageTag/PageTagStor';




const AddCategoriesView = observer(() => {
  const [currentDate, setCurrentDate] = useState('');


  const handleAddCategory = () => {
    const categoryName = prompt('Enter category name:');

    if (categoryName) {
      addCategoriesStor.addCategory(categoryName, currentDate);
    }

  };

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    pageAllDaysStor.addDays(currentDate);

    const days = pageAllDaysStor.days;
    const newDays = JSON.stringify(days);
    localStorage.setItem("newDays", newDays)

    setCurrentDate(currentDate);
  }, []);

  const handleStopDay = () => {
    // const stop = addCategoriesStor.categories;
    const stop = pageTagStor.categoriesDay;
    const stopNew = JSON.stringify(stop);
    localStorage.setItem("allCategoriesDay", stopNew)
  }

  return (
    <div className='add-categories'>
      <div className='add-categories-box'>
        <p className='add-categories-date'>{currentDate}</p>
        <button className='add-categories-btn' onClick={handleAddCategory}>Add Category</button>
      </div>
      {addCategoriesStor.categories.map(category => (
        <CategoryView key={category.name} category={category} />
      ))}
      <p className='add-categories-p'>Total Time: {addCategoriesStor.totalTime}</p>

      <button className='add-categories-btn' onClick={handleStopDay}>stop</button>
    </div>
  );
});

export default AddCategoriesView;