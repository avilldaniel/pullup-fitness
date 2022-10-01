import { Dispatch, FC, SetStateAction, useContext } from "react";
import { UseListStateHandlers } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconGripVertical, IconTrash } from "@tabler/icons";
import { createStyles } from "@mantine/core";
import { ClockContext } from "../../utils/contexts";
import { IData } from "./Timer";
import timersx from "../../styles/Timer.module.css";

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },
}));

interface DndProps {
  setNow: Dispatch<SetStateAction<number>>;
  state: IData[];
  handlers: UseListStateHandlers<IData>;
}

const Dnd: FC<DndProps> = ({ setNow, state, handlers }) => {
  const { setSeconds } = useContext(ClockContext);

  const { classes, cx } = useStyles();

  const items = state.map((item, index) => (
    <Draggable
      key={item.id}
      // key={item.name + index}
      index={index}
      draggableId={item.id.toString()}
    >
      {(provided, snapshot) => (
        <div
          className={`${cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })} ${timersx.draggable}`}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {/* Handle */}
          <div {...provided.dragHandleProps}>
            {/* <IconGripVertical size={24} stroke={1.5} /> */}
            <IconGripVertical size={20} stroke={1.5} />
          </div>
          {/* Exercise */}
          {item.name && `${item.name} -`}
          {item.seconds}
          {/* Delete */}
          <button
            onClick={() => {
              handlers.remove(index);
              setNow(0);
            }}
            type="button"
          >
            {/* <IconTrash size={24} stroke={1.5} color="#c81e4c" /> */}
            <IconTrash size={28} stroke={1.5} color="#e9627f" />
            {/* <IconTrash size={24} stroke={1.5} color="red" /> */}
          </button>
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        handlers.reorder({ from: source.index, to: destination?.index || 0 });
        setSeconds(state[source.index].seconds);
        setNow(state[source.index].seconds);
      }}
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default Dnd;
