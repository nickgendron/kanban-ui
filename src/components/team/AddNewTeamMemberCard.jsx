import Model from "../Modals/Modal";
import uuid from "react-uuid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddUserToTeamMutation } from "../../api/ReduxApiHandler";
export default function NewTeamMemberCard() {
  const [displayModal, setDisplayModal] = useState(false);
  const [memberFirstName, setMemberFirstName] = useState("");
  const [memberLastName, setMemberLastName] = useState("");
  const [memberJobTitle, setMemberJobTitle] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const activeTeamId = useSelector((state) => state.activeTeam.team);

  const [addUser] = useAddUserToTeamMutation();  
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedEmail = memberEmail.trim();
    // if (memberName.trim() === "") return;
    // addNewTeam(teamName, teamDescription);
    const internalUserId = uuid();
    const payload = {
      teamId: activeTeamId,
      teamMember: {
        firstName: memberFirstName,
        lastName: memberLastName,
        jobTitle: memberJobTitle,
        email: trimmedEmail,
        internalUserId: uuid(),
      },
    };
    console.log(payload);

    addUser(payload);

    setMemberFirstName("");
    setMemberLastName("");
    setMemberJobTitle("");
    setMemberEmail("");

    setDisplayModal(false);
    // console.log(res);
  };
  return (
    <>
     <div className="bg-white rounded-xl shadow-lg p-3 mb-4 h-58">
        <div
          className="bg-blue-100 rounded-xl shadow-lg border  h-full cursor-pointer text-center items-center justify-center flex "
          onClick={() => setDisplayModal(true)}
        >
          <div className="flex flex-row items-center space-x-3">
            <h1 className="text-gray-600 text-2xl">&#8853;</h1>
            <h1 className="text-gray-600 font-bold">Add New Team Member</h1>

          </div>
        </div>
      </div>
      {displayModal && (
        <Model onOutsideClick={() => setDisplayModal(false)}>
          <div className="bg-white shadow-xl w-1/3 h-1/3 rounded-xl ">
            <div className="m-10 ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                Add a new team member
              </h1>
              <form className="items-center">
                <div className="mx-auto  items-center justify-center">
                  <div className="grid grid-rows-1 grid-flow-col gap-1 space-x-8 mt-4 mb-4">
                    <div>
                      {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" /> */}
                      <h1>First Name</h1>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="First Name"
                        // value={firstName}
                        onChange={(event) => {
                          setMemberFirstName(event.target.value);
                        }}
                        required
                      ></input>
                    </div>

                    <div>
                      <h1>Last Name</h1>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Last Name"
                        // value={lastName}
                        onChange={(event) => {
                          setMemberLastName(event.target.value);
                        }}
                        required
                      ></input>
                    </div>
                  </div>
                  <h1 className="mb-4">Job Title</h1>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
                    placeholder="Job Title"
                    // value={teamDescription}
                    onChange={(event) => {
                      setMemberJobTitle(event.target.value);
                    }}
                    required
                  />
                  <h1 className="mb-4">Email</h1>

                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Email"
                    type="email"
                    // value={teamDescription}
                    onChange={(event) => {
                      setMemberEmail(event.target.value);
                    }}
                    required
                  />
                  <br />
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className=" bg-blue-500 h-10 rounded-lg mt-6 w-full font-bold"
                  >
                    Create Teammate
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
