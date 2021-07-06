import React from "react";
import { useQuery, gql } from "@apollo/client";
import LaunchItem from "./LaunchItem";
import MissionKey from "./MissionKey";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

const Launches = () => {
  const { error, data, loading } = useQuery(LAUNCHES_QUERY);

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1 className="display-4 my-3">Launches</h1>
      <MissionKey />
      {loading && <h5>Loading...</h5>}
      {data &&
        data.launches.map((launches) => {
          return <LaunchItem key={launches.flight_number} launch={launches} />;
        })}
    </>
  );
};

export default Launches;
