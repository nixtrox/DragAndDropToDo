import { Column } from "../types";

interface Props{
    column: Column;
}




function ColumnContainer(props: Props)
{
   const {column} = props;
    return <div className="
    bg-mainBackgroundColor 
    color-white
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col
    text-white" 
  
    >
        
        <div className="
        bg-mainBackgroundColor
        text-md
        h-[60px]
        cursor-grab
        rounded-md
        rounded-b-none
        p-3
        font-bold
        border-columnBackgroundColor
        border-4
        flex
        items-center
        justify-between"  > 

         <div className="flex gap-2">
         <div className="
         flex
         justify-center
         items-center
         bg-columnBackgroundColor
         px-2
         py-1
         text-sm
         rounded-full" >
            0
            </div>
         {column.title}
         </div>
         </div>

         
      



        <div className="flex flex-grow"  >asd</div>
        <div>Footer</div>
        </div>
}

export default ColumnContainer;