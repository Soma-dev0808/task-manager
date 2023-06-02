import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Toast from './components/ui/Toast'
import { store } from './redux/app/configureStore'
import { routes } from './routes'
import Theme from './styles/ThemeProvider'

function App() {
  return (
    <Provider store={store}>
      <Theme>
        <Toast />
        <BrowserRouter>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} Component={route.component()} />
            ))}
          </Routes>
        </BrowserRouter>
      </Theme>
    </Provider>
  )
}

export default App
