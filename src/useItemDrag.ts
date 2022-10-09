import { useDrag } from "react-dnd";
import { useAppState } from "./AppStateContext";
import { DragItem } from "./DragItem";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();

  const [{ isDragging }, drag] = useDrag({
    type: item.type, 
    item: () => {
      return [
        item,
        dispatch({
          type: "SET_DRAGGED_ITEM",
          payload: item,
        }), 
      ];
    },

    end: () =>
      dispatch({
        type: "SET_DRAGGED_ITEM",
        payload: undefined,
      }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return { drag };
};
