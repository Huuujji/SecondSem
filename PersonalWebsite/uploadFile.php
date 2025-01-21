<?php
$uploadDir = __DIR__ . '/Storage/';
if ($_FILES['file']['error'] == UPLOAD_ERR_OK) {
    $uploadFile = $uploadDir . basename($_FILES['file']['name']);
    
    if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
        echo json_encode(['success' => true, 'file' => $_FILES['file']['name']]);
    } else {
        error_log('Failed to move uploaded file: ' . $uploadFile);
        echo json_encode(['success' => false, 'error' => 'Failed to move uploaded file.']);
    }
} else {
    error_log('File upload error: ' . $_FILES['file']['error']);
    echo json_encode(['success' => false, 'error' => 'File upload error.']);
}
?>
