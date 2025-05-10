import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { creating,user2staff, staff2user, new_events, delete_event, userSpecificEvent  } from "../controllers/event_create.controller.js"

const app = express.Router();
//This is creation of an event 
app.post('/post',protectRoute,creating);

//fetch created events
app.post('/fetches/now',protectRoute,userSpecificEvent);

//this is admin making users staff like himself
app.post('/authenticate-user',protectRoute,user2staff)

//convert staff to user by self account;
app.post('/downgrade',protectRoute,staff2user)

//this is for users and staffs fetching events.
app.get('/fetch',protectRoute,new_events)

//this is for staff deleting event.
app.delete('/delete/:id',protectRoute,delete_event)

export default app
