import { Dispatch, FC, SetStateAction, useContext } from "react";
import { useListState, UseListStateHandlers } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconGripVertical, IconTrash } from "@tabler/icons";
import { createStyles } from "@mantine/core";
import { ClockContext } from "../../utils/contexts";
import { IData } from "./Timer";

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
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
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {/* Handle */}
          <div {...provided.dragHandleProps}>
            <IconGripVertical size={24} stroke={1.5} />
          </div>
          {/* Exercise */}
          {item.name} - {item.seconds}
          {/* Delete */}
          <button
            onClick={() => {
              handlers.remove(index);
              setNow(0);
            }}
            type="button"
          >
            {/* <IconTrash size={24} stroke={1.5} color="#c81e4c" />
          <IconTrash size={24} stroke={1.5} color="#e9627f" /> */}
            <IconTrash size={24} stroke={1.5} color="red" />
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
