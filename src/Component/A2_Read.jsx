import { useEffect, useState } from 'react'
import axios from 'axios';
import { CalculateAge } from '../Function/PackFunction';
import DeleteSheet from './A3_Delete';
import UpdateSheet from './A4_Update.jsx';
import { fakedata_1, fakedata_2 } from '../Function/fackdata';

function ReadSheets(props) {
   // use in 'app.jsx'
   const [displaydata, setdisplaydata] = useState([]);// set type array
   const [StatusCode, setStatusCode] = useState(<>On Load.....</>);
   const [editForm, seteditForm] = useState(<></>);

   const sheetsfetch = async () => {
      const sheetsURL = 'https://api.sheety.co/4ca9ed09b8eddce654c9316dcee071de--/addData/sheets1';
      await axios.get(sheetsURL)
         .then(response => {
            // console.log(response);
            console.log('%c..', 'background: green; color: green;', 'fatch ok and complete');
            setStatusCode(<>Status Code: {response.status}</>)
            console.log()
            const resdata = response.data.sheets1
            setdisplaydata(resdata?.map((val,i) => (
               //loop map จำเป็นต้องมี key
               <tr key={val.i} className="sheets-data-format">
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
                  <td>{CalculateAge(val.thaiBirthDate)}</td>
                  <td>{val.telephone}</td>
                  <td>{val.email}</td>
                  <td>{val.addTimeStamp}</td>
                  <td>
                     <div className="EditDelSheet">
                        <input type="button" value={"Update"} onClick={() => seteditForm(<UpdateSheet key={i} id={val.id} data={val}/>)} />
                        <input type="button" value={"Delete"} onClick={() => DeleteSheet(val.id)} />
                     </div>
                  </td>
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
      <>
      <div className="UpdateForm" >{editForm}</div>      
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
                  <th>action</th>
               </tr>
            </thead>
            <tbody>
               <tr><td colSpan={10}><p className='css-fix t-ali-cen'>{StatusCode}</p></td></tr>
               <tr className="sheets-data-format">
                  <td>Test-ABC-E0Q998FA</td><td>ระดับ 1 ABC</td>
                  <td><p className="fullname"><span>นาย</span><span>ธาวัน</span><span>นันทพินิจ</span></p></td>
                  <td>ชาย</td><td>15/07/2540</td><td>26 ปี</td><td>090-095-1255</td><td>Waaaa123456@hhhhhhh.com</td>
                  <td>12 ก.ย 2566 15:34</td>
                  <td>
                     <div className="EditDelSheet">
                        <input type="button" value={"Update"} onClick={() => seteditForm(<UpdateSheet key={'E0Q998FA'} id={'E0Q998FA'} data={fakedata_1} />)} />
                        <input type="button" value={"Delete"} onClick={() => DeleteSheet('Test-ABC-E0Q998FA')} />
                     </div>
                  </td>
               </tr>
               <tr className="sheets-data-format">
                  <td>Test-D45-QJC7F61H</td><td>ระดับ 2 D45</td>
                  <td><p className="fullname"><span>นาง</span><span>ณิชา</span><span>วัฒนศักดิ์สกุล</span></p>
                  </td><td>หญิง</td><td>20/05/2539</td><td>27 ปี</td><td>084-555-4444</td><td>nizcha478@hGGG.com</td>
                  <td>13 ก.ย 2566 15:48</td>
                  <td>
                     <div className="EditDelSheet">
                        <input type="button" value={"Update"} onClick={() => seteditForm(<UpdateSheet key={'QJC7F61H'} id={'QJC7F61H'} data={fakedata_2} />)} />
                        <input type="button" value={"Delete"} onClick={() => DeleteSheet('Test-D45-QJC7F61H')} />
                     </div>
                  </td>
               </tr>
               {displaydata}
            </tbody>
         </table>
      </>
   )
}

export default ReadSheets