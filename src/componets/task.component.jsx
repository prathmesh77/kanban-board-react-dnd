import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    padding:8px;
    margin-bottom:8px;
    border:1px solid lightgrey;
    border-radius:2px;
    background-color:${({isDragging})=>(isDragging?'lightgreen':'white')};
`;

const Task = ({task:{id,content},index}) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided,snapshot) => (
                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                >
                {content}
                </Container>
            )}
        </Draggable>
    );
}

export default Task;