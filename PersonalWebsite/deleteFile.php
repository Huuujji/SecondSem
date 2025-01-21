<?php
if (isset($_GET['file'])) {
    $file = basename($_GET['file']);
    $filePath = __DIR__ . '/Storage/' . $file;
    if (file_exists($filePath)) {
        unlink($filePath);
        echo json_encode(['success' => true]);
    } else {
        error_log('File not found: ' . $filePath);
        echo json_encode(['success' => false, 'error' => 'File not found.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No file specified.']);
}
?>
