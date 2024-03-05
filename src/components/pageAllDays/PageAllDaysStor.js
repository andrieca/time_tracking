
import { action, computed, makeObservable, observable } from "mobx";

class PageAllDaysStor{
    days = []

    constructor(){
        makeObservable(this, {
            days : observable,
            addDays : action,
        })
    }

    addDays(date){
        console.log('date', date);
        let today = this.days.find(day => day.date === date.date);
        if(!today){
            today = date;
            this.days.push(today)
            console.log("days",this.days)
        }
        console.log("days",this.days)
    }
}
const pageAllDaysStor = new PageAllDaysStor();
export default pageAllDaysStor;