import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Portal from './components/Portal';
import Institute from './components/Institute';
import StudentsList from './components/StudentsList';
import AdminPanel from './components/AdminPanel';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import About from './components/About';
import Software from './components/Software';
import Class9th from './components/classes/Class9th';
import English from './components/books/class9th/English';
import Physics from './components/books/class9th/Physics';
import Computer from './components/books/class9th/Computer';
import Bscs from './components/classes/bscs/Bscs';
import Semester1 from './components/classes/bscs/semesters/Semester1';
import Semester2 from './components/classes/bscs/semesters/Semester2';
import RandomSelect from './components/classes/bscs/paperComponents/RandomSelect';
import SelefSelect from './components/classes/bscs/paperComponents/SelefSelect';
import Semester7 from './components/classes/bscs/semesters/Semester7';
import Outline7 from './components/classes/bscs/outlines/Outline7';
import PastPapers7 from './components/classes/bscs/pastpapers/PastPapers7';
import SavedPapers from './components/SavedPapers';
import NavBar from './components/NavBar';
import { data } from 'react-router-dom';

function App() {
    const [display, setDisplay] = useState(false)
    const [show, setShow] = useState(true)
    
  return (
    <>
    <Router>
      <NavBar data={data} />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/institute' exact element={<Institute />} >
        <Route path='software' element={<Software />}>
        <Route path='saved-items' element={<SavedPapers/>} />
          <Route path='class9th' element={<Class9th/>}>
          <Route path='English' element={<English/>} />
          <Route path='Physics' element={<Physics/>} />
          <Route path='Computer' element={<Computer />} />
          </Route>
          <Route path='bscs' element={<Bscs/>} >
          <Route path='semester1' element={<Semester1/>} >
          <Route path='random-select' element={<RandomSelect />} />
          <Route path='self-select' element={<SelefSelect />} />
          </Route>
          <Route path='semester2' element={<Semester2/>} >
          <Route path='random-select' element={<RandomSelect />} />
          <Route path='self-select' element={<SelefSelect />} />
          </Route>
          <Route path='semester7' element={<Semester7/>}>
          <Route path='outline7th' element={<Outline7 />} />
          <Route path='pastpapers7th' element={<PastPapers7 />}/>
          </Route>
          </Route>
        </Route>
        <Route path='user-auth' element={show ? (display ? <UserRegistration onSwitch={() => setDisplay(false)} /> : <UserLogin onSwitch={() => setDisplay(true)} />) : null} />
            <Route path='portal' element={<Portal />} >
            </Route>
        </Route>
        <Route path='/about' element={<About/>} />
          <Route path='/admin-tools' element={<AdminPanel />} >
            <Route path='students list' element={<StudentsList />} />
            <Route path=''/>
          </Route>
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
