import { Routes, Route } from 'react-router-dom';
import FormPage from './FormPage';
import SubmittedData from './SubmittedData';

function App(){
  return (
    <Routes>
      <Route path="/" element={<FormPage/>}/>
      <Route path="/submitted" element={<SubmittedData/>}/>
    </Routes>
  );
}
export default App;