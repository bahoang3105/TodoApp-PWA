<?php

class Task {
    // database connection and table name
    private $conn;
    private $table_name = "task";

    // object properties
    public $task_id;
    public $user_id;
    public $project_id;
    public $content;
    public $deadline;
    public $status;
    public $assignee;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // get Task in today and overdue Task
    public function getTodayTask() {
        $query = "SELECT taskID, content, deadline FROM " . $this->table_name .
                 " WHERE userID = :userID AND status = '0' AND DATE_FORMAT(deadline, '%Y-%m-%d') <= CURRENT_DATE()
                   AND projectID IS NULL ORDER BY deadline;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':userID', $this->user_id);

        if ($stmt->execute()) {
            return $stmt;
        } else {
            return false;
        }
    }

    // get upcoming Task
    public function getUpcomingTask() {
        $query = "SELECT taskID, content, deadline FROM " . $this->table_name .
                 " WHERE userID = :userID AND status = '0' AND DATE_FORMAT(deadline, '%Y-%m-%d') > CURRENT_DATE()
                   AND projectID IS NULL ORDER BY deadline;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':userID', $this->user_id);

        if ($stmt->execute()) {
            return $stmt;
        } else {
            return false;
        }
    }

    //insert Task
    public function insertTask() {
        $query = "INSERT INTO " . $this->table_name . "(`taskID`, `content`, `deadline`, `userID`)
                                                VALUES (:taskID, :content, :deadline, :userID);";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':taskID', $this->task_id);
        $stmt->bindParam(':content', $this->content);
        $stmt->bindParam(':deadline', $this->deadline);
        $stmt->bindParam(':userID', $this->user_id);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    // delete Task
    public function deleteTask() {
        $query = "DELETE FROM task WHERE taskID = :taskID and userID = :userID;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':taskID', $this->task_id);
        $stmt->bindParam(':userID', $this->user_id);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    // complete Task
    public function completeTask() {
        $query = "UPDATE task SET status = '1', deadline = NOW() WHERE taskID = :taskID and userID = :userID;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':taskID', $this->task_id);
        $stmt->bindParam(':userID', $this->user_id);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    //reschedule Task
    public function rescheduleTask() {
        $query = "UPDATE task SET deadline = :deadline WHERE taskID = :taskID and userID = :userID;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':deadline', $this->deadline);
        $stmt->bindParam(':taskID', $this->task_id);
        $stmt->bindParam(':userID', $this->user_id);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    //reschedule All Task
    public function rescheduleAllTask() {
        $query = "UPDATE task SET deadline = ADDTIME(CURRENT_DATE(), '23:59:59') WHERE DATE(deadline) = :deadline and userID = :userID;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':deadline', $this->deadline);
        $stmt->bindParam(':userID', $this->user_id);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    // get task completed
    public function getTaskCompleted() {
        $query = "SELECT taskID, content, deadline FROM " . $this->table_name .
                 " WHERE userID = :userID AND status = '1' AND projectID IS NULL ORDER BY deadline DESC;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':userID', $this->user_id);

        if ($stmt->execute()) {
            return $stmt;
        } else {
            return false;
        }
    }

    //update content
    public function updateContent() {
        $query = "UPDATE task SET content = :content WHERE taskID = :taskID and userID = :userID;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':content', $this->content);
        $stmt->bindParam(':taskID', $this->task_id);
        $stmt->bindParam(':userID', $this->user_id);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    //insert Task Project
    public function insertTaskProject() {
        $this->task_id = time();

        $query = "INSERT INTO " . $this->table_name . "(`taskID`, `content`, `deadline`, `userID`, `projectID`)
                                                VALUES (:taskID, :content, :deadline, :userID, :projectID);";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':taskID', $this->task_id);
        $stmt->bindParam(':content', $this->content);
        $stmt->bindParam(':deadline', $this->deadline);
        $stmt->bindParam(':userID', $this->user_id);
        $stmt->bindParam(':projectID', $this->project_id);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    // search Task
    public function searchTask() {
        $query = "SELECT DISTINCT task.*, IF(task.projectID IS NULL, NULL, IF((SELECT project.status FROM project WHERE project.projectID = task.projectID) = 0, 0, 1)) as statusProj
                  FROM task
                  WHERE userID = :userID
                  AND content LIKE :subName
                  ORDER BY taskID
                  LIMIT 5;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':userID', $this->userID);
        $stmt->bindParam(':subName', $this->content);

        if ($stmt->execute()) {
            return $stmt;
        }
        else {
            return false;
        }
    }
}
?>