import { useState } from "react";

const UpdateDeleteSheet = (props) => {
   const [Up_DelForm, setUp_DelForm] = useState(<></>)

   function Editsheets(id) {
      console.log('Edit',id);
      if (id === 'a1'||id === 'a2') {
         return;
      }
      //edit sheet
   }
   function delsheets(id) {
      console.log('del',id);
      if (id === 'a1'||id === 'a2') {
         return;
      }
      //del

   }



   return (
      <>
         {Up_DelForm}
         <div className="EditDelSheet">
            <input type="button" value="Update" onClick={() => Editsheets(props.id)} />
            <input type="button" value="Delete" onClick={() => delsheets(props.id)}/>
         </div>
      </>
   )

}

export default UpdateDeleteSheet;