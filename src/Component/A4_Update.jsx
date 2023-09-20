import { useState } from "react"

const UpdateSheet = (props) => {
   // if (props.id === 'E0Q998FA') {
   //    console.log(props.id);
   //    return;
   // }
   console.log(props.data);
   //||props.id === 'QJC7F61H'
   const [Prefix, setPrefix] = useState(props.data.prefix === 'นาย' ? '1' : props.data.prefix === 'นาง' ? '2' : props.data.prefix === 'นางสาว' ? '3' : '0')
   // const [Rank, setRank] = useState(props.data.rank)
   const [First_name, setFirst_name] = useState(props.data.firstName)
   const [Last_name, setLast_name] = useState(props.data.lastName)
   const [gender, setgender] = useState(props.data.physicalGender === 'ชาย' ? '1' : props.data.physicalGender === 'หญิง' ? '2' : '0')
   // const [Birth_date, setBirth_date] = useState('')
   // const [Telephone, setTelephone] = useState('')
   // const [Email, setEmail] = useState('')

   /*
      {
         "employeeId": "ABC-9CELSLUM",
         "rank": "ระดับ 1 ABC",
         "prefix": "นาง",
         "firstName": "ณิชา",
         "lastName": "วัฒนศักดิ์สกุล",
         "physicalGender": "หญิง",
         "thaiBirthDate": "16 มิ.ย. 2537",
         "telephone": "084-183-2542",
         "email": "nicha_2537@hotmail.com",
         "addTimeStamp": "15 ก.ย 2566 15:50",
         "id": 2
     }
   */
   async function edit(e) {
      e.preventDefault() // e.preventDefault() ไว้ป้องกัน event web refed เมื่อกด supmit จาก form      
      // const response = await axios.get('https://api.sheety.co/4ca9ed09b8eddce654c9316dcee071de/addData/sheets1');
      console.log(Prefix);
   }
   return (
      <>
         <h3>{props.id}</h3>


         <section className='create-form t-ali-cen'>
            <form onSubmit={edit} className='add-form'>
               <label>คำนำหน้า :</label>
               <select name="Prefix" onChange={(e) => setPrefix(e.target.value)} value={Prefix}>
                  <option value="0">...คำนำหน้า...</option>
                  <option value="1">นาย</option>
                  <option value="2">นาง</option>
                  <option value="3">นางสาว</option>
               </select>
               {/* <label>ตำแหน่ง :</label>
            <select name="NewRank" onChange={(e) => setRank(e.target.value)} value={Rank}>
               <option value="0">...ตำแหน่ง...</option>
               <option value="1">ตำแหน่ง ABC</option>
               <option value="2">ตำแหน่ง D45</option>
               <option value="3">ตำแหน่ง XYZ</option>
               <option value="4">ตำแหน่ง PYE</option>
            </select>*/}
               <label>ชื่อ :</label>
               <input
                  type="search"
                  placeholder="First name"
                  value={First_name} required
                  onChange={(e) => setFirst_name(filterSymbols('name', e.target.value))} />
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
               {/* <label className='dateFormat' ><span >วันเกิด :</span><span>วว / ดด / ค.ศ</span></label>
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
                  onChange={(e) => setEmail(filterSymbols('email', e.target.value))} /> */}
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
                  <input type="submit" value="แก้ข้อมูล" />
               </div>
            </form>
         </section>
      </>
   )

}

export default UpdateSheet;