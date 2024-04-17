import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column } from "../types";
import { Id } from "../types";
import {CSS} from "@dnd-kit/utilities";
import { Task } from "../types";
import TaskCard from "./Taskcard";
import { useMemo, useState } from "react";
interface Props{
    column: Column;
    deleteColumn: (id: Id) => void;

    updateColumn: (id: Id, title: string) => void;
    updateTask: (id:Id, content:string) => void;
    createTask: (columnId:Id) => void;
    tasks: Task[];
    deleteTask: (id:Id) => void
}




function ColumnContainer(props: Props)
{
   const {column, deleteColumn, createTask,updateColumn ,tasks,deleteTask, updateTask} = props;
   const tasksIds = useMemo(() =>{
    return tasks.map((task) => task.id)
   },[tasks])

   const [editMode,setEditMode] = useState(false)


    const {setNodeRef,attributes,listeners, transform,transition, isDragging} = 
    useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
   });


   const style = {
    transition,
    transform: CSS.Transform.toString(transform),

   };

   if(isDragging)
    {
      return <div ref={setNodeRef} style={style} className="
      bg-mainBackgroundColor 
      opacity-30
      border-2
      border-neutral-900 
      color-white
      w-[350px]
      h-[500px]
      max-h-[500px]
      rounded-md
      flex
      flex-col
      text-white" ></div>
    }

    return (
    <div ref={setNodeRef} style={style}  className="
    bg-zinc-600 
    font-mono
    color-white
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col
    text-white" 
  
    >
        {/* col title*/}
        <div 
        {...attributes}
        {...listeners}
        onClick={() =>{
          setEditMode(true)
        }}
        className="
        bg-neutral-900
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
         
         {!editMode && column.title}
         {editMode && (
         <input 
         className="bg-black"
         value={column.title}
         onChange={e => updateColumn(column.id, e.target.value)}
          autoFocus 
          onBlur={() =>{
          setEditMode(false);
         }} onKeyDown={e=>{
          if(e.key != "Enter") return;
          setEditMode(false);
         }} ></input>)}
         </div>
         <button className="
         hover:stroke-white
         hover:bg-columnBackgroundColor
         hover:text-red-600
         rounded
         px-1
         py-2"
          onClick={() => {
            deleteColumn(column.id)
          }} >Delete</button>
         </div>
         
        
        <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto"  >
        <SortableContext items={tasksIds}>
          {tasks.map((task) =>(
           <TaskCard key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} ></TaskCard>
           
          ))}
           </SortableContext>
        </div>
       

        <button className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:gb-mainBackgroundColor hover:text-green-500 active:bg-black 
        "
        onClick={() =>{
          createTask(column.id)
        }}
        >Add Task</button>
        </div>
    )
}

export default ColumnContainer;