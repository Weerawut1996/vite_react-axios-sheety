export function convertDate(inputDate) {
   // แยกวันที่, เดือน และปี
   var parts = inputDate.split('/');
   // console.log(parts);
   var day = parts[0];
   var month = parts[1];
   var year = parts[2];
   // รายการของชื่อเดือน
   var monthNames = ["ม.ค", "ก.พ", "มี.ค", "เม.ย", "พ.ค", "มิ.ย", "ก.ค", "ส.ค", "ก.ย", "ต.ค", "พ.ย", "ธ.ค"];
   // แปลงเดือนเป็นชื่อเดือน
   var monthName = monthNames[parseInt(month) - 1];
   // สร้างรูปแบบวันที่
   var result = day + " " + monthName + " " + year;
   return result;
}

export function TelephoneFormat(input) {
   if (!isNaN(input.length - 1)) {
      console.log(input.length - 1);
      return input.slice(0, -1);
   } else {
      
   }
   const lastCharacter = input.charAt();
}



