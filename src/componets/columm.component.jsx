import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task.component';

const Container = styled.div`
    margin:8px;
    border:1px solid lightgrey;
    border-radius:2px;   
    width:250px;
    display:flex;
    flex-direction:column;
`;
const Title = styled.h3`
    padding:8px;
`;
const TaskList = styled.div`
    padding:8px;
    transition:background-color 0.2s ease;
    background-color:${({ isDraggingOver }) => (isDraggingOver ? 'lightblue' : 'white')};
    flex-grow:1;
`;

class Column extends React.Component{
    render() {
        const { column: { title,id },tasks } = this.props;
        return (
            <Container>
                <Title>{title}</Title>
                <Droppable droppableId={id}>
                    {(provided,snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {tasks.map((task, index) => <Task key={task.id} task={task} index= {index}/>)}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        )
    }
}
export default Column;
