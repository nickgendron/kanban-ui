import { useState, useEffect } from "react";
import Model from "../Modals/Modal";
import { useCreateNewBoardMutation } from "../../api/ReduxApiHandler";
import { useGetTeamsQuery } from "../../api/ReduxApiHandler";
export default function AddNewTeamBadge() {
  const [displayModal, setDisplayModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");

  const { data, isLoading } = useGetTeamsQuery();

  const [teamDataLocal, setTeamData] = useState([]);

  useEffect(() => {
    if (data) {
      setTeamData(data);
      console.log(data);
      const teamNames = data.map((team) => team.teamName);

      console.log(teamNames);
    }
  }, [data]);

  const [newBoard] = useCreateNewBoardMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim() === "") return;

    const payload = {
      boardName: projectName,
      boardDescription: projectDescription,
      teamId: selectedTeamId,
    };
    console.log(payload);
    newBoard(payload);

    setProjectName("");
    setProjectDescription("");
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
          <div className="bg-white shadow-xl w-1/3 h-1/3 rounded-xl ">
            <div className="m-10 ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                Create a new project
              </h1>
              <form className="items-center">
                <div className="mx-auto ">
                  <h1 className="mb-4">Project name</h1>

                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
                    placeholder="Project name"
                    value={projectName}
                    onChange={(event) => {
                      setProjectName(event.target.value);
                    }}
                    required
                  ></input>

                  <h1 className="mb-4">Project description</h1>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Project description"
                    value={projectDescription}
                    onChange={(event) => {
                      setProjectDescription(event.target.value);
                    }}
                    required
                  />
                  <br />
                  <h1>Which team is this project for?</h1>
                  <br />
                  <select
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) => setSelectedTeamId(e.target.value)}
                    defaultValue="" // Use defaultValue instead of selected for the default option
                    required={true}
                  >
                    <option disabled value="">
                      Choose team
                    </option>
                    {teamDataLocal.map((team, index) => (
                      <option key={index} value={team.teamId}>
                        {team.teamName}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className=" bg-blue-500 h-10 rounded-lg mt-6 w-full font-bold"
                  >
                    Create project
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
