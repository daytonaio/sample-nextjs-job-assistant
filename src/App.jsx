import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Landing from './components/Landing';
import Services from './components/Services';
import JobAssistance from './components/Job/JobAssistance';
import MentalSupport from './components/Mental/MentalSupport';
import LegalSupport from './components/Legal/LegalSupport';


import {
  createBrowserRouter,
  RouterProvider, Outlet
} from "react-router-dom";
import FeaturesSection from './components/Features';
import FAQ from './components/FAQ';


const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: '/services',
        element: <Services />
      },
      {
        path: '/job-assistance',
        element: <JobAssistance />
      },
      {
        path: '/mental-support',
        element: <MentalSupport />
      },
      {
        path : '/legal-support',
        element: <LegalSupport/>
      },
      {
        path : '/features',
        element: <FeaturesSection/>
      },
      {
        path : '/faq',
        element: <FAQ/>
      }
    ]
  },

]);


function App() {
  return (
    <div className="app">

        <RouterProvider router={router} />

    </div>
  );
}



export default App;
