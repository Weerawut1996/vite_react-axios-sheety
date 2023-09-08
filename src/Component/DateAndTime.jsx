import { useEffect, useState } from 'react'

const DateAndTime = () => {
   const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
   const [time_now, settime_now] = useState(new Date().toLocaleTimeString())
   useEffect(() => {
      const time_interval = setInterval(() => { settime_now((time_now) => time_now = new Date().toLocaleTimeString()) }, 1000);
      return () => clearInterval(time_interval);
   }, []);
   return (
      <section className='local-Timer'>
         <div className=''>
            <h3>Today :</h3> <p>{day[new Date().getDay()]} {new Date().toLocaleDateString()}</p>
         </div>
         <div className=''>
            <h3>Time :</h3> <p>{time_now}</p>
         </div>
      </section>
   )
}

export default DateAndTime