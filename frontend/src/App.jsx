import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect } from 'react';


function App() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user);
  useEffect(() => {

    if (!user.username) {
      navigate('/signin');
    }

  }, []);


  return (
   <>
      <Outlet/>
   </>
  );
}

export default App;
