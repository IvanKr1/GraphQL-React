import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = (props) => {
  let { flight_number } = props.match.params;
  flight_number = parseInt(flight_number);

  const { error, data, loading } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number },
  });

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {loading && <h4>Loading...</h4>}
      {data && (
        <div>
          <h1 className="display-4 my-3">
            <span className="text-dark">
              Mission: {data.launch.mission_name}
            </span>
          </h1>
          <h4 className="mb-3">Launch Details</h4>
          <ul className="list-group">
            <li className="list-group-item">Flight Number: {flight_number}</li>
            <li className="list-group-item">
              Launch Year: {data.launch.launch_year}
            </li>
            <li className="list-group-item">
              Launch Successful:{" "}
              {data.launch.launch_success ? (
                <span className="text-success">Yes</span>
              ) : (
                <span className="text-danger">No</span>
              )}
            </li>
            <h4 className="my-3">
                Rocket Details
            </h4>
            <ul className="list-group">
                <li className="list-group-item">Rocket ID: {data.launch.rocket_id}</li>
                <li className="list-group-item">Rocket Name: {data.launch.rocket_name}</li>
                <li className="list-group-item">Rocket Type: {data.launch.rocket_type}</li>
            </ul>
          </ul>
          <hr />
          <Link to="/" className="btn btn-secondary">Back</Link>
        </div>
      )}
    </>
  );
};

export default Launch;
