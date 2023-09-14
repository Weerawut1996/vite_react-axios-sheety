export function RandomId(length) {
   let result = '';
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   const charactersLength = characters.length;
   for (let counter = 0; counter < length; counter++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

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
export function reformatInputDate(inputDate) {
   // แยกวันที่, เดือน และปี
   var parts = inputDate.split('-');
   // console.log(parts);
   var year = `${+parts[0] + 543}`;
   var month = parts[1];
   var day = parts[2];
   // สร้างรูปแบบวันที่
   var result = `${day}/${month}/${year}`;
   return result;
}
export function TelephoneFormat(input) {
   if (input === "") {
      //input Empty
      return input;
   }
   // Use regular expression to extract numeric characters
   const detectOnlyNum = input.match(/\d+/g)
   let phone = detectOnlyNum.join('');
   if (phone.length > 10) {
      phone = phone.substring(0, 10)
      phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
   }
   else if (phone.length >= 7 && phone.length <= 10) {
      phone = phone.replace(/(\d{3})(\d{3})(\d{1,4})/, '$1-$2-$3');
   }
   else if (phone.length >= 4) {
      phone = phone.replace(/(\d{3})(\d{1,3})/, '$1-$2');
   }
   return phone;
}

export function filterSymbols(in_type, input) {
   //  return input.replace(/[^a-zA-Z0-9ก-๙\s]/g, ''); // ลบสัญลักษณ์ที่ไม่ใช่ตัวอักษร ตัวเลข และช่องว่าง
   if (input.length > 0 && input[0].match(/[0-9@._-]/)) {
      return input = ''
   }
   else if (in_type === 'name') {
      return input.replace(/[^a-zA-Zก-๙\s]/g, '');
   }
   else if (in_type === 'email') {
      return input.replace(/[^a-zA-Z0-9\s@._-]/g, '');
   }
   else {
      return input
   }
}


