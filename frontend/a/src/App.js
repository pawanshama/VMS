import { BrowserRouter, Route, Routes, } from 'react-router-dom';
// import Navbar from './navbar/navbar';
import SignUp from './components/SignUp';
import SignIn from './components/signin';
import Home from './components/home';
// import Home from './components/home';
import Notification from './components/notification';
import Events from './components/eventList';
import VolunteerForm from './components/volunteerForm';
import Profile from './components/profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/SignUp" element={< SignUp />} />
        <Route path="/" element={< SignIn />}/>
        <Route path="/dashBoard" element={< Home />}/>
        <Route path="/notifications" element={<Notification />} />
        <Route path="/events" element={<Events />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/volunteerForm" element={<VolunteerForm />} >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
