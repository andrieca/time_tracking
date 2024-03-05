
import React, { useEffect, useState } from 'react';
import pageAllDaysStor from '../pageAllDays/PageAllDaysStor';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import addCategoriesStor from '../addCategories/AddCategoriesStor';
import pageTagStor from '../pageTag/PageTagStor';
import "./pageAllDays.scss";


const PageAllDaysView = observer(() => {

    const handleAllDays = () => {
      const allDays = pageAllDaysStor.days;
      const allDaysNew = JSON.stringify(allDays);
      localStorage.setItem("allDaysNew",allDaysNew);
    }

    return (
    <div>
    {pageAllDaysStor.days.map(day => (
            console.log("day", day),
       <div className='page-all'>
           <Link to={`/day/${day}`} key={day} onClick={handleAllDays}>
               {day}
           </Link>
           <p className='add-categories-p'>Total Time: {addCategoriesStor.totalTime}</p>
       </div>
    ))}
</div>
    );
  });

export default PageAllDaysView;