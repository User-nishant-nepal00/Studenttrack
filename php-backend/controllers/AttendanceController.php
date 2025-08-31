<?php
require_once __DIR__ . '/../models/Attendance.php';

class AttendanceController {
    private $db;
    private $attendance;

    public function __construct() {
        $this->attendance = new Attendance();
    }

    public function getDailyAttendance($date = null) {
        return $this->attendance->getDailyAttendance($date);
    }

    public function createCheckIn($studentId, $notes = '') {
        return $this->attendance->createCheckIn($studentId, $notes);
    }

    public function checkOutStudent($checkInId) {
        return $this->attendance->checkOutStudent($checkInId);
    }

    public function getAllStudents() {
        return $this->attendance->getAllStudents();
    }

    public function searchStudents($query) {
        return $this->attendance->searchStudents($query);
    }

    public function addStudent($data) {
        return $this->attendance->addStudent($data);
    }
}
?>