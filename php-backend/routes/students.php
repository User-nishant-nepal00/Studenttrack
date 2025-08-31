<?php
require_once __DIR__ . '/../controllers/AttendanceController.php';

class StudentRoutes {
    private $controller;

    public function __construct() {
        $this->controller = new AttendanceController();
    }

    public function handleRequest() {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Content-Type: application/json");
        
        try {
            switch ($_SERVER['REQUEST_METHOD']) {
                case 'GET':
                    $this->getAllStudents();
                    break;
                case 'POST':
                    $this->addStudent();
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

    private function getAllStudents() {
        // Check if there's a search query
        $search = isset($_GET['search']) ? trim($_GET['search']) : '';
        
        if ($search) {
            $students = $this->controller->searchStudents($search);
        } else {
            $students = $this->controller->getAllStudents();
        }
        
        echo json_encode($students);
    }

    private function addStudent() {
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['name']) || empty(trim($data['name']))) {
            throw new Exception('Student name is required');
        }
        $result = $this->controller->addStudent($data);
        echo json_encode($result);
    }
}

$routes = new StudentRoutes();
$routes->handleRequest();
?>