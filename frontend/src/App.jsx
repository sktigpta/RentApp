import './App.css'
import { BrowserRouter } from "react-router-dom"
import { PageRoutes } from './components/PageRoutes'

function App() {

  return (
    <>
      <BrowserRouter>
        <main>
          <PageRoutes />
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
