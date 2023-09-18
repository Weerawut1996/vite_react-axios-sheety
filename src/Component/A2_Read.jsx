import { useEffect, useState } from 'react'
import axios from 'axios';
import { CalculateAge } from '../Function/PackFunction';
import UpdateDeleteSheet from './A3_UpdateDelete';

function ReadSheets() {
   // use in 'app.jsx'
   const [displaydata, setdisplaydata] = useState([]);// set type array
   const [StatusCode, setStatusCode] = useState(<>On Load.....</>);
   const sheetsfetch = async () => {
      const sheetsURL = 'https://api.sheety.co/4ca9ed09b8eddce654c9316dcee071de--/addData/sheets1';
      await axios.get(sheetsURL)
         .then(response => {
            // console.log(response);
            console.log('%c...','background: green; color: green;','fatch ok and complete');
            setStatusCode(<>Status Code: {response.status}</>)
            console.log()
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
                  <td>{CalculateAge(val.thaiBirthDate) < 0 ? '???' : CalculateAge(val.thaiBirthDate)}</td>
                  <td>{val.telephone}</td>
                  <td>{val.email}</td>
                  <td>{val.addTimeStamp}</td>
                  <td> <UpdateDeleteSheet/></td>
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
               if (error.response.status == 402) {
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
   }, [])
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
            <tr className="sheets-data-format"><td>ABC-E0Q998FA</td><td>ระดับ 1 ABC</td><td><p className="fullname"><span>นาย</span><span>ธาวัน</span><span>นันทพินิจ</span></p></td><td>ชาย</td><td>15/07/2540</td><td>26 ปี</td><td>090-095-1255</td><td>Waaaa123456@hhhhhhh.com</td><td>12 ก.ย 2566 15:34</td><td><UpdateDeleteSheet id={'a1'}/></td></tr>
            <tr className="sheets-data-format"><td>D45-QJC7F61H</td><td>ระดับ 2 D45</td><td><p className="fullname"><span>นาง</span><span>ณิชา</span><span>วัฒนศักดิ์สกุล</span></p></td><td>หญิง</td><td>20/05/2539</td><td>27 ปี</td><td>084-555-4444</td><td>nizcha478@hGGG.com</td><td>13 ก.ย 2566 15:48</td><td><UpdateDeleteSheet id={'a2'}/></td></tr>
            {displaydata}
         </tbody>
      </table>
   )
}

export default ReadSheets