import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Container, Grid } from '@mui/material';

const PageTagView = () => {
  // const { date } = useParams();
  const location = useLocation();
  const date = location.pathname.split('/').pop(); 
  console.log("date", date)
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoriesByDate = async () => {
      try {
        const q = query(collection(db, 'categoryBase'), where('createdAt', '==', date));
        const querySnapshot = await getDocs(q);
        const categoriesData = [];

        querySnapshot.forEach((doc) => {
          categoriesData.push({ id: doc.id, ...doc.data() });
        });

        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories by date:', error);
      }
    };

    fetchCategoriesByDate();
  }, [date]);


  
  const handleAddTime = async (text) => { 
    const categoryTime = prompt('Enter time in format "hours.minutes":');
    
    if (categoryTime) {
      const [hours, minutes] = categoryTime.split('.').map(Number);
      const q = query(collection(db, 'categoryBase'), where('text', '==', text)); 
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach(async (doc) => {
        const categoryData = doc.data();
        const newTimeElapsed = categoryData.timeElapsed + (hours * 3600) + (minutes * 60);
        await updateDoc(doc.ref, { timeElapsed: newTimeElapsed });
      });
    }
  };

  const formattedTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (

<Container>
<Grid container justifyContent="center" style={{ height: '100vh', marginTop: '20px' }}>
  <div style={{ width: '80%', height: '70vh', border: '1px solid gray', overflowY: 'auto' }}>
    {categories.map(item => (
      <div className='c' key={item.id}>
        <div className='category row'>
          <p className='category-name col'>{item.text}</p>
          <p className='category-p col-2'>{formattedTime(item.timeElapsed)}</p>
          <button className='category-btn col-2' onClick={() =>{console.log('Item:', item); handleAddTime(item.text)}}>Add Time</button>
        </div>
      </div>
    ))}
  </div>

</Grid>
</Container>
  );
};

export default PageTagView;