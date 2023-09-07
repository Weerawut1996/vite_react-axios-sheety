import { useEffect, useState } from 'react'
import axios from 'axios';

function ReadSheets() {
   const [displaydata, setdisplaydata] = useState([]);// set type array
   const [StatusCode, setStatusCode] = useState(<></>);
   const [chageCount, setchageCount] = useState(0);

   const sheetsfetch = async () => {
      const sheetsURL = 'https://api.sheety.co/4ca9ed09b8eddce654c9316dcee071de/addData/sheets1a';
      await axios.get(sheetsURL)
         .then(response => {
            // console.log(response);
            setStatusCode(<>Status Code: {response.status}</>)
            console.log(response.data)
            const resdata = response.data.sheets1
            setdisplaydata(resdata?.map((val, ) => (
               //loop map จำเป็นต้องมี key
               <tr key={val.employeecode} className="sheets-data-format">
                  <td>{val.employeecode}</td>
                  <td className='fullname'><span>{val.prefix}</span><span>{val.fName}</span><span>{val.lName}</span></td>
                  <td>{val.absence}</td>
                  <td>{val.leave}</td>
                  <td>{val.late}</td>
               </tr>
            )))
         })
         .catch(error => {// ดักจับและจัดการกับ errors ที่เกิดขึ้นในการ request
            // set usestate [displaydata] เป็นค่าว่าง ถ้าเกิด Error
            setdisplaydata([]);
            console.log(error);
            if (error.response) {
               // มี response กลับมาแต่ status code เป็น error
               if (error.response.status == 402) {
                  const sheetLink= <a href="https://dashboard.sheety.co/upgrade" target='_blank'>https://dashboard.sheety.co/upgrade</a>
                  setStatusCode(<>Status Code: {error.response.status}<br/>มีการเรียกเก็บเงินเนื่องจาก over requests<br/>{sheetLink}</>);
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
               <th>ชื่อ-นามสกุล</th>
               <th>ขาดงาน<br />(ครั้ง)</th>
               <th>ลางาน<br />(ครั้ง)</th>
               <th>มาสาย<br />(ครั้ง)</th>
            </tr>
         </thead>
         <tbody>
            <tr><td colSpan={5}><p className='css-fix t-ali-cen'>{StatusCode}</p></td></tr>
            <tr className="sheets-data-format">
               <td>ABCDF123456</td>
               <td className='fullname'><span>นาย</span><span>ติณณภพโภคินันท์</span><span>พฤกษวรรณเกียรติ</span></td>
               <td>ฟหกฟหก</td>
               <td>asdasdd</td>
               <td>as45asd</td>
            </tr>
            <tr className="sheets-data-format">
               <td>ABCDF123456</td>
               <td className='fullname'><span>นาง</span><span>456465</span><span>BB222222</span></td>
               <td>ฟหกฟหก</td>
               <td>asdasdd</td>
               <td>as45asd</td>
            </tr>
            <tr className="sheets-data-format">
               <td>ABCDF123456</td>
               <td className='fullname'><span>นางสาว</span><span>456465asdas</span><span>CC333asss333</span></td>
               <td>ฟหกฟหก</td>
               <td>asdasdd</td>
               <td>as45asd</td>
            </tr>
            <tr className="sheets-data-format">
               <td>ABCDF123456</td>
               <td className='fullname'><span>ตา</span><span>ติณณภพโภคินันท์</span><span>DD4dsadgg44444</span></td>
               <td>ฟหกฟหก</td>
               <td>asdasdd</td>
               <td>as45asd</td>
            </tr>
            <tr className="sheets-data-format">
               <td>ABCDF123456</td>
               <td className='fullname'><span>ยาย</span><span>4564sdad65</span><span>EE5555sdasds55</span></td>
               <td>ฟหกฟหก</td>
               <td>asdasdd</td>
               <td>as45asd</td>
            </tr>
            {displaydata}
         </tbody>
      </table>
   )
}

export default ReadSheets