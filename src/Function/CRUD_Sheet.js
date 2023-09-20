import axios from 'axios';

const sheetsfetch = async () => {
   //ตัวอย่าง async await การ fatch ไม่ได้ใช้
   try {
      const response = await axios.get('https://api.sheety.co/4ca9ed09b8eddce654c9316dcee071de/addData/sheets1');
      console.log(response);// รอ const response
   } catch (error) {
      return error;
   }
}

