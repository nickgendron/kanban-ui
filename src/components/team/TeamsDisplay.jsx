import {useState, useEffect} from "react";
import TeamBadge from "./TeamBadge";
import AddNewTeamBadge from "./AddNewTeamBadge";
import { useGetTeamsQuery } from "../../api/ReduxApiHandler";


export default function  TeamsDisplay() {
  const { data, isLoading } = useGetTeamsQuery();

  const [teamDataLocal, setTeamData] = useState([])

  useEffect(() => {
    if (data) {
      setTeamData(data);
      console.log(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-6xl font-bold">Teams</h1>
      <div className="pt-2 grid grid-cols-3 gap-4">
        {teamDataLocal.map((team, index) => (
          <TeamBadge key={index} team={team} />
        ))}
          <AddNewTeamBadge />
      </div>
    </div>
  );
}


