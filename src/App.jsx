import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import './App.css'
import Home from './Home'
import Categories from './About'
import Favorite from './Favorite'
import Service from './Service'
import New from './New'
import Search from './Search'
import NotFound from './NotFound'
import PageId from './PageId'
import AnimeDetail from './AnimeDetail'
function App() {
return (
    <BrowserRouter>
    <Nav />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/new' element={<New/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/favorite' element={<Favorite/>}/>
      <Route path='/categories/:idG' element={<PageId/>}/>
      <Route path='/:idA' element={<AnimeDetail/>}/>
      <Route path='/popular' element={<Service/>}/> 
      <Route path='/search' element={<Search/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    <Footer />

      </BrowserRouter>
  )
}

export default App
