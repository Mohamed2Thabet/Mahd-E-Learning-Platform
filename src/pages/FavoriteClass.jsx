import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar } from "react-icons/fa";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const classes = [
  {
    id: 1,
    title: "Logo Branding Guideline",
    description: "Your trusted resource for maintaining consistent and impactful logo representation",
    rating: 5.0,
    lessons: 20,
  },
  {
    id: 2,
    title: "Movie Maker",
    description: "Unleash your creativity and produce stunning videos with our step-by-step guideline",
    rating: 4.8,
    lessons: 22,
  },
  {
    id: 3,
    title: "UI Wireframe and Flow",
    description: "Our comprehensive guideline is your roadmap to crafting seamless and user-friendly digital experiences.",
    rating: 4.8,
    lessons: 10,
  },
];

const FavoriteClass = ({ isLoading }) => {
  return (
    <SkeletonTheme baseColor="#E0E0E0" highlightColor="#F5F5F5">
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">Favorite Class</h2>
        <div className="row">
          {classes.map((course) => (
            <div key={course.id} className="col-md-4">
              <div className="card p-3 shadow-sm">
                {isLoading ? (
                  <Skeleton height={150} borderRadius={8} />
                ) : (
                  <div className="bg-secondary" style={{ height: 150, borderRadius: 8 }}></div>
                )}
                <div className="mt-3">
                  <h5>{isLoading ? <Skeleton width={200} /> : course.title}</h5>
                  <p className="text-muted">
                    {isLoading ? <Skeleton count={2} /> : course.description}
                  </p>
                  <div className="d-flex align-items-center">
                    <FaStar className="text-warning" />
                    <span className="ms-1">{isLoading ? <Skeleton width={30} /> : course.rating}</span>
                    <span className="ms-3 text-success">{isLoading ? <Skeleton width={50} /> : `${course.lessons} Lessons`}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-success">Show All Class</button>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default FavoriteClass;