import { JobListItemType } from "../lib/types";
import BookmarkIcon from "./BookmarkIcon";

export default function JobListItem({ jobItem, isActive }: JobListItemType) {
  const { badgeLetters, company, daysAgo, title, id } = jobItem;
  return (
    <li className={`job-item ${isActive && "job-item--active"}`}>
      <a className="job-item__link" href={`#${id}`}>
        <div className="job-item__badge">{badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{title}</h3>
          <p className="job-item__company">{company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon id={id} />
          <time className="job-item__time">{daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
