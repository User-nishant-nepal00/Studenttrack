<?php

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$uri = ltrim($uri, '/');
$uri = str_replace('.php', '', $uri);

$routes = [
    'routes/attendance' => 'routes/attendance.php',
    'routes/students' => 'routes/students.php'
];

if (isset($routes[$uri])) {
    require __DIR__ . '/' . $routes[$uri];
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
}
?> 