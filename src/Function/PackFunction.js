export function RandomId(length) {
   let result = '';
   const characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZ123456789';//remove I and zero(0)
   const charactersLength = characters.length;
   for (let counter = 0; counter < length; counter++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

export function convertDate(inputDate) {
   // console.log(inputDate);
   // แยกวันที่, เดือน และปี ค.ศ.
   var parts = inputDate.split('/');
   // console.log(parts);
   var day = parts[0] < 10 ? `0${parts[0]}` : parts[0];
   var month = parts[1];
   var year = parts[2];
   if ((year+533)>=2700) {
      year -=543
   }
   // รายการของชื่อเดือน
   var monthNames = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
   // แปลงเดือนเป็นชื่อเดือน
   var monthName = monthNames[parseInt(month) - 1];
   // สร้างรูปแบบวันที่
   var result = day + " " + monthName + " " + year;
   return result;
}

export function CalculateAge(birthday) {
   //input = 25 ม.ค. 2542
   const monthNames = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."]
   const parts = birthday.split(' ');
   const month = monthNames.indexOf(parts[1]) < 10 ? `0${monthNames.indexOf(parts[1]) + 1}` : monthNames.indexOf(parts[1]) + 1;
   const ReFormeted = new Date(`${month}/${parts[0]}/${parts[2] - 543}`)//01/25/2001
   const today = new Date();
   let age = today.getFullYear() - ReFormeted.getFullYear();
   const sameMonth = today.getMonth() === ReFormeted.getMonth()
   today.getMonth() < ReFormeted.getMonth() || (sameMonth && ReFormeted.getDate() > today.getDate()) ? age -= 1 : age
   // Subtract 1 from age if birthday hasn't occurred yet this year
   return age
}

export function TelephoneFormat(input) {
   if (input.match(/\d+/g) === null) { return ''; }/*input not number*/
   // Use regular expression to extract numeric characters
   const detectOnlyNum = input?.match(/\d+/g)
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
   if (input.length > 0 && input[0].match(/[0-9]/)) {
      return input = ''
   }
   else if (in_type === 'name') {
      return input.replace(/[^a-zA-Zก-ฮ\sฺํ.]/g, '');
   }
   else if (in_type === 'email') {
      return input.replace(/[^a-zA-Z0-9\s@._-]/g, '');
   }
   else {
      return input
   }
}






