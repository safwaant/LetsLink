import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './LetsLinkUI/Sign-In/SignIn';
import HomePage from './LetsLinkUI/Home-Page/HomePage';
import Calendar from 'react-calendar';

function App() {
  let [dataFetched, setDataFetched] = useState(false);
  let [persons, setPersons] = useState([]);
  let [addInput, setAddInput] = useState("");
  let ax = axios.create({ baseURL: "http://localhost:3001/api/v1"});
  useEffect(() => {
   let getPersons = () => { 
     ax.get("/person/")
      .then((res) => {
      setPersons(res.data);
      console.log(res.data);
      setDataFetched(true);
      })
      .catch((error) => {
        console.log(error);
        setDataFetched(true);
      });
    };
    getPersons();
  }, []);

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <div>
    //     {dataFetched &&
    //         <div>
    //           <h2> All current members of LetsLink:</h2>
    //           <ul>
    //           {persons.map((person) => {
    //             return(<li>{person.person_name}</li>)
    //           })}
    //           </ul>
    //         </div>
    //     }
    //     </div>
    //     <div style={{verticalAlign: "middle"}}>
    //       <TextField value={addInput} 
    //                 id="outlined-basic" 
    //                 color="white" 
    //                 label="Name" 
    //                 variant="filled" 
    //                 onChange={(e) => setAddInput(e.target.value)}/>
    //       <Button variant="contained" onClick={() => alert(addInput)} size="large">Submit</Button>
    //     </div>
    //   </header>
    // </div>
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn/>}/>
          <Route exact path="/home" element={<HomePage/>}/>
          <Route exact path="/calendar" element={<Calendar/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
