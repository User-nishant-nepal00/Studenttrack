<?php
require_once __DIR__ . '/../config/Database.php';

class Attendance {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function getAllStudents() {
        $query = "SELECT s.*, 
                 (SELECT COUNT(*) FROM check_ins WHERE student_id = s.id) as check_in_count
                 FROM students s ORDER BY s.name";
        
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function searchStudents($query) {
        $searchTerm = "%{$query}%";
        $sql = "SELECT s.*, 
               (SELECT COUNT(*) FROM check_ins WHERE student_id = s.id) as check_in_count
               FROM students s 
               WHERE s.name LIKE ? OR s.email LIKE ?
               ORDER BY s.name";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$searchTerm, $searchTerm]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getDailyAttendance($date = null) {
        if (!$date) {
            $date = date('Y-m-d');
        }
        
        $query = "SELECT c.*, s.name as student_name 
                 FROM check_ins c
                 JOIN students s ON c.student_id = s.id
                 WHERE DATE(c.check_in_time) = ?
                 ORDER BY c.check_in_time DESC";
        
        $stmt = $this->db->prepare($query);
        $stmt->execute([$date]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createCheckIn($studentId, $notes = '') {
        $query = "INSERT INTO check_ins (student_id, notes) 
                 VALUES (?, ?)";
        
        $stmt = $this->db->prepare($query);
        $stmt->execute([$studentId, $notes]);
        
        // Get the inserted record (MySQL way)
        $lastId = $this->db->lastInsertId();
        $selectQuery = "SELECT * FROM check_ins WHERE id = ?";
        $selectStmt = $this->db->prepare($selectQuery);
        $selectStmt->execute([$lastId]);
        return $selectStmt->fetch(PDO::FETCH_ASSOC);
    }

    public function checkOutStudent($checkInId) {
        $query = "UPDATE check_ins 
                 SET check_out_time = NOW() 
                 WHERE id = ?";
        
        $stmt = $this->db->prepare($query);
        $stmt->execute([$checkInId]);
        
        // Get the updated record
        $selectQuery = "SELECT * FROM check_ins WHERE id = ?";
        $selectStmt = $this->db->prepare($selectQuery);
        $selectStmt->execute([$checkInId]);
        return $selectStmt->fetch(PDO::FETCH_ASSOC);
    }

    public function addStudent($data) {
        $query = "INSERT INTO students (name, email, phone) 
                 VALUES (?, ?, ?)";
        
        $stmt = $this->db->prepare($query);
        $stmt->execute([$data['name'], $data['email'], $data['phone']]);
        
        // Get the inserted record (MySQL way)
        $lastId = $this->db->lastInsertId();
        $selectQuery = "SELECT * FROM students WHERE id = ?";
        $selectStmt = $this->db->prepare($selectQuery);
        $selectStmt->execute([$lastId]);
        return $selectStmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>