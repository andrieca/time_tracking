import {BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "../scss/app.scss";
import PageAllDaysView from "../components/pageAllDays/PageAllDaysView";
import AddCategoriesView from "../components/addCategories/AddCategoriesView";
import PageTagView from "./pageTag/PageTagView";
import NaviM from "./nav/Nav";


function App() {
  return (

    <BrowserRouter>
     
        <NaviM />
        <Routes>
          <Route path="/category" element = {<AddCategoriesView/>}/>
          <Route path="/all_days" element = {<PageAllDaysView/>}/>
          <Route path="/day/:date" element={<PageTagView />} />
        </Routes>
   

    </BrowserRouter>

  );
}

export default App;


