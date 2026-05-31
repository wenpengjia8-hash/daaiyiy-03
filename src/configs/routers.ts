import HOME from '../pages/home.jsx';
import APPOINTMENT from '../pages/appointment.jsx';
import GYNECOLOGICAL from '../pages/gynecological.jsx';
import SUBMITAPPOINTMENT from '../pages/submitAppointment.jsx';
import ABOUT from '../pages/about.jsx';
import ROUTE from '../pages/route.jsx';
import DOCTOR from '../pages/doctor.jsx';
import PROFILE from '../pages/profile.jsx';
import ADMIN from '../pages/admin.jsx';
import ADMINLOGIN from '../pages/adminLogin.jsx';
export const routers = [{
  id: "home",
  component: HOME
}, {
  id: "appointment",
  component: APPOINTMENT
}, {
  id: "gynecological",
  component: GYNECOLOGICAL
}, {
  id: "submitAppointment",
  component: SUBMITAPPOINTMENT
}, {
  id: "about",
  component: ABOUT
}, {
  id: "route",
  component: ROUTE
}, {
  id: "doctor",
  component: DOCTOR
}, {
  id: "profile",
  component: PROFILE
}, {
  id: "admin",
  component: ADMIN
}, {
  id: "adminLogin",
  component: ADMINLOGIN
}]