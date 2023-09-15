import { useEffect, useState } from 'react'
import { convertDate } from '../Function/PackFunction';

const DateAndTime = () => {
   const day = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
   const [time_now, settime_now] = useState(new Date().toLocaleTimeString('th-TH'))
   useEffect(() => {
      const time_interval = setInterval(() => { settime_now((time_now) => time_now = new Date().toLocaleTimeString('th-TH')) }, 1000);
      return () => clearInterval(time_interval);
   }, []);
   return (
      <section className='local-Timer'>
         <div>
            <h3>วันนี้ :</h3>&#32;<p>วัน{day[new Date().getDay()]} {convertDate(new Date().toLocaleDateString('th-TH'))}</p>
         </div>
         <div>
            <h3>เวลา :</h3>&#32;<p>{time_now}</p>
         </div>
      </section>
   )
}

export default DateAndTime