import axios from 'axios';
import { useState, useEffect } from 'react';

const CreateSheets = (props) => {
   const [Prefix, setPrefix] = useState('คำนำหน้า')
   const [First_name, setFirst_name] = useState('')
   const [Last_name, setLast_name] = useState('')
   const [gender, setgender] = useState('')
   const [Birth_date, setBirth_date] = useState('')
   const [Telephone, setTelephone] = useState('')
   const [Email, setEmail] = useState('')
   // console.log('มีการ log บรรทัดนี้ทุกครั้ง ที่มาการ ป้อนข้อมูลลง tag input');



   function add(e) {
      e.preventDefault()
      // e.preventDefault() ไว้ป้องกัน event web refed เมื่อกด supmit จาก form
      console.log(props.data);
      console.log(Prefix, First_name, Last_name, gender, Birth_date, Telephone, Email);
      const newEmployee_id = RandomString(10)
      // loop check id ซ้ำ 
      axios.post('http://localhost:3000/user', {
         customer_id: newEmployee_id,
         fname: Prefix,
         lname: l_Name,
         age: parseInt(Age)
      })
         .then(function (response) {
            console.log(response);
            props.setcount((aaa) => aaa + 1);
         })
         .catch(function (error) {
            console.log(error);
         });
   }

   useEffect(() => {
      // console.log(Prefix);
      // กัน refet 2
   }, [])

   return (
      <div className='t-ali-cen'>
         <form onSubmit={add}>
            <div className='d-inline-gird g-2fr g-center'>
               <label>คำนำหน้า :</label>
               <select name="Prefix" onChange={(e) => setPrefix(e.target.value)} value={Prefix}>
                  <option value="0">...คำนำหน้า...</option>
                  <option value="นาย">นาย</option>
                  <option value="นาง">นาง</option>
                  <option value="นางสาว">นางสาว</option>
               </select>
               <label>ชื่อ :</label>
               <input type="text" placeholder="First name" onChange={(e) => setFirst_name(e.target.value)} value={First_name} />
               {/* ไม่จำเป็นต้องกำหนด id ใน input tag */}
               <label>สกุล : </label>
               <input type="text" placeholder="Last name" onChange={(e) => setLast_name(e.target.value)} value={Last_name} />
               <label>เพศ : </label>
               <input type="text" placeholder="Gender" onChange={(e) => setgender(e.target.value)} value={gender} />
               <label>วันเกิด : </label>
               <input type="date" placeholder="Birth date" onChange={(e) => setBirth_date(e.target.value)} value={Birth_date} />
               <label>ช่องทางติดต่อ : </label>
               <input type="text" placeholder="Telephone" onChange={(e) => setTelephone(e.target.value)} value={Telephone} />
               <label>Email : </label>
               <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={Email} />
            </div><br />
            <button type="submit">เพิ่มข้อมูล</button>
         </form>
      </div>
   );
}

export default CreateSheets
