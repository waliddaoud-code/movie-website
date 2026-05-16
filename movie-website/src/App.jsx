
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import NavBar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { WatchMovie } from './pages/WatchMovie'

import './css/App.css'





function App() {

  
   
  







    return (
    <div className="app"> 
        <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watch/:id" element={<WatchMovie />} />

        </Routes>
      </main>
    </div>
  )
}

export default App
