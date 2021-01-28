import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initialData from "./data";
import Column from './componets/columm.component';

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-content:center;
`;

class App extends React.Component {
  state = initialData;

  onDragEnd = (result) => {
    console.log(result);
    const { source, destination, draggableId } = result;
    
    /**handle scenario of dragging drggable outside of dragdrop context */
    if(!destination) {
      return;
    }
    /**do nothing if drggable being draggeed to same place */
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    /**this will determine the column being dragged to i.e droppable */
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    /**if draggable items belongs to same column */
    if (start === finish) {      

      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index,0,draggableId);
    
    /**generating new positioning of list items after dragged*/
      const newColumn = {
        ...start,
        taskIds: newTaskIds
        };
        
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]:newColumn
        }
      }
      
      this.setState(newState);
      return;
    }

    /**moving list item from one column to another*/
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);   
    const newStartTaskIds = {
      ...start,
      taskIds: startTaskIds
      };
    
    const FinishTaskIds = Array.from(finish.taskIds);
    FinishTaskIds.splice(destination.index, 0,draggableId);
    const newFinishTaskIds = {
      ...finish,
      taskIds:FinishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStartTaskIds.id]: newStartTaskIds,
        [newFinishTaskIds.id]:newFinishTaskIds
      }
    }
    this.setState(newState);
  };
 
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {
            this.state.columnOrder.map(columnId => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
      
              return <Column key={column.id} column={column} tasks={tasks} />
            })
          }
         </Container> 
      </DragDropContext>
    )
  }
}
export default App;