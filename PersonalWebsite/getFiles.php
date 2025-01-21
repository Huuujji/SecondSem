<?php
$directory = __DIR__ . '/Storage';
$files = array_diff(scandir($directory), array('..', '.'));
echo json_encode(array_values($files));
?>
