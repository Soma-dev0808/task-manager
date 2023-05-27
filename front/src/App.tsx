import { Provider } from 'react-redux'
import { TaskBoard } from './components/pages'
import Toast from './components/ui/Toast'
import { store } from './redux/app/configureStore'
import Theme from './styles/ThemeProvider'

function App() {
  return (
    <Provider store={store}>
      <Theme>
        <Toast />
        <TaskBoard />
      </Theme>
    </Provider>
  )
}

export default App
