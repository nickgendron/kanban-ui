import TopBar from "../components/TopBar";
import TeamsDisplay from "../components/team/TeamsDisplay";
import ProjectDisplay from "../components/project/ProjectDisplay";

export default function Home() {
  return (
    <div className="grid justify-items-center gap-4 pt-5">
      {/* <TopBar /> */}
      <div className="space-y-20  w-1/2">
        <TeamsDisplay />

        <ProjectDisplay />
      </div>
    </div>
  );
}
