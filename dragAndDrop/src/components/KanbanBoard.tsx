import { useState } from "react";
import { Column, Task } from "../types";
import ColumnContainer from "./ColumnContainer";

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { Id } from "../types";
import { createPortal } from "react-dom";
import { useSensors } from "@dnd-kit/core";





function KanbanBoard(){

    const [columns, setColumns] = useState<Column[]>([]);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
    
    const [tasks, setTasks] = useState<Task[]>([]);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 300,
        }
    }));



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

        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-4">
            <div className="flex gap-4" >
                <SortableContext items={columnsId}>
                {columns.map((col) =>(
                <ColumnContainer 
                key={col.id} 
                column={col} 
                deleteColumn={deleteColumn}

                createTask={createTask}
                deleteTask={deleteTask}
                tasks={tasks.filter((task) => task.columnId === col.id)}
                 ></ColumnContainer>
                ))}
                </SortableContext>
            </div>
            <button onClick={() => {
                createNewColumn();
            }}    
            className="h-[60px] 
            w-[350px] 
            min-w-[350px] 
            cursor-pointer 
            rounded-lg 
            bg-mainBackgroundColor 
            border-z 
            border-colimnBackgroundColor 
            p-4 
            ring-rose-500 
            hover:ring-2 ">
                Add Column</button>
        </div>   

            {createPortal(
                <DragOverlay>
                {activeColumn && (<ColumnContainer 
                column={activeColumn} 
                deleteColumn={deleteColumn}

                createTask={createTask}
                deleteTask={deleteTask}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}

                />
                )}
                </DragOverlay>, document.body
            )}
            
        </DndContext>
    </div>
    );

    function createTask(columnId: Id){
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`
        }
        setTasks([...tasks, newTask])
    }

    function deleteTask(id: Id){
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks)

    }


    function createNewColumn() {
        const columnToAdd: Column = {
          id: generateId(),
          title: `Column ${columns.length + 1}`,
        };
    
        setColumns([...columns, columnToAdd]);
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
      }

      function onDragEnd(event: DragEndEvent)
      {
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

}

function generateId(){
    return Math.floor(Math.random() * 10001)
}

export default KanbanBoard;