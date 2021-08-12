<?php

class Notification
{
    // database connection and table name
    private $conn;
    private $table_name = "notification";

    // object properties
    public $notificationID;
    public $sendName;
    public $recvName;
    public $projectName;
    public $time;
    public $status;
    public $isRead;
    public $action;
    public $taskID;

    // constructor with $db as database connection
    public function __construct($db)
    {
         $this->conn = $db;
    }

    // get notification
    public function getNotification() {
        $query = "SELECT notificationID, username as sendName, proj.projectName, time, notification.status, isRead, action, content
                  FROM notification
                  INNER JOIN user
                  ON userID = sendID
                  INNER JOIN project proj
                  ON proj.projectID = notification.projectID
                  LEFT JOIN task
                  ON notification.taskID = task.taskID
                  WHERE recvID = :recvID
                  ORDER BY time DESC;";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":recvID", $this->recvName);
        
        if($stmt->execute()) {
            return $stmt;
        }
        else {
            return false;
        }
    }

    // agree invite to join project
    public function agreeInvite() {
        // update notification
        $query = "UPDATE notification SET status = 1 WHERE recvID = :recv and notificationID = :notificationID;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':recv', $this->recvName);
        $stmt->bindParam(':notificationID', $this->notificationID);
        $stmt->execute();
            
        // find projectID
        $query = "SELECT projectID FROM notification WHERE notificationID = :notificationID;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':notificationID', $this->notificationID);
        $stmt->execute();
        $this->projectName = $stmt->fetchAll()[0][0];

        // insert user into project
        $query = "INSERT INTO project_user (`projectID`, `userID`) VALUES (:projectID, :userID);";
        $stmt1 = $this->conn->prepare($query);
        $stmt1->bindParam(':userID', $this->recvName);
        $stmt1->bindParam(':projectID', $this->projectName);
        $stmt1->execute();
               
        return $this->projectName;
    }

    // deni invite to join project
    public function cancelInvite() {
        $query = "UPDATE notification SET status = 2 WHERE recvID = :recv and notificationID = :notificationID;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':recv', $this->recvName);
        $stmt->bindParam(':notificationID', $this->notificationID);
        $stmt->execute();
        
        $query = "SELECT sendID, projectID FROM notification WHERE notificationID = :notificationID;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':notificationID', $this->notificationID);
        $stmt->execute();

        return $stmt->fetchAll()[0];
    }

    // create a notification
    public function createNoti() {

        $query = "SELECT userID FROM user where username = :username;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $this->recvName);
        $stmt->execute();

        $this->recvName = $stmt->fetchAll()[0][0];

        $query = "INSERT INTO " . $this->table_name . "(`notificationID`, `sendID`, `recvID`, `projectID`, `action`)
                                                VALUES (:notificationID, :send, :recv, :projectID, :action);";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':notificationID', $this->notificationID);
        $stmt->bindParam(':send', $this->sendName);
        $stmt->bindParam(':recv', $this->recvName);
        $stmt->bindParam(':projectID', $this->projectName);
        $stmt->bindParam(':action', $this->action);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    // other function create notification 
    public function createNoti1() {
        $query = "INSERT INTO " . $this->table_name . "(`notificationID`, `sendID`, `recvID`, `projectID`, `action`)
                                                VALUES (:notificationID, :send, :recv, :projectID, :action);";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':notificationID', $this->notificationID);
        $stmt->bindParam(':send', $this->sendName);
        $stmt->bindParam(':recv', $this->recvName);
        $stmt->bindParam(':projectID', $this->projectName);
        $stmt->bindParam(':action', $this->action);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    // read notification
    public function readNotification() {
        $query = "UPDATE notification SET isRead = 1 WHERE notificationID = :notificationID;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':notificationID', $this->notificationID);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    // create assignee Notification
    public function createAssignNoti() {
        $query = "SELECT userID FROM user WHERE username = :recvName;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':recvName', $this->recvName);
        $stmt->execute();
        $this->recvName = $stmt->fetchAll()[0][0];

        $query = "SELECT COUNT(*) FROM notification WHERE taskID = :taskID";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':taskID', $this->taskID);
        $stmt->execute();

        if($stmt->fetchAll()[0][0] == 1) {
            $query = "UPDATE notification SET recvID = :recvName, sendID = :sendName, status = 0, isRead = 0, time = CURRENT_TIMESTAMP()
                      WHERE taskID = :taskID;";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':taskID', $this->taskID);
            $stmt->bindParam(':recvName', $this->recvName);
            $stmt->bindParam(':sendName', $this->sendName);
            $stmt->execute();
        }
        else {
            $this->notificationID = time();
            $query = "INSERT INTO `notification`(`notificationID`, `sendID`, `recvID`, `projectID`, `action`, `taskID`)
                        VALUES (:notificationID, :sendName, :recvName, :projectName, 4, :taskID);";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':taskID', $this->taskID);
            $stmt->bindParam(':recvName', $this->recvName);
            $stmt->bindParam(':sendName', $this->sendName);
            $stmt->bindParam(':projectName', $this->projectName);
            $stmt->bindParam(':notificationID', $this->notificationID);
            $stmt->execute();
        }
        return true;
    }
}

?>