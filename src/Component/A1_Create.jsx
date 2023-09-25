import axios from 'axios';
import { useState, useEffect } from 'react';
import { TelephoneFormat, filterSymbols, RandomId, convertDate } from '../Function/PackFunction';




const CreateSheets = (props) => {
   // use in 'app.jsx'
   const [Prefix, setPrefix] = useState('0')
   const [Rank, setRank] = useState('0')
   const [First_name, setFirst_name] = useState('')
   const [Last_name, setLast_name] = useState('')
   const [gender, setgender] = useState('')
   const [Birth_date, setBirth_date] = useState('')
   const [Telephone, setTelephone] = useState('')
   const [Email, setEmail] = useState('')
   const updateTable = () => { props.addsomenew(); };
   // console.log('มีการ log บรรทัดนี้ทุกครั้ง ที่มาการ ป้อนข้อมูลลง tag input');

   async function add(e) {
      e.preventDefault() // e.preventDefault() ไว้ป้องกัน event web refed เมื่อกด supmit จาก form      
      const response = await axios.get('https://api.sheety.co/4ca9ed09b8eddce654c9316dcee071de--/addData/sheets1');
      // console.log(response.data.sheets1);
      let emp_Id = []
      for (const emp of response.data.sheets1) { emp_Id.push(emp.employeeId); }
      // console.log(emp_Id);
      const newPrefix = Prefix === "1" ? 'นาย' : Prefix === "2" || Prefix === "3" ? 'นาง' : 'ไม่ระบุ';
      const newRank_id = Rank === "1" ? 'ABC' : Rank === "2" ? 'D45' : Rank === "3" ? 'XYZ' : Rank === "4" ? 'PYE' : '000';
      const newRank = Rank === "1" ? 'ระดับ 1 ABC' : Rank === "2" ? 'ระดับ 2 D45' : Rank === "3" ? 'ระดับ 3 XYZ' : '000';
      const newgender = gender === "1" ? 'ชาย' : gender === "2" ? 'หญิง' : 'ไม่ระบุ';
      const nowBirth_date = convertDate(new Date(Birth_date).toLocaleDateString('th-TH'))
      // console.log(nowBirth_date);
      const today = new Date().toLocaleDateString('th-TH')
      // console.log(`${newRank_id}-${newEmployee_id}`, newPrefix, First_name, Last_name, newgender);
      // console.log(nowBirth_date, Telephone, Email);
      let newEmployee_id = `${newRank_id}-${RandomId(8)}`
      if (emp_Id.includes(newEmployee_id)) {
         // console.log('มี id ซ้ำ');
         newEmployee_id = RandomId(8)
      }
      // loop check id ซ้ำ
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
            addTimeStamp: `${convertDate(today)} ${new Date().toLocaleTimeString().substring(0, 5)}`
         }
      };
      axios.post('https://api.sheety.co/4ca9ed09b8eddce654c9316dcee071de/addData/sheets1', newData)
         .then(() => {
            console.log('%c..', 'background: green; color: green;', 'Create ok and complete');
            updateTable()
            alert("add personal successful");
            setPrefix('0');
            setRank('0');
            setFirst_name('');
            setLast_name('');
            setBirth_date('');
            setTelephone('');
            setEmail('')
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
               <option value="1">ABC</option>
               <option value="2">D45</option>
               <option value="3">XYZ</option>
               <option value="4">PYE</option>
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
            <label className='dateFormat' ><span >วันเกิด :</span><span>วว / ดด / ค.ศ</span></label>
            <input
               type="date"
               placeholder="วว / ดด / ค.ศ"
               max={new Date().toISOString().split("T")[0]}
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
                     console.log('%c..', 'background: orange; color: orange;', 'Reset form');
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
   );
}

export default CreateSheets