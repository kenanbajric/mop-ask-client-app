import React, { useEffect, useState, useContext } from "react";
import { Card, Button, Row } from "react-bootstrap";

import LoginContext from "../storage/login-context";
import ChangePasswordModal from "../components/ChangePasswordModal";
import EditUserModal from "../components/EditUserModal";

const MyProfile = () => {
  const [myProfile, setMyProfile] = useState({});

  // Handling Password Change Modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const handleClosePasswordModal = () => setShowPasswordModal(false);
  const handleShowPasswordModal = () => setShowPasswordModal(true);

  // Handling Edit User Modal
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const handleCloseEditUserModal = () => setShowEditUserModal(false);
  const handleShowEditUserModal = () => setShowEditUserModal(true);

  // Login
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
            <Button
              className="mt-2 col-8 mx-auto"
              variant="primary"
              onClick={handleShowEditUserModal}
            >
              Edit information
            </Button>
          </Row>
          <Row>
            <Button
              className="mt-2 col-8 mx-auto"
              variant="danger"
              onClick={handleShowPasswordModal}
            >
              Change password
            </Button>
          </Row>
        </Card.Body>
      </Card>

      {/* Modal  */}
      <ChangePasswordModal
        show={showPasswordModal}
        handleClose={handleClosePasswordModal}
      />
      <EditUserModal
        show={showEditUserModal}
        handleClose={handleCloseEditUserModal}
        firstName={myProfile.first_name}
        lastName={myProfile.last_name}
        email={myProfile.email}
      />
    </div>
  );
};

export default MyProfile;
