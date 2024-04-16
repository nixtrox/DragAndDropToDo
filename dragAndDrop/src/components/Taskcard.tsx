import React from "react";
import { Task } from "../types";
import { useState } from "react";
import { Id } from "../types";


interface Props{
    task: Task;
    deleteTask: (id:Id) => void

}


function TaskCard({task, deleteTask} : Props){

    const [mouseIsOver, setMouseIsOver] = useState(false)

    return(
        <div className="bg-black p-2 h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-purple-500 cursor-grab relative"
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
                    className="stroke-white absolute right-4 top-1/2-translate-y-1/2  rounded p-2"  >Delete</button>)
               
            }

            
            </div>
    )
}


export default TaskCard