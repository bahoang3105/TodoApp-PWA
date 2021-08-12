<?php

class Project_User
{
    // database connection and table name
    private $conn;
    private $table_name = "project_user";

    // object properties
    public $projectID;
    public $userID;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // get Project of this user
    public function getProjectName() {
        $query = "SELECT project.projectID, projectName, project.status
                  FROM project
                  INNER JOIN project_user
                  ON project.projectID = project_user.projectID
                  WHERE userID = :userID;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':userID', $this->userID);

        if($stmt->execute()) {
            return $stmt;
        }
        else {
            return false;
        }
    }

    // add user into project
    public function addUser() {
        $query = "INSERT INTO " . $this->table_name . " (`projectID`, `userID`) VALUES (:projectID, :userID);";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':userID', $this->userID);
        $stmt->bindParam(':projectID', $this->projectID);

        if($stmt->execute()) {
            return $stmt;
        }
        else {
            return false;
        }
    }

    // get user in project
    public function getUserInProject() {
        $query = "SELECT DISTINCT user.userID, username
                    FROM project_user, user
                    WHERE projectID = :projectID AND user.userID = project_user.userID;";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':projectID', $this->projectID);

        if($stmt->execute()) {
            return $stmt;
        }
        else {
            return false;
        }
    }

    public function deleteProject() {
        $query = "DELETE FROM project_user WHERE projectID = :projectID;";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':projectID', $this->projectID);
        if($stmt->execute()) {
            $query = "DELETE FROM notification WHERE projectID = :projectID;";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':projectID', $this->projectID);
            if($stmt->execute()) {
                $query = "DELETE FROM project WHERE projectID = :projectID;";

                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':projectID', $this->projectID);
                if($stmt->execute()) {
                    return $stmt;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    //leave project
    public function leaveProject() {
        $query = "DELETE FROM project_user WHERE projectID = :projectID AND userID = :userID;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam('projectID', $this->projectID);
        $stmt->bindParam('userID', $this->userID);

        if($stmt->execute()) {
            $query = "DELETE FROM notification WHERE projectID = :projectID AND recvID = :userID;";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':projectID', $this->projectID);
            $stmt->bindParam('userID', $this->userID);

            if($stmt->execute()) {
                return $stmt;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}

?>
