import axios from 'axios';
import { useState, useEffect } from 'react';
import { TelephoneFormat, filterSymbols, RandomId, convertDate, reformatInputDate } from '../Function/PackFunction';




const CreateSheets = (props) => {
   const [Prefix, setPrefix] = useState('0')
   const [Rank, setRank] = useState('0')
   const [First_name, setFirst_name] = useState('')
   const [Last_name, setLast_name] = useState('')
   const [gender, setgender] = useState('')
   const [Birth_date, setBirth_date] = useState('')
   const [Telephone, setTelephone] = useState('')
   const [Email, setEmail] = useState('')
   // console.log('มีการ log บรรทัดนี้ทุกครั้ง ที่มาการ ป้อนข้อมูลลง tag input');

   const updateTable = () => {      
      props.addsomenew();
    };


   function add(e) {
      e.preventDefault() // e.preventDefault() ไว้ป้องกัน event web refed เมื่อกด supmit จาก form      
      const newEmployee_id = RandomId(8)
      // loop check id ซ้ำ
      const newPrefix = Prefix === "1" ? 'นาย' : Prefix === "2" || Prefix === "3" ? 'นาง' : 'ไม่ระบุ';      
      const newRank_id = Rank === "1" ? 'ABC' : Rank === "2" ? 'D45' : Rank === "3" ? 'XYZ' : '---';
      const newRank = Rank === "1" ? 'ระดับ 1 ABC' : Rank === "2" ? 'ระดับ 2 D45' : Rank === "3" ? 'ระดับ 3 XYZ' : '---';
      const newgender = gender === "1" ? 'ชาย' : Rank === "2" ? 'หญิง' : 'ไม่ระบุ';
      const nowtime = `${convertDate(new Date().toLocaleDateString())} ${new Date().toLocaleTimeString().substring(0, 5)}`
      const nowBirth_date = reformatInputDate(Birth_date)
      // console.log(`${newRank_id}-${newEmployee_id}`, newPrefix, First_name, Last_name, newgender, nowBirth_date, Telephone, Email, nowtime);
      const newData = {
         sheets1: {
            employeeId: `${newRank_id}-${newEmployee_id}`,
            rank: newRank,
            prefix: newPrefix,
            firstName: First_name,
            lastName: Last_name,
            physicalGender: newgender,
            thaiBirthDate: nowBirth_date,
            telephone: Telephone,
            email: Email,
            addTimeStamp: nowtime,
         }
       };
      
      axios.post('https://api.sheety.co/4ca9ed09b8eddce654c9316dcee071de/addData/sheets1', newData)
         .then(function (response) {
            console.log(response);
            updateTable()
         })
         .catch(function (error) {
            console.log(error);
         });
   }

   useEffect(() => {
      Prefix === "1" ? setgender('1')
         : Prefix === "2" || Prefix === "3" ? setgender('2')
            : setgender('0');
   }, [Prefix])

   return (
      <>
         <section className='create-form t-ali-cen'>
            <form onSubmit={add} className='add-form'>
               <label>คำนำหน้า :</label>
               <select name="Prefix" onChange={(e) => setPrefix(e.target.value)} value={Prefix}>
                  <option value="0">...คำนำหน้า...</option>
                  <option value="1">นาย</option>
                  <option value="2">นาง</option>
                  <option value="3">นางสาว</option>
               </select>
               <label>ตำแหน่ง :</label>
               <select name="NewRank" onChange={(e) => setRank(e.target.value)} value={Rank}>
                  <option value="0">...ตำแหน่ง...</option>
                  <option value="1">ตำแหน่ง ABC</option>
                  <option value="2">ตำแหน่ง D45</option>
                  <option value="3">ตำแหน่ง XYZ</option>
               </select>
               <label>ชื่อ :</label>
               <input
                  type="search"
                  placeholder="First name"
                  value={First_name} required
                  onChange={(e) => setFirst_name(filterSymbols('name', e.target.value))} />
               {/* ใช้ useState จึงไม่จำเป็นต้องกำหนด id ใน input tag */}
               <label>นามสกุล : </label>
               <input
                  type="search"
                  placeholder="Last name"
                  value={Last_name} required
                  onChange={(e) => setLast_name(filterSymbols('name', e.target.value))} />
               <label>เพศ : </label>
               <select name="Gender" onChange={(e) => setgender(e.target.value)} value={gender} required>
                  <option value="0">...ระบุเพศ...</option>
                  <option value="1">ชาย</option>
                  <option value="2">หญิง</option>
               </select>
               <label>วันเกิด : </label>
               <input
                  type="date"
                  placeholder="วว / ดด / ค.ศ"
                  value={Birth_date} required
                  onChange={(e) => setBirth_date(e.target.value)} />
               <label>เบอร์โทรศัพท์ : </label>
               <input
                  type="search"
                  placeholder="Telephone"
                  maxLength="16" size="16"
                  value={Telephone} required
                  onChange={(e) => setTelephone(TelephoneFormat(e.target.value))} />
               <label>Email : </label>
               <input
                  type="email"
                  placeholder="Email"
                  value={Email} required
                  onChange={(e) => setEmail(filterSymbols('email', e.target.value))} />
               <br />
               <div className="rebuttom ">
                  <input type="reset" value="Reset"
                     onClick={() => {
                        console.log('reset');
                        setPrefix('0');
                        setRank('0');
                        setFirst_name('');
                        setLast_name('');
                        setBirth_date('');
                        setTelephone('');
                        setEmail('')
                     }} />
                  <input type="submit" value="เพิ่มข้อมูล" />
               </div>
            </form>

         </section>

      </>
   );
}

export default CreateSheets