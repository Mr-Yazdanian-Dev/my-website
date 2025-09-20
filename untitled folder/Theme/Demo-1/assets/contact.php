<?php
// تنظیمات اولیه
header('Content-Type: text/html; charset=utf-8');
date_default_timezone_set('Asia/Tehran');

// اطلاعات اتصال به دیتابیس (در صورت نیاز)
$db_host = 'localhost';
$db_name = 'your_database';
$db_user = 'your_username';
$db_pass = 'your_password';

// تنظیمات ایمیل
$to_email = 'libyarozhbani171@gmail.com';
$subject = 'پیام جدید از فرم تماس';

// دریافت داده‌های فرم
$name = $_POST['name'] ?? '';
$family = $_POST['family'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$message = $_POST['message'] ?? '';

// اعتبارسنجی داده‌ها
$errors = [];

if (empty($name)) {
    $errors[] = 'نام الزامی است';
}

if (empty($family)) {
    $errors[] = 'نام خانوادگی الزامی است';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'ایمیل معتبر نیست';
}

if (empty($phone) || !preg_match('/^[0-9]{10,11}$/', $phone)) {
    $errors[] = 'شماره تماس معتبر نیست';
}

if (empty($message)) {
    $errors[] = 'متن پیام الزامی است';
}

// اگر خطایی وجود داشت
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'لطفا فرم را به درستی پر کنید',
        'errors' => $errors
    ]);
    exit;
}

// ذخیره در دیتابیس (اختیاری)
try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo->prepare("INSERT INTO contacts 
        (name, family, email, phone, message, created_at) 
        VALUES (?, ?, ?, ?, ?, NOW())");
    $stmt->execute([$name, $family, $email, $phone, $message]);
} catch (PDOException $e) {
    // در صورت خطا در دیتابیس، فقط لاگ کنیم و ادامه دهیم
    error_log("Database error: " . $e->getMessage());
}

// ارسال ایمیل
$email_body = "
<html dir='rtl'>
<head>
    <title>$subject</title>
    <style>
        body { font-family: 'Vazirmatn', Tahoma, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { color: #5a19ff; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        .footer { margin-top: 20px; font-size: 0.8em; color: #777; }
    </style>
</head>
<body>
    <div class='container'>
        <h2 class='header'>پیام جدید از فرم تماس</h2>
        
        <p><strong>نام و نام خانوادگی:</strong> $name $family</p>
        <p><strong>ایمیل:</strong> $email</p>
        <p><strong>شماره تماس:</strong> $phone</p>
        
        <h3>متن پیام:</h3>
        <p>" . nl2br(htmlspecialchars($message)) . "</p>
        
        <div class='footer'>
            این پیام در تاریخ " . date('Y/m/d H:i') . " ارسال شده است
        </div>
    </div>
</body>
</html>
";

$headers = [
    'From: noreply@example.com',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=utf-8',
    'X-Mailer: PHP/' . phpversion()
];

// ارسال ایمیل
$mail_sent = mail($to_email, $subject, $email_body, implode("\r\n", $headers));

// پاسخ به کاربر
if ($mail_sent) {
    echo json_encode([
        'status' => 'success',
        'message' => 'پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'مشکلی در ارسال پیام پیش آمد. لطفاً بعداً تلاش کنید.'
    ]);
}
?>