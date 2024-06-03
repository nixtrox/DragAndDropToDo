import { useState } from "react";
import { Column, Task } from "../types";
import ColumnContainer from "./ColumnContainer";

import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { Id } from "../types";
import { createPortal } from "react-dom";
import { useSensors } from "@dnd-kit/core";
import { useEffect } from "react";
import TaskCard from "./Taskcard";

const defaultCols: Column[] = [
    {
      id: "todo",
      title: "Todo",
    },
    {
      id: "wip",
      title: "Work in progress",
    },
    {
      id: "done",
      title: "Done",
    },
  ];


 
  
  



function KanbanBoard(){

    const [columns, setColumns] = useState<Column[]>(defaultCols);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
    
    //const [tasks, setTasks] = useState<Task[]>(defaultTasks);
    const [tasks, setTasks] = useState([] as Task[])

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        }
    }));


    const [activeTask, setActiveTask] = useState<Task |null>(null)



    async function load() {
        const response = await fetch("http://localhost:3000/tododatabase");
        const pulledTasks = await response.json() as Task[];
        
       
    
    //console.log(task[0])
       //defaultTasks.push(task[0])
      


   

      
        setTasks(pulledTasks)


       console.log(tasks)
       

      }


    
    useEffect(()=>{
    load();
    },[])


    const columnToAdd: Column = {
        id: generateId(),
        title: `Column ${columns.length + 1}`,
      };
  
     




    return (
    <div className="
    m-auto 
    flex 
    min-h-screen 
    w-full 
    items-center 
    overflow-x-auto 
    overflow-y-hidden 
    px-[40px]"  >
       

        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver} >
        <div className="m-auto flex gap-4">
            <div className="flex gap-4" >
                <SortableContext items={columnsId}>
                {columns.map((col) =>(
                <ColumnContainer 
                key={col.id} 
                column={col} 
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter((task) => task.columnId === col.id)}


                 ></ColumnContainer>
                ))}
                
                </SortableContext>
            </div>
           
        </div>   

            {createPortal(
                <DragOverlay>
                {activeColumn && (<ColumnContainer 
                column={activeColumn} 
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}

                />
                )}
                

                {activeTask && <TaskCard task={activeTask} deleteTask={deleteTask} updateTask={updateTask} />}

 

                </DragOverlay>, document.body
            )}
            
        </DndContext>
    </div>
    );

    async function createTask(columnId: Id){
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`
        }

        const Data = `{"columnId": "${newTask.columnId}", "content": "${newTask.content}"}`

        
        const sendComm = await fetch('http://localhost:3000/tododatabase',{
            method:"POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: Data
          })
          await load();



        setTasks([...tasks, newTask])

    }

    async function deleteTask(id: Id){
        const newTasks = tasks.filter((task) => task.id !== id);

        const deleteData = await fetch(`http://localhost:3000/tododatabase/${id}`,{
          method:"DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          
        })
        await load();
        setTasks(newTasks)

    }

    async function updateTask(id:Id, content:string)
    {
        const newTasks = tasks.map(task =>{
            if(task.id !== id)return task;
            return{...task, content};
        })


           
        const Data = `{"columnId": "${id}", "content": "${content}"}`
        const sendComm = await fetch(`http://localhost:3000/tododatabase/${id}`,{
            method:"PUT",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: Data
          })
           await load();






        setTasks(newTasks)
    }

    function updateColumn(id:Id, title:string)
    {
        const newColumn = columns.map(col => {
            if(col.id !== id ) return col;
            return {...col, title}
        })
        setColumns(newColumn);
    }



      function deleteColumn(id:Id)
      {
        const filteredColumns = columns.filter((col) => col.id !== id);
        setColumns(filteredColumns);
      }

   


      function onDragStart(event: DragStartEvent)
      {
        if(event.active.data.current?.type === "Column"){
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if(event.active.data.current?.type === "Task"){
            setActiveTask(event.active.data.current.task);
            return;
        }
      }

      async function onDragEnd(event: DragEndEvent)
      {
        setActiveColumn(null);
        setActiveTask(null);
        const {active,over} = event;
        if(!over) return;
        const activeColumnId = active.id;
        const overColumnId = over.id;
  

       
      



        if(activeColumnId === overColumnId)return;


        setColumns((columns) =>{

            const activeColumnIndex = columns.findIndex((col) => col.id === activeColumnId);

            const overColumnIndex = columns.findIndex((col) => col.id === overColumnId);



      



            return arrayMove(columns, activeColumnIndex,overColumnIndex);


        })

      }


      function onDragOver(event:DragOverEvent)
      {
        const {active,over} = event;
        if(!over) return;
        const activeId = active.id;
        const overId = over.id;
        if(activeId === overId)return;

        const isActiveTask = active.data.current?.type === "Task";
        const isOverTask = over.data.current?.type === "Task";

        if(isActiveTask && isOverTask)
        {
           setTasks((tasks) => {
            const activeIndex = tasks.findIndex((t) =>t.id === activeId);

            const overIndex = tasks.findIndex((t) =>t.id === overId);


            if(tasks[activeIndex].columnId !== tasks[overIndex].columnId)
            {
                tasks[activeIndex].columnId = tasks[overIndex].columnId
            }


            return arrayMove(tasks,activeIndex, overIndex)
           })
        }
     


      }


      

}

function generateId(){
    return Math.floor(Math.random() * 10001)
}

export default KanbanBoard;