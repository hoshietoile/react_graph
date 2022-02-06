import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import { Error404 } from './components/pages/Error404';
import { Error500 } from './components/pages/Error500';
import { Home } from './components/pages/Home'
import { Login } from './components/pages/Login'
import { Name } from './components/pages/Name'
import { Hoge } from './components/pages/Hoge'
import { useLoginStore } from './store/loginStore';
import { useEffect } from 'react';

function App() {
  const { loginInfo, setLogin, isLoggedIn } = useLoginStore();
  console.log(loginInfo)
  // useRouteHandle...
  useEffect(() => {
    setLogin()
  }, [loginInfo])

  return (
    <div className="wrapper">
      <header></header>
      <div className="container">
        <aside>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/name">Name</Link>
            </li>
            <li>
              <Link to="/hoge">Hoge</Link>
            </li>
            <li>
              <Link to="/error404">Error404</Link>
            </li>
            <li>
              <Link to="/error500">Error500</Link>
            </li>
          </ul>
        </aside>
        <main>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
            {isLoggedIn &&
              <>
                <Route path="/name" element={<Name />} />
                <Route path="/hoge" element={<Hoge />} />
              </>
            }
            <Route path="/error404" element={<Error404 />} />
            <Route path="/error500" element={<Error500 />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
      </div>
    </div >
  )
}

export default App
