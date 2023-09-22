import './App.css';
import { SignIn, SignUp, MainMenu } from './containers';
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn/>}></Route> 
      <Route path='/SignUp' element={<SignUp/>}></Route> 
      <Route path='/MainMenu' element={<MainMenu/>}></Route> 
    </Routes>
    </BrowserRouter>
  );
}

export default App;