export function convertDate(inputDate) {
   // แยกวันที่, เดือน และปี
   var parts = inputDate.split('/');
   var day = parts[0];
   var month = parts[1];
   var year = parts[2];
   // สร้างรายการของชื่อเดือน
   var monthNames = [ "ม.ค", "ก.พ", "มี.ค", "เม.ย", "พ.ค", "มิ.ย", "ก.ค", "ส.ค", "ก.ย", "ต.ค", "พ.ย", "ธ.ค"];
   // แปลงเดือนเป็นชื่อเดือน
   var monthName = monthNames[parseInt(month) - 1];
   // สร้างวันที่ในรูปแบบที่ต้องการ
   var result = day + " " + monthName + " " + year;
   return result;
}