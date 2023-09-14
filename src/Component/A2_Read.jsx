import { useEffect, useState } from 'react'
import axios from 'axios';

function ReadSheets() {
   const [displaydata, setdisplaydata] = useState([]);// set type array
   const [StatusCode, setStatusCode] = useState(<>On Load.....</>);
   const [chageCount, setchageCount] = useState(0);

   const sheetsfetch = async () => {
      const sheetsURL = 'https://api.sheety.co/4ca9ed09b8eddce654c9316dcee071de---/addData/sheets1';
      await axios.get(sheetsURL)
         .then(response => {
            // console.log(response);
            setStatusCode(<>Status Code: {response.status}</>)
            console.log(response.data)
            const resdata = response.data.sheets1
            setdisplaydata(resdata?.map((val, i) => (
               //loop map จำเป็นต้องมี key
               <tr key={i} className="sheets-data-format">
                  <td>{val.employeeId}</td>
                  <td>{val.rank}</td>
                  <td >
                     <p className='fullname'>
                        <span>{val.prefix}</span>
                        <span>{val.firstName}</span>
                        <span>{val.lastName}</span>
                     </p>
                  </td>
                  <td>{val.physicalGender}</td>
                  <td>{val.thaiBirthDate}</td>
                  <td>{val.age}</td>
                  <td>{val.telephone}</td>
                  <td>{val.email}</td>
                  <td>{val.addTimeStamp}</td>
               </tr>
            )))
         })
         .catch(error => {// ดักจับและจัดการกับ errors ที่เกิดขึ้นในการ request
            // set usestate [displaydata] เป็นค่าว่าง ถ้าเกิด Error
            setdisplaydata([]);
            console.log(error);
            if (error.response) {
               const sheetyUpgrade = <a href="https://dashboard.sheety.co/upgrade" target="_blank" rel="noopener noreferrer">sheety upgrade</a>
               // มี response กลับมาแต่ status code เป็น error
               if (error.response.status == 402 || error.response.status == 500) {
                  const sheetLink = <a href={sheetyUpgrade} target='_blank'>{sheetyUpgrade}</a>
                  setStatusCode(<>Status Code: {error.response.status}<br />This Free Account Over Requests (Max 200 per/Month)<br />{sheetLink}</>);
               }
               else {
                  setStatusCode(<>Status Code: {error.response.status}</>);
                  console.log('Response Data:', error.response.data);
               }
            } else if (error.request) {
               // ไม่ได้รับ response กลับมาเลย               
               setStatusCode(<>No response received: {error.request}</>);
            } else {
               // เกิด error ในขั้นตอนอื่น ๆ ที่ไม่ใช่ request
               setStatusCode(<>Error: {error.message}</>);
            }
         })
   }
   useEffect(() => {
      sheetsfetch()
   }, [chageCount])
   return (
      <table>
         <thead>
            <tr className='table-head'>
               <th>รหัสพนักงาน</th>
               <th>ตำแหน่ง</th>
               <th>ชื่อ-นามสกุล</th>
               <th>เพศ</th>
               <th>วันเกิด</th>
               <th>อายุ</th>
               <th>เบอร์โทรศัพท์</th>
               <th>Email</th>
               <th>เพิ่มเมื่อ </th>
            </tr>
         </thead>
         <tbody>
            <tr><td colSpan={9}><p className='css-fix t-ali-cen'>{StatusCode}</p></td></tr>
            {displaydata}
         </tbody>
      </table>
   )
}

export default ReadSheets