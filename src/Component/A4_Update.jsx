import { useEffect, useState } from "react"
import { TelephoneFormat, convertDate, filterSymbols, reDate_Th2En } from "../Function/PackFunction";
import axios from "axios";

const UpdateSheet = (props) => {
   // if (id === 'Test-ABC-E0Q998FA' || id === 'Test-D45-QJC7F61H') {
   //    alert(`ห้ามลมหรือแก้ไข id : ${id}`)
   //    return;
   // }
   const rankFn = (employeeId) => {
      // ex. ABC-E0Q998FA
      var parts = employeeId.split('-');
      // parts = ['ABC','E0Q998FA']
      // parts[0] = 'ABC'
      return parts[0] === 'ABC' ? '1' : parts[0] === 'D45' ? '2' : parts[0] === 'XYZ' ? '3' : parts[0] === '' ? '4' : '0'
   }
   const employeeId = (employeeId) => {
      // ex. ABC-E0Q998FA
      var parts = employeeId.split('-');
      // parts = ['ABC','E0Q998FA']
      // parts[0] = 'ABC'
      return parts[1]
   }

   const setE_Form = () => {
      //รับ useState seteditForm จาก A2_Read.jsx 
      //เรียกใช้ setE_Form เพิ่อปิด editForm ใน A2_Read.jsx 
      //[editForm, seteditForm] = useState(<></>)
      props.setE(<></>)
   }

   // console.log(props.data);
   // console.log(props.data.id);
   const [Prefix, setPrefix] = useState(props.data.prefix === 'นาย' ? '1' : props.data.prefix === 'นาง' ? '2' : props.data.prefix === 'นางสาว' ? '3' : '0')
   const [Rank, setRank] = useState(rankFn(props.data.employeeId))
   const [First_name, setFirst_name] = useState(props.data.firstName)
   const [Last_name, setLast_name] = useState(props.data.lastName)
   const [gender, setgender] = useState(props.data.physicalGender === 'ชาย' ? '1' : props.data.physicalGender === 'หญิง' ? '2' : '0')
   const [Birth_date, setBirth_date] = useState(reDate_Th2En(props.data.thaiBirthDate))
   const [Telephone, setTelephone] = useState(props.data.telephone)
   const [Email, setEmail] = useState(props.data.email)

   async function edit(e) {
      e.preventDefault() // e.preventDefault() ไว้ป้องกัน event web refed เมื่อกด supmit จาก form
      const newRank_id = Rank === "1" ? 'ABC' : Rank === "2" ? 'D45' : Rank === "3" ? 'XYZ' : Rank === "4" ? 'PYE' : '000';
      console.log(Birth_date);
      const nowBirth_date = convertDate(new Date(Birth_date).toLocaleDateString('th-TH'))
      const newData = {
         sheets1: {
            employeeId: `${newRank_id}-${employeeId(props.data.employeeId)}`,
            rank: Rank === "1" ? 'ระดับ 1 ABC' : Rank === "2" ? 'ระดับ 2 D45' : Rank === "3" ? 'ระดับ 3 XYZ' : '000',
            prefix: Prefix === '1' ? 'นาย' : Prefix === '2' ? 'นาง' : Prefix === '3' ? 'นางสาว' : 'ไม่ระบุ',
            firstName: First_name,
            lastName: Last_name,
            physicalGender: gender === '1' ? 'ชาย' : gender === '2' ? 'หญิง' : '0',
            thaiBirthDate: nowBirth_date,
            telephone: Telephone,
            email: Email
         }
      };
      console.log(newData.sheets1);
      axios.put(`https://api.sheety.co/4ca9ed09b8eddce654c9316dcee071de/addData/sheets1/${props.data.id}`, newData)
         .then(() => {
            console.log('%c..', 'background: green; color: green;', 'Update ok and complete');
            setE_Form()
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
         <h3>Update - {props.data.employeeId}</h3>
         <div className="closeX"><button onClick={setE_Form}>x</button></div>
         <section className='create-form t-ali-cen'>
            <form onSubmit={edit} className='add-form'>
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
                  minLength={"12"} maxLength={"12"} size={"16"}
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
                        // setRank('0');
                        setFirst_name('');
                        setLast_name('');
                        // setBirth_date('');
                        // setTelephone('');
                        // setEmail('')
                     }} />
                  <input type="submit" value="แก้ข้อมูล" />
               </div>
            </form>
         </section>
      </>
   )

}

export default UpdateSheet;