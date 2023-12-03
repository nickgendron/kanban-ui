import Modal from "./Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDeleteCardMutation } from "../../api/ReduxApiHandler";
const EditWorkItemModal = ({ item, onUpdate, onOutsideClick }) => {
  // const item = useSelector((state) => state.activeCard.card);
  const [newTitle, setNewTitle] = useState(item.cardTitle);
  const [newDescription, setNewDescription] = useState(item.cardDescription);

  const [deleteCard] = useDeleteCardMutation();
  const activeBoard = useSelector((state) => state.activeBoard.boardId);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newActiveCard = {
      cardId: item.cardId,
      cardTitle: newTitle,
      cardDescription: newDescription,
      containerId: item.containerId,
    };
    onUpdate(newActiveCard);
  };

  const handleDeleteCard = () => {
    deleteCard({
      boardId: activeBoard,
      containerId: item.containerId,
      cardId: item.cardId,
    });
    onOutsideClick();
  };
  return (
    <>
      <Modal onUpdate={onUpdate} onOutsideClick={onOutsideClick}>
        <div className=" bg-gray-100 dark:bg-Dark  border-Text_Secondary p-6 rounded-3xl cursor-">
          <div className="flex justify-between">
            <h1 className="dark:text-Text_White text-black font-semibold">
              Edit Task
            </h1>
          </div>
          <div className="shadow-xl dark:bg-BG_Primary bg-white rounded-2xl flex m-3">
            <div className="   border-Border rounded-lg  p-4">
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-2xl dark:text-Primary font-semibold text-black">
                  Task Information
                </h1>
                <div className=" cursor-pointer" onClick={handleDeleteCard}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="red"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </div>
              </div>
              <br />
              <form>
                <p className="dark:text-Text_White text-gray-400">Task name:</p>
                <input
                  type="text"
                  required
                  defaultValue={item.cardTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="textarea w-[480px] h-10 bg-gray-100 dark:bg-BG_Primary mb-3 mt-3 shadow-inner dark:border-Border rounded-lg pr-1 pl-2"
                />
                <p className="dark:text-Text_White text-gray-400">
                  Task Description:
                </p>
                <textarea
                  className="textarea w-[480px] bg-gray-100 dark:bg-BG_Primary mb-3 mt-3 shadow-inner dark:border-Border pr-1 pl-2 rounded-lg"
                  placeholder="Description"
                  defaultValue={item.cardDescription}
                  required
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <button
                  className="btn btn-block bg-blue-500 text-Text_White"
                  // type="submit"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default EditWorkItemModal;
