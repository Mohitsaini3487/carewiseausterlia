<?php
header("Access-Control-Allow-Origin: http://localhost:9002");  // your react dev URL
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle OPTIONS preflight for CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ----------- Load PHPMailer --------------
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ----------- Validate FormData -----------
function get_field($name) {
    return isset($_POST[$name]) ? htmlspecialchars(trim($_POST[$name])) : "";
}

$firstName   = get_field("firstName");
$lastName    = get_field("lastName");
$email       = filter_var($_POST["email"] ?? "", FILTER_SANITIZE_EMAIL);
$countryCode = get_field("countryCode");
$phone       = get_field("phone");
$bookingDate = get_field("bookingDate");
$service     = get_field("serviceType");
$startTime   = get_field("startTime");
$startAmPm   = get_field("startAmPm");
$endTime     = get_field("endTime");
$endAmPm     = get_field("endAmPm");
$details     = get_field("details");
$userId      = get_field("userId");  // Firebase ID

if (!$firstName || !$lastName || !$email || !$phone || !$service || !$bookingDate) {
    echo json_encode(["success" => false, "message" => "Please fill all required fields."]);
    exit;
}

// ----------- Email Sending ---------------
$mail = new PHPMailer(true);

try {
    // SMTP Settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';  
    $mail->SMTPAuth   = true;
    $mail->Username   = 'mohitdsaini.2005@gmail.com';  // your gmail
    $mail->Password   = 'fssn rtyc bdqe lmlg';    // Gmail App Password
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Email Headers
    $mail->setFrom("mohitdsaini.2005@gmail.com", "Booking System");
    $mail->addAddress("mohitdsaini.2005@gmail.com");
    $mail->addReplyTo($email, $firstName);

    // Email Body
    $mail->isHTML(true);
    $mail->Subject = "New Booking from $firstName $lastName";

    $mail->Body = "
        <h2>Booking Details</h2>
        <p><strong>User ID:</strong> $userId</p>
        <p><strong>Name:</strong> $firstName $lastName</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $countryCode $phone</p>
        <p><strong>Date:</strong> $bookingDate</p>
        <p><strong>Service:</strong> $service</p>
        <p><strong>Time:</strong> $startTime $startAmPm - $endTime $endAmPm</p>
        <p><strong>Details:</strong> $details</p>
    ";

    $mail->send();

    echo json_encode(["success" => true, "message" => "Booking request submitted!"]);
} 
catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Mailer error: " . $mail->ErrorInfo]);
}
