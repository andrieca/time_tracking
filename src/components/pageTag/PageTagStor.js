import { action, makeObservable, observable } from "mobx"

class PageTagStor {
    date = '';
    categoriesDay = [];

    constructor(date) {
        makeObservable(this, {
            date: observable,
            categoriesDay: observable,
            addCategoriesDay: action,
            addTimerToCategory: action,
            addCategoriesDayLocal: action
        })

        this.date = date
    }

    addCategoriesDay(day) {
        this.categoriesDay.push(day)
        console.log("categoriesDay", this.categoriesDay);
    }

    addCategoriesDayLocal(categories) {
        if (categories) {
            console.log("categTag", categories);
            const categoriesArray = Object.values(categories);
            this.categoriesDay = [...this.categoriesDay, ...categoriesArray];
            console.log("categoriesDay", this.categoriesDay);
        }
    }

    addTimerToCategory(categoryName, timeToAdd) {
        const category = this.categoriesDay.find(category => category.name === categoryName);
        if (category) {
            category.timeElapsed += timeToAdd;
        }
    }

}
const pageTagStor = new PageTagStor();
export default pageTagStor;