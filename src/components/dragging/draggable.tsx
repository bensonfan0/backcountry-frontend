import React, { ReactNode } from 'react';
import { useDraggable } from '@dnd-kit/core';

interface DroppableProps {
    children: ReactNode;
    id: string;
}

function Draggable({ children, id }: DroppableProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });
    const defaultStyle = {
        borderRadius: '50px',
        padding: 5,
    }
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <button
            ref={setNodeRef}
            style={{...defaultStyle, ...style}}
            {...listeners}
            {...attributes}
            onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#e4e4e4'}}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
        >
            {children}
        </button>
    );
}

export default Draggable
