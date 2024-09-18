import { useActiveIdContext } from "../lib/hooks";
import { JobListType } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export default function JobList({ jobItems, isLoading }: JobListType) {
  const { activeId } = useActiveIdContext();
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((item) => (
          <JobListItem jobItem={item} key={item.id} isActive={activeId === item.id} />
        ))}
    </ul>
  );
}
