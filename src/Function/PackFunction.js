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
   if (input === "") {
      //input Empty
      return input;
   }

   // Use regular expression to extract numeric characters
   const numericChars = input.match(/\d+/g);
   let phone = numericChars.join('');
   let phoneformatted = phone;

   if (numericChars) {
      if (phone.length > 10) {
         phone = phone.substring(0, 10)
         phoneformatted = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 - $2 - $3');
      }
      else if (phone.length >= 7 && phone.length <= 10) {
         phoneformatted = phone.replace(/(\d{3})(\d{3})(\d{1,4})/, '$1 - $2 - $3');
      }
      else if (phone.length >= 4) {
         phoneformatted = phone.replace(/(\d{3})(\d{1,3})/, '$1 - $2');
      }
      else { phoneformatted = phone }
   }
   return phoneformatted;
}


export function filterSymbols(input) {
   //  return input.replace(/[^a-zA-Z0-9ก-๙\s]/g, ''); // ลบสัญลักษณ์ที่ไม่ใช่ตัวอักษร ตัวเลข และช่องว่าง
   return input.replace(/[^a-zA-Zก-๙\s]/g, '');
}

export function filterEmail(e,input) {
   console.log(e);
   //  return input.replace(/[^a-zA-Z0-9ก-๙\s]/g, ''); // ลบสัญลักษณ์ที่ไม่ใช่ตัวอักษร ตัวเลข และช่องว่าง
   return input.replace(/[^a-zA-Z0-9\s@._-]/g, '');
}