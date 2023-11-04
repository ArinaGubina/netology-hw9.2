<?php
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
// header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

$notes = [
    [
        "id" => 1,
        "content" => "Пост первый",
        "created" => "5 мин"
    ],
    [
        "id" => 2,
        "content" => "Пост второй",
        "created" => "15 мин"
    ],
    [
        "id" => 3,
        "content" => "Пост третий",
        "created" => "25 мин"
    ],
    [
        "id" => 4,
        "content" => "Пост четвертый",
        "created" => "1 ч"
    ],
    [
        "id" => 5,
        "content" => "Пост пятый",
        "created" => "2 дн"
    ]
];

if($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET["delete"]) && $_GET["delete"] > 0){
        $temp = [];
        foreach ($notes as $note) {
            if($note["id"] != $_GET["delete"]){
                $temp[] = $note;
            }
        }
        $notes = $temp;
    }
    echo json_encode($notes);
} else if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    if (isset($data["id"])){
        if ($data["id"] > 0){
            foreach ($notes as $key => $note) {
                if($note["id"] == $data["id"]){
                    $notes[$key]["content"] = $data["content"];
                    break;
                }
            }
        } else {
            $notes[] = [ "id" => count($notes)+1, "content" => $data["content"]];
        }
    }

    echo json_encode($notes);
} else {
    echo "method not found";
}