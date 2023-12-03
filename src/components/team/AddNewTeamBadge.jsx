import { useState } from "react";
import Model from "../Modals/Modal";
import { useCreateTeamMutation } from "../../api/ReduxApiHandler";
export default function AddNewTeamBadge() {
  const [displayModal, setDisplayModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");

  const [addNewTeam] = useCreateTeamMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamName.trim() === "") return;

    const payload = {
      teamName: teamName,
      teamDescription: teamDescription,
    };

    addNewTeam(payload);

    setTeamName("");
    setTeamDescription("");
    setDisplayModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-3 h-36 ">
        <div
          className="bg-blue-100 rounded-xl shadow-lg border  h-full cursor-pointer text-center items-center justify-center flex "
          onClick={() => setDisplayModal(true)}
        >
          <div className="flex flex-row items-center space-x-3">
            <h1 className="text-gray-600 text-2xl">&#8853;</h1>
            <h1 className="text-gray-600 font-bold">Add New</h1>
          </div>
        </div>
      </div>
      {displayModal && (
        <Model onOutsideClick={() => setDisplayModal(false)}>
          <div className="bg-white shadow-xl w-1/3 h-fit rounded-xl ">
            <div className="m-10 ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                Create a new team
              </h1>
              <form className="items-center">
                <div className="mx-auto ">
                  <h1 className="mb-4">Team name</h1>

                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
                    placeholder="Team name"
                    value={teamName}
                    onChange={(event) => {
                      setTeamName(event.target.value);
                    }}
                    required
                  ></input>

                  <h1 className="mb-4">Team description</h1>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="team description"
                    value={teamDescription}
                    onChange={(event) => {
                      setTeamDescription(event.target.value);
                    }}
                    required
                  />
                  <br />
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className=" bg-blue-500 h-10 rounded-lg mt-6 w-full font-bold"
                  >
                    Create Team
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Model>
      )}
    </>
  );
}
