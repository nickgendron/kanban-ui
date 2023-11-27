export default function TopBar() {
  const user = {
    name: "Nicholas Gendron",
    email: "jdoe@kanban.com",
    jobTitle: "Software Engineer",
    imageUri: "https://i.pravatar.cc/300",
  };
  return (
    <div className="bg-blue-500 rounded-xl bor w-full flex flex-row justify-between">
      <div>
        <h1>here</h1>
      </div>
      <div className="bghite roundd-xl h-16 flex justify-end p-3 items-center space-x-4 shadow-lg">
        <div className="flex flex-col justify-end">
          <h1 className="text-xl">{user.name}</h1>
          <p className="text-right">{user.jobTitle}</p>
        </div>
        <img
          src={user.imageUri}
          className="rounded-full h-14"
          alt="user avatar"
        />
      </div>
    </div>
  );
}
