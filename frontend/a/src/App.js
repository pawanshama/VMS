import { BrowserRouter, Route, Routes} from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/signin';
import Home from './components/home';
import Notification from './components/notification';
import Events from './components/eventList';
import Profile from './components/profile';
import OwnerStaff from './homeFolder/ownerStaff';
import StaffSignUp from './homeFolder/staffSignUp';
import LeadSignUp from './homeFolder/leadSignUp';
import EventLead from './EventCreation/eventLead';
import PageStaff from './EventCreation/pageStaff';

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
        <Route path="/dashBoard/Lead" element={<OwnerStaff name="Lead" />} />
        <Route path="/dashBoard/Lead/SignUp" element={<LeadSignUp/>} />
        <Route path="/dashBoard/Lead/SignUp/page" element={<EventLead/>} />
        <Route path="/dashBoard/Staff" element={<OwnerStaff name="Staff"/>} />
        <Route path="/dashBoard/Staff/SignUp" element={<StaffSignUp/>} />
        <Route path="/dashBoard/Staff/SignUp/page" element={<PageStaff/>} >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
