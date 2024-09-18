import { useActiveJobContent } from "../lib/hooks";
import BookmarkIcon from "./BookmarkIcon";
import Spinner from "./Spinner";

export default function JobItemContent() {
  const { activeJobContent, isLoading } = useActiveJobContent();

  if (isLoading) return <LoadingJobContent />;
  if (!activeJobContent) return <EmptyJobContent />;

  return (
    <section className="job-details">
      <div>
        <img src={activeJobContent.coverImgURL} alt="#" />

        <a className="apply-btn" href={activeJobContent.companyURL} target="_blank">
          Apply
        </a>

        <section className="job-info">
          <div className="job-info__left">
            <div className="job-info__badge">{activeJobContent.badgeLetters}</div>
            <div className="job-info__below-badge">
              <time className="job-info__time">2d</time>

              <BookmarkIcon id={activeJobContent.id} />
            </div>
          </div>

          <div className="job-info__right">
            <h2 className="second-heading">{activeJobContent.title}</h2>
            <p className="job-info__company">{activeJobContent.company}</p>
            <p className="job-info__description">{activeJobContent.description}</p>
            <div className="job-info__extras">
              <p className="job-info__extra">
                <i className="fa-solid fa-clock job-info__extra-icon"></i>
                {activeJobContent.duration}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                {activeJobContent.salary}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
                {activeJobContent.location}
              </p>
            </div>
          </div>
        </section>

        <div className="job-details__other">
          <section className="qualifications">
            <div className="qualifications__left">
              <h4 className="fourth-heading">Qualifications</h4>
              <p className="qualifications__sub-text">Other qualifications may apply</p>
            </div>
            <ul className="qualifications__list">
              {activeJobContent.qualifications.map((item) => (
                <li className="qualifications__item" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="reviews">
            <div className="reviews__left">
              <h4 className="fourth-heading">Company reviews</h4>
              <p className="reviews__sub-text">Recent things people are saying</p>
            </div>
            <ul className="reviews__list">
              {activeJobContent.reviews.map((item) => (
                <li className="reviews__item" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="job-details__footer">
          <p className="job-details__footer-text">
            If possible, please reference that you found the job on{" "}
            <span className="u-bold">rmtDev</span>, we would really appreciate it!
          </p>
        </footer>
      </div>
    </section>
  );
}

function EmptyJobContent() {
  return (
    <section className="job-details">
      <div>
        <div className="job-details__start-view">
          <p>What are you looking for?</p>
          <p>Start by searching for any technology your ideal job is working with</p>
        </div>
      </div>
    </section>
  );
}

function LoadingJobContent() {
  return (
    <section className="job-details">
      <div>
        <Spinner />
      </div>
    </section>
  );
}
