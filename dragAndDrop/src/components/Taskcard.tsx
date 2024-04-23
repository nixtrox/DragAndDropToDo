import React from "react";
import { Task } from "../types";
import { useState } from "react";
import { Id } from "../types";
import { DragOverlay } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";






interface Props{
    task: Task;
    deleteTask: (id:Id) => void
    updateTask: (id:Id, content:string) => void

}




function TaskCard({task, deleteTask,updateTask} : Props){

    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const toggleEditMode = ()=>{
        setEditMode((prev) => !prev)
        {
            setMouseIsOver(false);
        }
    }


    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
      } = useSortable({
        id: task.id,
        data: {
          type: "Task",
          task,
        },
        disabled: editMode,
      });

      const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    
       };
    

       if(editMode)
       {
        return (
            <div 
            
           ref={setNodeRef}
           style={style}
           {...attributes}
           {...listeners}
      
            
            className="bg-neutral-900 p-2 h-[100px] items-center flex text-left rounded-xl ring-2 ring-inset ring-blue-500 cursor-grab relative"
             >
               <textarea className="bg-black rounded-md"
               value={task.content}
               autoFocus
               placeholder="Feladat leírása"
               onBlur={toggleEditMode}
               onKeyDown={e =>{
                if(e.key == "Enter")toggleEditMode();
               }}
               onChange={e => updateTask(task.id, e.target.value)}
               ></textarea>
    
                
                </div>
              
        )
       }



    return(
       
        <div 
        onClick={toggleEditMode}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
  
        
        className="bg-neutral-800 p-2 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-green-500 cursor-grab relative"
         onMouseEnter={() => setMouseIsOver(true)}
         onMouseLeave={() => setMouseIsOver(false)}
         >
            {task.content}

            {
                mouseIsOver && ( <button 
                    onClick={() =>
                        {
                            deleteTask(task.id)
                        }
                    }
                    className="stroke-white absolute right-4 top-1/2-translate-y-1/2  rounded p-2 hover:text-red-600"  >Delete</button>)
               
            }

            
            </div>
          
    )
}


export default TaskCard