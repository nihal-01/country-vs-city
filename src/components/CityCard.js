import React from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { useGlobalContext } from "../context/context";

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
          <div className='single-card-text'>
            <p>{widget.text}</p>
          </div>
          <p className='index-text'>{index + 1}</p>
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

const getLoaclStorage = (viewMore) => {
  if (localStorage.getItem("city")) {
    let dt = localStorage.getItem("city");
    if (viewMore) {
      return JSON.parse(dt);
    } else {
      let array = JSON.parse(dt)["column-1"].slice(0, 10);
      let newObj = { "column-1": array, "column-2": [] };
      return newObj;
    }
  } else {
    return [];
  }
};

function CityCard({ data }) {
  const {
    saveCity,
    cityData,
    setView,
    viewMore,
    save,
    setSaving,
    settingGlobal,
    global,
  } = useGlobalContext();

  const [state, setState] = React.useState({
    widgets: global ? data : getLoaclStorage(viewMore),
  });

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
        ? viewMore
          ? cityData
          : getShowLessList(cityData)
        : getLoaclStorage(viewMore),
    });
  }, [cityData, global, viewMore]);

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
    if (save === true) {
      let value = "city";
      saveCity(state.widgets, value);
      if (state.widgets) {
        if (state.widgets["column-1"]) {
          var nitems = state.widgets["column-1"].filter((item) => {
            return item.spam_score < 2;
          });
        }

        let localItem = { "column-1": nitems, "column-2": [] };
        localStorage.setItem(value, JSON.stringify(localItem));
      }
    }
  };

  let isSave = save === true;

  React.useEffect(() => {
    handleSubmit();
  }, [isSave]);

  React.useEffect(() => {
    const timout = setTimeout(() => {
      setSaving(false);
    }, 1000);
    return () => clearTimeout(timout);
  }, [isSave]);

  if (!state.widgets) {
    return (
      <section>
        <p className='no-cards-found'>no cards found !!!</p>
        <div className='bottom-btn-wrapper'>
          <div className='save-btn-wrapper'>
            <button onClick={() => setSaving(true)} className='save-btn'>
              {save ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => settingGlobal(!global)}
              className='global-btn'>
              {global ? "Local" : "Global"}
            </button>
          </div>
          <button onClick={() => setView(!viewMore)} className='view-more-btn'>
            {viewMore ? "View Less" : "View More"}
          </button>
        </div>
      </section>
    );
  }

  if (state.widgets) {
    return (
      <section>
        <DragDropContext onDragEnd={onDragEnd}>
          <div>
            <Column
              widgets={state.widgets["column-1"]}
              droppableId='column-1'
            />
            <Column
              widgets={state.widgets["column-2"]}
              droppableId='column-2'
            />
          </div>
        </DragDropContext>
        <div className='bottom-btn-wrapper'>
          <div className='save-btn-wrapper'>
            <button onClick={() => setSaving(true)} className='save-btn'>
              {save ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => settingGlobal(!global)}
              className='global-btn'>
              {global ? "Local" : "Global"}
            </button>
          </div>
          <button onClick={() => setView(!viewMore)} className='view-more-btn'>
            {viewMore ? "View Less" : "View More"}
          </button>
        </div>
      </section>
    );
  }
}

export default CityCard;
