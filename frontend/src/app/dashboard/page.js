import Link from "next/link";
import JobsList from "./getJobs";

const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center align-middle items-center">
      <h1 className="font-medium text-4xl ">All Jobs</h1>
      <JobsList />
      <Link href="./dashboard/create">
        <button className="btn btn-active btn-neutral">Add New Jobs </button>
      </Link>
    </div>
  );
};

export default Dashboard;
