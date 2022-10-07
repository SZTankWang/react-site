import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <Banner/>
      <QueryClientProvider client={queryClient}>
      <CourseList/>
      </QueryClientProvider>
      
    </div>
  );
}

export default App;
