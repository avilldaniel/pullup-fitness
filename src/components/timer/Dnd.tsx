import { FC, useContext } from "react";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconGripVertical } from "@tabler/icons";
import { createStyles } from "@mantine/core";
import { ClockContext } from "../../utils/contexts";

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

interface IData {
  name: string;
  seconds: number;
  id: number;
}

interface DndProps {}

const Dnd: FC<DndProps> = ({}) => {
  const { seconds, setSeconds } = useContext(ClockContext);

  const { classes, cx } = useStyles();
  // const [state, handlers] = useListState<IData>([]);
  const [state, handlers] = useListState<IData>([
    { name: "a", seconds: 30, id: new Date().getTime() + 1 },
    { name: "b", seconds: 10, id: new Date().getTime() + 2 },
    { name: "c", seconds: 20, id: new Date().getTime() + 3 },
  ]);

  console.log(state[0].seconds);
  console.log({ seconds });

  const items = state.map((item, index) => (
    // <Draggable key={item.id} index={index} draggableId={item.id.toString()}>
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
            <IconGripVertical size={18} stroke={1.5} />
          </div>
          {/* Exercise */}
          {item.name} - {item.seconds}
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        handlers.reorder({ from: source.index, to: destination?.index || 0 });
        setSeconds(state[source.index].seconds);
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
