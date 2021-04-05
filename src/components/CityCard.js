import React from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { useGlobalContext } from "../context/context";
import drag from "../assets/drag-icon.png";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function Widget({ widget, index }) {
  return (
    <Draggable draggableId={widget.id} index={index}>
      {(provided) => (
        <div
          className='single-card'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <p>{widget.text}</p>
          <img src={drag} alt='' />
        </div>
      )}
    </Draggable>
  );
}

const WidgetList = React.memo(function WidgetList({ widgets }) {
  if (!widgets) {
    return <p className='card-error'>No Items To Display !!!</p>;
  }
  if (widgets.length === 0) {
    return <p className='card-error'>No Items To Display !!!</p>;
  }
  return widgets.map((widget, index) => (
    <Widget widget={widget} index={index} key={widget.id} />
  ));
});

function Column({ droppableId, widgets }) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className='column-div'>
          <WidgetList widgets={widgets} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

const getLoaclStorage = () => {
  if (localStorage.getItem("city")) {
    let dt = localStorage.getItem("city");
    return JSON.parse(dt);
  } else {
    return [];
  }
};

function CityCard({ data }) {
  const [global, setGlobal] = React.useState(true);
  const [view, setView] = React.useState(false);
  const [save, setSave] = React.useState(false);
  const [state, setState] = React.useState({
    widgets: global ? data : getLoaclStorage(),
  });

  const { saveData, cityData } = useGlobalContext();

  const getShowLessList = (data) => {
    if (data) {
      let array = data["column-1"].slice(0, 10);
      let newObj = { "column-1": array, "column-2": [] };
      return newObj;
    }
  };

  React.useEffect(() => {
    setState({
      widgets: global
        ? view
          ? cityData
          : getShowLessList(cityData)
        : getLoaclStorage(),
    });
  }, [cityData, global, view]);

  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      if (destination.index === source.index) {
        return;
      }

      const widgets = reorder(
        state.widgets[source.droppableId],
        source.index,
        destination.index
      );

      const updateState = {
        widgets: {
          ...state.widgets,
          [source.droppableId]: widgets,
        },
      };

      setState(updateState);
    } else {
      const startColumn = [...state.widgets[source.droppableId]];
      const finishColumn = [...state.widgets[destination.droppableId]];
      const [removed] = startColumn.splice(source.index, 1);
      finishColumn.splice(destination.index, 0, removed);

      const updateState = {
        widgets: {
          ...state.widgets,
          [source.droppableId]: startColumn,
          [destination.droppableId]: finishColumn,
        },
      };
      setState(updateState);
    }
  }

  const handleSubmit = () => {
    setSave(true);
    let value = "city";
    localStorage.setItem(value, JSON.stringify(state.widgets));
    saveData(state.widgets, value);
  };

  React.useEffect(() => {
    const timout = setTimeout(() => {
      setSave(false);
    }, 1000);
    return () => clearTimeout(timout);
  }, [save]);

  if (!state.widgets) {
    return <p className='no-cards-found'>no cards found !!!</p>;
  }

  return (
    <section>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Column widgets={state.widgets["column-1"]} droppableId='column-1' />
          <Column widgets={state.widgets["column-2"]} droppableId='column-2' />
        </div>
      </DragDropContext>
      <div className='bottom-btn-wrapper'>
        <div className='save-btn-wrapper'>
          <button onClick={handleSubmit} className='save-btn'>
            {save ? "Saving..." : "Save"}
          </button>
          <button onClick={() => setGlobal(!global)} className='global-btn'>
            {global ? "Local" : "Global"}
          </button>
        </div>
        <button onClick={() => setView(!view)} className='view-more-btn'>
          {view ? "View Less" : "View More"}
        </button>
      </div>
    </section>
  );
}

export default CityCard;
