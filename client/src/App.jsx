import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import './App.css';
import Home from "./pages/Home";
import SportInfo from "./pages/SportInfo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WelcomePage from "./pages/WelcomePage";
import Account from "./pages/Account";
import FieldInfo from "./pages/FieldInfo";
import Landing from "./pages/Landing";
import Requests from "./pages/Requests";
import Management from "./pages/Management";
import { stayLoggedIn } from "./redux/players/playersSlice";
import AdminLogin from "./pages/AdminLogin";

function App() {
  const dispatch = useDispatch();
  const [selectedSport, setSelectedSport] = useState();
  // eslint-disable-next-line 
  const [selectedMeetUp, setSelectedMeetUp] = useState();
  const [selectedField, setSelectedField] = useState();
  const [individualLocation, setIndividualLocation] = useState();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api1/me`);
        if (response.ok) {
          const user = await response.json();
          dispatch(stayLoggedIn(user));
        } else {
          // Handle non-successful response here
          console.error("Failed to fetch user session data.");
        }
      } catch (error) {
        // Handle any network or other errors here
        console.error("An error occurred while fetching user session data:", error);
      }
    };
  
    fetchData();
  }, [dispatch]);

  // All of the web routes
  const router = createBrowserRouter([
    {
      path: "*",
      element: <div>404 NOT FOUND</div>
    },
    {
      path: "/",
      element:  <Landing />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/welcome",
      element: <WelcomePage />
    },
    {
      path: "/locations/:id",
      element: <Home 
        selectedSport={selectedSport}
        setSelectedSport={setSelectedSport}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        individualLocation={individualLocation}
        setIndividualLocation={setIndividualLocation}
      />
    },
    {
      path: '/profile',
      element: <Account />
    },
    {
      path: `/sports/:id`,
      element: <SportInfo 
        selectedSport={selectedSport}
        setSelectedSport={setSelectedSport}
        setSelectedMeetUp={setSelectedMeetUp}
        individualLocation={individualLocation}
      />
    },
    {
      path: '/fields/:id',
      element: <FieldInfo 
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        individualLocation={individualLocation}
      />
    },
    {
      path: '/requests',
      element: <Requests />
    },
    {
      path: '/admin_login',
      element: <AdminLogin />
    },
    {
      path: '/management',
      element: <Management />
    }
  ])
  return (
    <div>
      <div>
        <title>Pick n' Play</title>
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
