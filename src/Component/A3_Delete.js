import axios from 'axios';

const DeleteSheet = async (id) => {
      //ได้ใช้
      console.log('del', id);
      if (id === 'Test-ABC-E0Q998FA' || id === 'Test-D45-QJC7F61H') {
         alert(`ห้ามลมหรือแก้ไข id : ${id}`)
         return;
      }
      //del
      try {
         const response = await axios.delete('https://api.sheety.co/4ca9ed09b8eddce654c9316dcee071de/addData/sheets1/' + id);
         console.log(response);// รอ const response
         updateTable();
      } catch (error) {
         console.log('fail to delete');// รอ const response
         console.log(error)
         return error;
      }

   }

export default DeleteSheet;

