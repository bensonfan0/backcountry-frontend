import React, { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableProps {
    id: string,
    children: ReactNode;
}

function Droppable({ id, children }: DroppableProps) {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });

    const style: React.CSSProperties = {
        backgroundColor: isOver ? 'green' : undefined,
    };

    console.log(isOver)

    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
}

export default Droppable;
