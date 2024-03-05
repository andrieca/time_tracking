
import { observable, action, computed, makeObservable } from 'mobx';

class Category {
   name = '';
   date = '';
   timeElapsed = 0;
   running = false;
  intervalId = null;
  

  constructor(name, date) {
    makeObservable(this, {
        name : observable,
        date : observable,
        timeElapsed : observable,
        running : observable,
        startTimer : action,
        pauseTimer : action,
        resetTimer : action,
        formattedTime : computed,
    })
    this.name = name;
    this.date = date ;
  }

 
  startTimer() {
    this.running = true;
    this.intervalId = setInterval(() => {
      this.timeElapsed += 1;
    }, 1000);
  }

 
  pauseTimer() {
    this.running = false;
    clearInterval(this.intervalId);
  }


  resetTimer() {
    this.timeElapsed = 0;
  }

 
  get formattedTime() {
    const hours = Math.floor(this.timeElapsed / 3600);
    const minutes = Math.floor((this.timeElapsed % 3600) / 60);
    const seconds = this.timeElapsed % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }


  
}
export default Category; 