import DateAndTime from './Component/DateAndTime';
import CreateSheets from './Component/A1_Create';
import ReadSheets from './Component/A2_Read';
import { useEffect, useState } from 'react';

function App() {
   const [pageState, setpageState] = useState('A1 connect table')
   const [countchage, setcountchage] = useState(0)
   
   useEffect(() => {
      console.log(pageState);
      // console.log(countchage);
   }, [countchage])
   
   const refreshTable = () =>{
      setcountchage(prevValue => prevValue === 0 ? 1 : 0)
      setpageState('A1 refresh table')
   }

   return (
      <>
         <header className='header'>
            <h1>Vite + React, axios</h1>
            <h2>Create, Read, Update, Delete</h2>
            <hr />
         </header>
         <section className='local-Timer'>
            <DateAndTime />
         </section>
         <section className='create-form'>
            <CreateSheets/>
         </section>
         <section className='read-table'>
            <button className='f-buttom' onClick={refreshTable}>Refresh</button>
            <ReadSheets key={countchage} />
         </section>
      </>
   )
}

export default App

