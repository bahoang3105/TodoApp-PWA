<?php

class User
{
    // database connection and table name
    private $conn;
    private $table_name = "user";

    // object properties
    public $userID;
    public $username;
    public $password;
    public $other;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // check if the account exists or not
    public function login()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE username = :username AND password = :password";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':password', $this->password);

        if ($stmt->execute()) {
            return $stmt;
        } else {
            return false;
        }
    }

    // check if the account name is already in use
    public function signup()
    {
        $query = "SELECT username FROM " . $this->table_name . " WHERE username = :username";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $this->username);


        if ($stmt->execute()) {
            return $stmt;
        } else {
            return false;
        }
    }

    // add Account to database if the account name is not exist 
    public function addAcc()
    {
        $numAcc = time();

        $queryAdd = "INSERT INTO `user`(`userID`, `username`, `password`) VALUES ('$numAcc', :username, :password)";
        $this->userID = time();

        $queryAdd = "INSERT INTO `user`(`userID`, `username`, `password`) VALUES (:userID, :username, :password)";

        $stmt = $this->conn->prepare($queryAdd);
        $stmt->bindParam(':userID', $this->userID);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':password', $this->password);
        if ($stmt->execute()) {
            return $stmt;
        } else {
            return false;
        }
    }

    //search User
    public function searchUser() {
        $query = "SELECT DISTINCT user.userID, username 
                  FROM user
                  WHERE username LIKE :username 
                  AND NOT EXISTS (
                      SELECT project_user.userID
                      FROM project_user
                      WHERE projectID = :projectID
                      AND user.userID = project_user.userID
                  );";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':projectID', $this->other);

        if ($stmt->execute()) {
            return $stmt;
        }
        else {
            return false;
        }
    }

    // insert user to project
    public function insertUser() {
        $query = "INSERT INTO `project_user`(`projectID`, `userID`) VALUES (:projectID, (
                        SELECT userID FROM user WHERE username = :username));";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':projectID', $this->other);

        if ($stmt->execute()) {
            return $stmt;
        }
        else {
            return false;
        }
    }

    //assign task to user
    public function assignUser() {
        $query = "UPDATE `task` SET `assignee`= (SELECT userID FROM user WHERE username = :assignee) WHERE taskID = :task_id;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':assignee', $this->username);
        $stmt->bindParam(':task_id', $this->other);

        if ($stmt->execute()) {
        return $stmt;
        }
        else {
        return false;
        }
    }
}
