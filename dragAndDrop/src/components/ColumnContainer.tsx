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
        <div> {column.title}</div>
        <div className="flex flex-grow"  >asd</div>
        <div>Footer</div>
        </div>
}

export default ColumnContainer;