import axios from 'axios';

const sheetsfetch = async () => {
   //ตัวอย่าง async await การ fatch ไม่ได้ใช้
   try {
      const response = await axios.get('https://api.sheety.co/...');
      console.log(response);// รอ const response
   } catch (error) {
      return error;
   }
}

