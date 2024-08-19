import { TaskProvider } from './src/providers/tasks';
import Home from './src/home';

export default function App() {
  return (
    <TaskProvider>
      <Home />
    </TaskProvider>
  )
}

 