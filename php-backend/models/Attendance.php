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

    public function getDailyAttendance($date = null) {
        if (!$date) {
            $date = date('Y-m-d');
        }
        
        $query = "SELECT c.*, s.name as student_name 
                 FROM check_ins c
                 JOIN students s ON c.student_id = s.id
                 WHERE DATE(c.check_in_time) = :date
                 ORDER BY c.check_in_time DESC";
        
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':date', $date);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createCheckIn($studentId, $notes = '') {
        $query = "INSERT INTO check_ins (student_id, notes) 
                 VALUES (:student_id, :notes) 
                 RETURNING id, student_id, check_in_time, notes";
        
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':student_id', $studentId);
        $stmt->bindParam(':notes', $notes);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function checkOutStudent($checkInId) {
        $query = "UPDATE check_ins 
                 SET check_out_time = NOW() 
                 WHERE id = :id
                 RETURNING *";
        
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $checkInId);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function addStudent($data) {
        $query = "INSERT INTO students (name, email, phone) 
                 VALUES (:name, :email, :phone) 
                 RETURNING *";
        
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':phone', $data['phone']);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Add other methods as needed...
}
?>