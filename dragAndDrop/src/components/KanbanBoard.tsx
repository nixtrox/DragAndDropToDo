import { useState } from "react";
import { Column } from "../types";
import ColumnContainer from "./ColumnContainer";

import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { Id } from "../types";




function KanbanBoard(){

    const [columns, setColumns] = useState<Column[]>([]);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
    console.log(columns)



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

        <DndContext>
        <div className="m-auto flex gap-4">
            <div className="flex gap-4" >
                <SortableContext items={columnsId}>
                {columns.map((col) =>(
                <ColumnContainer 
                key={col.id} 
                column={col} 
                deleteColumn={deleteColumn}
                 ></ColumnContainer>
            ))}</SortableContext>
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
        </DndContext>
    </div>
    );



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
}

function generateId(){
    return Math.floor(Math.random() * 10001)
}

export default KanbanBoard;