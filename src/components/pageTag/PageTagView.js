import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import CategoryView from '../category/CategoryView';
import addCategoriesStor from '../addCategories/AddCategoriesStor';
import { useParams } from 'react-router-dom';
import pageTagStor from './PageTagStor';
import "./pageTage.scss";
import Category from '../category/CategoryStor';


const PageTagView = observer((props) => {
  const { date } = useParams();


  useEffect(() => {
    const allCategoriesData = localStorage.getItem("allCategoriesDay");
    const allCategories = JSON.parse(allCategoriesData);
    pageTagStor.addCategoriesDayLocal(allCategories);
    localStorage.removeItem("allCategoriesDay");
  }, []);

  useEffect(() => {
    addCategoriesStor.categories.forEach((day) => {
      if (day.date === date) {
        console.log("Day", day);
        pageTagStor.addCategoriesDay(day)
      }
    })
  }, [date]);


  const handleAddTime = (categoryName) => {

    const timeToAdd = parseInt(prompt('Enter time to add (in minutes):'));
    if (!isNaN(timeToAdd)) {
      const secondsToAdd = timeToAdd * 60;
      pageTagStor.addTimerToCategory(categoryName, secondsToAdd);
    }
  };

  const handleStopDay = () => {
    const stop = pageTagStor.categoriesDay;
    const stopNew = JSON.stringify(stop);
    localStorage.setItem("allCategoriesDay", stopNew)
  }

  return (
    <div >
      {pageTagStor.categoriesDay.map((item) => (
        <div key={item.name} className='category-tag row'>
          <p className='category-name-tag col'>{item.name}</p>
          <p className='category-p-tag col-2'>{item.formattedTime}</p>
          <button className='category-btn-tag col-2' onClick={() => handleAddTime(item.name)}>Add Time</button>
        </div>
      ))}
      <div>
        <button className='categories-btn-stop' onClick={handleStopDay}>Save data</button>
      </div>

    </div>
  )
})

export default PageTagView;