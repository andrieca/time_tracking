import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const PageAllDaysStor = () => {
  const { date } = useParams();
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const fetchTotalTime = async () => {
      try {
        const q = query(collection(db, 'categoryBase'), where('createdAt', '==', date));
        const querySnapshot = await getDocs(q);
        let total = 0;
        querySnapshot.forEach((doc) => {
          const categoryData = doc.data();
          total += categoryData.timeElapsed;
        });
        setTotalTime(total);
      } catch (error) {
        console.error('Error fetching categories by date:', error);
      }
    };

    fetchTotalTime();
  }, [date]);

  return (
    <div>
      <h1>Categories for {date}</h1>
      <p>Total time: {totalTime}</p>
      {/* Додатковий код для відображення категорій за певну дату */}
    </div>
  );
};

export default PageAllDaysStor;
