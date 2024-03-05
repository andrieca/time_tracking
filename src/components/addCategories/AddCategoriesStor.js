import { observable, action, computed, makeObservable } from 'mobx';
import Category from '../category/CategoryStor';


class AddCategoriesStor{
  categories = [];

  constructor(){
    makeObservable(this,{
        categories : observable,
        addCategory : action,
        totalTime : computed,
    })

  }

  addCategory(name, date) {
    const category = new Category(name, date);
    this.categories.push(category);
    console.log("category", this.categories);
  }

  get totalTime() {
    // return this.categories.reduce((total, category) => total + category.timeElapsed, 0);
    const totalSeconds = this.categories.reduce((total, category) => total + category.timeElapsed, 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours} hours ${minutes} minutes`;
  }
}

const addCategoriesStor = new AddCategoriesStor();
export default addCategoriesStor;