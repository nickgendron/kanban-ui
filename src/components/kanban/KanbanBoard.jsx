import { useState, useEffect } from "react";
import EditWorkItemModal from "../Modals/EditWorkItemModal";
import ModalContent from "../Modals/ModalContent";
import { useSelector } from "react-redux";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import {
  useGetActiveBoardQuery,
  useUpdateBoardMutation,
  useUpdateCardMutation,
  useAddCardMutation,
  useAddColumnMutation,
  useDeleteCardMutation,
  useDeleteColumnMutation,
} from "../../api/ReduxApiHandler";
import TopBar from "../TopBar";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const AddColumnForm = (addNewColumn) => {
  const [columnName, setColumnName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (columnName.trim() === "") return;
    addNewColumn(columnName);
    setColumnName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Column Name"
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
      />
      <button type="submit">Add New Column</button>
    </form>
  );
};

export default function KanbanBoard() {
  const activeBoard = useSelector((state) => state.activeBoard.boardId);

  console.log(activeBoard);
  const { isLoading, data, isError, error } =
    useGetActiveBoardQuery(activeBoard);
  const [updateBoard] = useUpdateBoardMutation();
  const [updateCard] = useUpdateCardMutation();
  const [addCard] = useAddCardMutation();
  const [addColumn] = useAddColumnMutation();
  const [deleteCard] = useDeleteCardMutation();
  const [deleteColumn] = useDeleteColumnMutation();

  const [boardColumns, setColumns] = useState([]);
  const [showEditModal, setShowEditTaskModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [activeColumnId, setActiveColumnId] = useState(null);
const [newColumnName, setNewColumnName] = useState("");
  useEffect(() => {
    if (data) {
      setColumns(data.columns);
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    console.log("columns update triggered");
    const updatedBoard = {
      ...data,
      columns: boardColumns,
    };
    updateBoard({
      id: updatedBoard.boardId,
      data: updatedBoard,
    });
  }, [boardColumns]);

  if (isLoading) return <div>Loading...</div>;

  const handleCardUpdate = (updatedCard) => {
    updateCard({
      id: data.boardId,
      data: updatedCard,
    });
    setActiveCard(null);
    setShowEditTaskModal(false);
  };

  const handleNewCard = (newCard) => {
    setShowNewTaskModal(false);
    setActiveColumnId(null);
    addCard({
      id: data.boardId,
      data: newCard,
    });
  };

  const handleNewColumn = (columnName) => {
    addColumn({
      id: data.boardId,
      data: columnName,
    });
  };

  const handleDeleteColumn = (columnId) => {
    deleteColumn({
      boardId: data.boardId,
      columnId: columnId,
    });
  };

  const handleDeleteCard = (columnId, cardId) => {
    deleteCard({
      id: data.boardId,
      data: columnId,
      cardId: cardId,
    });
  };
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceColumn = { ...boardColumns[source.droppableId] };
    const destColumn = { ...boardColumns[destination.droppableId] };

    const sourceItems = [...sourceColumn.cards];
    const destItems = [...destColumn.cards];
    const [removed] = sourceItems.splice(source.index, 1);

    const updatedCard = { ...removed, containerId: destination.droppableId };

    destItems.splice(destination.index, 0, updatedCard);

    const updatedColumns = {
      ...boardColumns,
      [source.droppableId]: {
        ...sourceColumn,
        cards: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        cards: destItems,
      },
    };

    setColumns(updatedColumns);
  };

  return (
    <>
      <div className=" flex-col">
        {/* <TopBar /> */}
        <div className="flex h-1/2">
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            {Object.entries(boardColumns).map(([columnId, column]) => {
              return (
                <div key={columnId} className=" ml-4 mt-6 border h-1/2">
                  <div className={`  pl-3 pt-4 pr-3 border  rounded-lg`}>
                    <div className="flex justify-between pl-8 items-center">
                      <h2 className="dark:text-Primary underline font-bold text-2xl pb-4">
                        {column.name}
                      </h2>
                      <div className="flex justify-end relative ">
                        <Menu
                          menuButton={
                            <MenuButton>&#x2022; &#x2022; &#x2022;</MenuButton>
                          }
                          transition
                        >
                          <MenuItem>Rename Column</MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleDeleteColumn(columnId);
                            }}
                          >
                            <h1 className="text-red-500">Delete column</h1>
                          </MenuItem>
                        </Menu>
                      </div>
                    </div>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        const droppableHeight = snapshot.isDraggingOver
                          ? Math.min(300 + 50, window.innerHeight * 0.8)
                          : 200;

                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`overflow-y-auto overflow-x-hidden scroll-utilities pl-6 pb-4  ${
                              snapshot.isDraggingOver
                                ? "bg-gray-200 h-${}[droppableHeight]"
                                : ""
                            }`}
                            style={{
                              transition: "height 3.0s linear",
                              width: 350,
                              maxHeight: "74vh",
                              minHeight: droppableHeight,
                            }}
                          >
                            {column.cards.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.cardId}
                                  draggableId={item.cardId}
                                  index={index}
                                >
                                  {(provided) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          ...provided.draggableProps.style,
                                        }}
                                        className="dark:bg-BG_Secondary bg-white mr-6 p-4 mt-4 rounded-xl border overflow-visible drop-shadow-md hover:border-2"
                                        onClick={() => {
                                          setActiveCard(item);
                                          setShowEditTaskModal(true);
                                        }}
                                      >
                                        <h1 className="dark:text-Text_Primary text-xl text-black">
                                          {item.cardTitle}
                                        </h1>

                                        <br />
                                        <p className="text-Text_Secondary">
                                          {item.cardDescription}
                                        </p>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                    <div
                      className="mb-3 border flex cursor-pointer justify-center pb-2 pt-2 hover:bg-blue-200 hover:shadow-lg hover:border hover:dark:bg-BG_Secondary rounded-md"
                      onClick={() => {
                        console.log(columnId);
                        setActiveColumnId(columnId);
                        setShowNewTaskModal(true);
                      }}
                    >
                      <h1 className="dark:text-white">Add new task</h1>
                    </div>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
          <div>
            {showEditModal && (
              <EditWorkItemModal
                item={activeCard}
                onUpdate={handleCardUpdate}
                onOutsideClick={() => setShowEditTaskModal(false)}
              />
            )}
            {showNewTaskModal && (
              <ModalContent
                columnId={activeColumnId}
                onSave={handleNewCard}
                onOutsideClick={() => setShowNewTaskModal(false)}
              />
            )}
          </div>
          <div>{/* <DatePicker /> */}</div>
        </div>
        <div className="flex space-x-5 justify-center pt-10">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            onBlur={(e) => setNewColumnName(e.target.value)}
          />
          <button className="btn" onClick={() => handleNewColumn(newColumnName)}>Add Column</button>
        </div>
      </div>
    </>
  );
}
