<?php

class Project
{
    // database connection and table name
    private $conn;
    private $table_name = "project";

    // object properties
    public $projectID;
    public $projectName;
    public $status;

    // constructor with $db as database connection
    public function __construct($db)
    {
         $this->conn = $db;
    }

    // get project name
    public function getProjectName() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE projectID = :projectID;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':projectID', $this->projectID);

        if($stmt->execute()) {
            return $stmt;
        }
        else {
            return false;
        }
    }

    // get task in project
    public function getTask() {
        $query = "SELECT DISTINCT taskID, content, deadline, status, IF(assignee IS NULL, NULL, user.username)
                  FROM task, user
                  WHERE projectID = :projectID
                  AND (assignee IS NULL OR user.userID = assignee)
                  ORDER BY deadline;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':projectID', $this->projectID);

        if($stmt->execute()) {
            return $stmt;
        }
        else {
            return false;
        }
    }

    // edit project name
    public function editProjectName() {
        $query = "UPDATE " . $this->table_name . " SET projectName = :projectName WHERE projectID = :projectID;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':projectName', $this->projectName);
        $stmt->bindParam(':projectID', $this->projectID);

        if($stmt->execute()) {
            return $stmt;
        }
        else {
            return false;
        }
    }

    // add new project
    public function addNewProject() {
        $query = "INSERT INTO " . $this->table_name . " (`projectID`, `projectName`) VALUES (:projectID, :projectName);";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':projectName', $this->projectName);
        $stmt->bindParam(':projectID', $this->projectID);

        if($stmt->execute()) {
            return $stmt;
        }
        else {
            return false;
        }
    }
    
    // complete Project
    public function completeProj() {
        $query = "UPDATE project SET status = (status XOR 1)  WHERE projectID = :projectID";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':projectID', $this->projectID);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
?>