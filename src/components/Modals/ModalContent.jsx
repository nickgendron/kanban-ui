import Modal from "./Modal";
import { useState } from "react";
import uuid from "react-uuid";

// import { Dialog, Transition, Menu, Listbox } from "@headlessui/react";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
// import Image from "next/image";
// interface ModalContentProps {
//   isVisible: boolean;
//   columnId: string;
//   onClose: () => void;
//   onSubmit: (
//     taskTitle: string,
//     taskDescription: string,
//     columnId: string
//   ) => void;
// }
// const options = [
//   { name: "Wade Cooper" },
//   { name: "Arlene Mccoy" },
//   { name: "Devon Webb" },
//   { name: "Tom Cook" },
//   { name: "Tanya Fox" },
//   { name: "Hellen Schmidt" },
// ];

const ModalContent = ({ columnId, onSave, onOutsideClick }) => {
  // if (!isVisible) return null;

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  // const clearState = () => {
  //   setTaskTitle("");
  //   setTaskDescription("");
  // };

  // const handleTaskTitleChange = (e) => {
  //   e.preventDefault();
  //   setTaskTitle(e.target.value);
  // };

  // const handleTaskDescriptionChange = (
  //   e
  // ) => {
  //   e.preventDefault();
  //   setTaskDescription(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCardId = uuid();
    const newCard = {
      cardId: newCardId,
      cardTitle: taskTitle,
      cardDescription: taskDescription,
      containerId: columnId,
    };

    onSave(newCard);
  };

  return (
    <>
      <Modal onOutsideClick={onOutsideClick}>
        <div
          className=" bg-gray-100 dark:bg-Dark  border-Text_Secondary p-6 rounded-3xl cursor-pointer"
          id="modal-wrapper"
        >
          <div className="flex justify-between">
            <h1 className=" dark:text-Text_White text-black font-semibold ">
              Add Task
            </h1>
          </div>
          <div className="shadow-xl dark:bg-BG_Primary bg-white rounded-2xl flex m-10">
            <div className="border-Border rounded-lg p-4">
              <h1 className="text-2xl dark:text-Primary font-semibold text-black">
                Task Information
              </h1>
              <br />
              <form>
                <p className="dark:text-Text_White text-gray-400">Task name:</p>
                <input
                  type="text"
                  required
                  placeholder="Task name"
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="textarea w-[480px] bg-gray-100 dark:bg-BG_Primary mb-3 mt-3 shadow-inner dark:border-Border"
                />
                <p className="dark:text-Text_White text-gray-400">
                  Task Description:
                </p>
                <textarea
                  className="textarea  w-[480px] bg-gray-100 dark:bg-BG_Primary mb-3 mt-3 shadow-inner dark:border-Border"
                  placeholder="Description"
                  required
                  onChange={(e) => setTaskDescription(e.target.value)}
                ></textarea>
                <button
                  className="btn btn-block bg-blue-500 text-Text_White"
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
export default ModalContent;
