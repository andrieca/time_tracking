
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import "./pageAllDays.scss"


const PageAllDaysView = () => {
    const [datesWithTotalTime, setDatesWithTotalTime] = useState([]);

    useEffect(() => {
      const fetchDatesWithTotalTime = async () => {
        try {
          const q = query(collection(db, 'categoryBase'));
          const querySnapshot = await getDocs(q);
          const datesMap = new Map();
  
          querySnapshot.forEach((doc) => {
            const categoryData = doc.data();
            const createdAt = categoryData.createdAt;
            const timeElapsed = categoryData.timeElapsed;
            
            if (datesMap.has(createdAt)) {
              datesMap.set(createdAt, datesMap.get(createdAt) + timeElapsed);
            } else {
              datesMap.set(createdAt, timeElapsed);
            }
          });
  
          setDatesWithTotalTime(Array.from(datesMap));
        } catch (error) {
          console.error('Error fetching dates with total time:', error);
        }
      };
  
      fetchDatesWithTotalTime();
    }, []);
  
    const formatTime = (totalSeconds) => {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      return `${hours}:${minutes.toString().padStart(2, '0')}`;
    };
  
    return (
      <div className='page-all'>
        <h1>Date List</h1>
        {datesWithTotalTime.map(([date, totalTime]) => (
          <div key={date}>
            <Link to={`/${date}`}>{date}</Link>
            <span>Total Time: {formatTime(totalTime)}</span>
          </div>
        ))}
      </div>
    );
  };
  
export default PageAllDaysView;