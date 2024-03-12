
import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';
import "./addCategories.scss";
import "../category/category.scss"
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button, Container, Grid, TextField } from '@mui/material';
import { db } from '../firebase';
import { collection, addDoc, doc, query, getDoc, where, getDocs } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';

const getCategoryBaseData = () => {
  return collection(db, 'categoryBase');
};

const AddCategoriesView = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [categoryBaseData] = useCollectionData(getCategoryBaseData());



  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    setCurrentDate(currentDate);
  }, []);

  const addCategory = async () => {
    try {
      const docRef = await addDoc(collection(db, "categoryBase"), {
        text: value,
        displayName: user.displayName,
        createdAt: currentDate,
        timeElapsed: timeElapsed,

      });
      console.log("Документ успішно доданий до колекції 'categoryBase'", docRef.id);
    } catch (error) {
      console.error("Помилка під час додавання документа:", error);
    }

    setValue('');
  }

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
          {categoryBaseData && categoryBaseData.map(item => (
            item.createdAt === currentDate && (
              <div className='c' key={item.id}>
                <div className='category row'>
                  <p className='category-name col'>{item.text}</p>
                  <p className='category-p col-2'>{formattedTime(item.timeElapsed)}</p>
                  <button className='category-btn col-2' onClick={() => { console.log('Item:', item); handleAddTime(item.text) }}>Add Time</button>
                </div>
              </div>
            )
          ))}
        </div>
        <Grid container style={{ width: '80%' }} direction="column" alignItems="flex-end">
          <TextField
            variant="outlined"
            placeholder='Enter category'
            fullWidth
            maxRows={2}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button className='add-categories-btn' onClick={addCategory} variant="outlined" >Add Category</Button>

        </Grid>
      </Grid>
    </Container>
  );
}

export default observer(AddCategoriesView);




