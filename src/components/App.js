import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "../scss/app.scss";
import PageAllDaysView from "../components/pageAllDays/PageAllDaysView";
import AddCategoriesView from "../components/addCategories/AddCategoriesView";
import PageTagView from "./pageTag/PageTagView";
import NaviM from "./nav/Nav";
import Navbar from "./nav/Navbar";
import Login from "./login/Login";
import { useContext } from "react";
import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';




function App() {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth)

  return user ? (

    <BrowserRouter>
      <Navbar user={user} />
      <NaviM />
      <Routes>
        <Route path="/categoryDay" element={<AddCategoriesView auth={auth} />} />
        <Route path="/all_days" element={<PageAllDaysView />} />
        <Route path="/:date" element={<PageTagView />} />
        {/* <Route exact path="/" component={DateListPage} /> */}
        <Route path=":date" element={PageTagView} />
      </Routes>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <Navbar user={user} />
      <NaviM />
      <Routes>
        <Route path='/loginDay' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



