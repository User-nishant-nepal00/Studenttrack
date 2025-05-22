<?php
require_once __DIR__ . '/../controllers/AttendanceController.php';

// Specifically for attendance-related operations
class AttendanceRoutes {
    private $controller;

    public function __construct() {
        $this->controller = new AttendanceController();
    }

    public function handleRequest() {
       header("Access-Control-Allow-Origin: *");
       header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
       header("Access-Control-Allow-Headers: Content-Type");

        try {
            switch ($_SERVER['REQUEST_METHOD']) {
                case 'GET':
                    $this->getDailyCheckIns();
                    break;
                case 'POST':
                    $this->handleCheckIn();
                    break;
                case 'PUT':
                    $this->handleCheckOut();
                    break;
                case 'OPTIONS':
                    http_response_code(200);
                    break;
                default:
                    http_response_code(405);
                    echo json_encode(['error' => 'Method not allowed']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    private function getDailyCheckIns() {
        $date = isset($_GET['date']) ? $_GET['date'] : null;
        $checkIns = $this->controller->getDailyAttendance($date);
        echo json_encode($checkIns);
    }

    private function handleCheckIn() {
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['studentId'])) {
            throw new Exception('Student ID is required');
        }
        $notes = $data['notes'] ?? '';
        $result = $this->controller->createCheckIn($data['studentId'], $notes);
        echo json_encode($result);
    }

    private function handleCheckOut() {
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['checkInId'])) {
            throw new Exception('Check-in ID is required');
        }
        $result = $this->controller->checkOutStudent($data['checkInId']);
        echo json_encode($result);
    }
}

$routes = new AttendanceRoutes();
$routes->handleRequest();
?>