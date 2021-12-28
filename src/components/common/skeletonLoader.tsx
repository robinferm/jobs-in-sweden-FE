import Skeleton from "@mui/material/Skeleton";

const SkeletonLoader = () => {
  return (
      <div className="Card">
        <div className="CardTitle">
          <Skeleton height={25} />
        </div>
        <div className="CardDescription">
          <Skeleton height={50} />
        </div>
        <div className="CardPublicationDate">
          <Skeleton height={25} width={300} />
        </div>
      </div>
  );
};
export default SkeletonLoader;
