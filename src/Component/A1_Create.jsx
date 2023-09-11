import axios from 'axios';
import { useState, useEffect } from 'react';
import { TelephoneFormat } from '../Function/PackFunction';

const CreateSheets = (props) => {
   const [Prefix, setPrefix] = useState('0')
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
      if (Prefix == "นาย") {
         setgender("ชาย")
      }
      else if (Prefix == "นาง" || Prefix == "นางสาว") {
         setgender("หญิง")
      }
      else { setgender("ไม่ระบุ") }
   }, [Prefix])


   return (
      <section className='create-form t-ali-cen'>
         <form onSubmit={add}>
            <div className='add-form'>
               <label>คำนำหน้า :</label>
               <select name="Prefix" onChange={(e) => setPrefix(e.target.value)} value={Prefix}>
                  <option value="ไม่ระบุ">...คำนำหน้า...</option>
                  <option value="นาย">นาย</option>
                  <option value="นาง">นาง</option>
                  <option value="นางสาว">นางสาว</option>
               </select>
               <label>ชื่อ :</label>
               <input type="search" placeholder="First name" onChange={(e) => setFirst_name(e.target.value)} value={First_name} required />
               {/* ไม่จำเป็นต้องกำหนด id ใน input tag */}
               <label>นามสกุล : </label>
               <input type="search" placeholder="Last name" onChange={(e) => setLast_name(e.target.value)} value={Last_name} required />
               <label>เพศ : </label>
               <select name="Gender" onChange={(e) => setgender(e.target.value)} value={gender} required>
                  <option value="ไม่ระบุ">...ระบุเพศ...</option>
                  <option value="ชาย">ชาย</option>
                  <option value="หญิง">หญิง</option>
               </select>
               <label>วันเกิด : </label>
               <input type="date" placeholder="Birth date" onChange={(e) => setBirth_date(e.target.value)} value={Birth_date} required />
               <label>เบอร์โทรศัพท์ : </label>
               <input type="search" placeholder="Telephone" maxLength="12" size="12" value={Telephone} required
                  onChange={(e) => setTelephone(TelephoneFormat(e.target.value))} />
               <label>Email : </label>
               <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={Email} required />
            </div><br />
            <input type="reset" value="Reset"
               onClick={() => { setFirst_name(''); setLast_name(''); setBirth_date(''); setTelephone(''); setEmail('') }} />
            <input type="submit" value="เพิ่มข้อมูล" />
         </form>
      </section>
   );
}

export default CreateSheets
