<?php
class Database {
    private $host = "localhost";
    private $port = "5432";
    private $db_name = "attendance_tracker";
    private $username = "attendance_admin";
    private $password = "admin";
    private $conn;

    public function __construct() {
        $this->host = getenv('DB_HOST') ?: 'localhost';
        $this->port = getenv('DB_PORT') ?: '5432';
        $this->db_name = getenv('DB_NAME') ?: 'attendance_tracker';
        $this->username = getenv('DB_USER') ?: 'attendance_admin';
        $this->password = getenv('DB_PASS') ?: 'admin';
    }

    public function getConnection() {
        $this->conn = null;
        
        try {
            $dsn = "pgsql:host={$this->host};port={$this->port};dbname={$this->db_name}";
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            error_log("Database connection error: " . $e->getMessage());
            throw new Exception("Database connection failed");
        }

        return $this->conn;
    }
}
?>