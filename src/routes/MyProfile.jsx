import React, { useEffect, useState, useContext } from "react";
import LoginContext from "../storage/login-context";
import { Card, Button, Row } from "react-bootstrap";

import CustomModal from "../components/CustomModal";

const MyProfile = () => {
  const [myProfile, setMyProfile] = useState({});

  // Handling Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loginCtx = useContext(LoginContext);
  useEffect(() => {
    const token = loginCtx.sendToken();
    const fetchMyProfile = async () => {
      const response = await fetch("http://localhost:5000/home/my-profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const responseData = await response.json();

      setMyProfile(responseData.data.user);
    };
    fetchMyProfile();
  }, [loginCtx]);

  return (
    <div className="d-flex justify-content-center mt-4">
      <Card className="col-md-4 col-sm-6 col-12">
        <Card.Body>
          <Card.Title className="text-center">
            {myProfile.first_name + " " + myProfile.last_name}
          </Card.Title>
          <Card.Text className="text-center">{myProfile.email}</Card.Text>
          <Card.Text className="text-center">
            Number of answers: {myProfile.number_of_answers}
          </Card.Text>
          <Row>
            <Button className="mt-2 col-8 mx-auto" variant="primary">
              Edit
            </Button>
          </Row>
          <Row>
            <Button
              className="mt-2 col-8 mx-auto"
              variant="danger"
              onClick={handleShow}
            >
              Change password
            </Button>
          </Row>
        </Card.Body>
      </Card>

      {/* Modal  */}
      <CustomModal show={show} handleClose={handleClose} />
    </div>
  );
};

export default MyProfile;
