// ...existing code...

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    if (password === 'may.09.05') {
        document.getElementById('uploadSection').style.display = 'block';
        document.getElementById('loginSection').style.display = 'none';
        displayUploadedFiles();
    } else {
        alert('Incorrect password');
    }
});

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('uploadFile.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('File uploaded: ' + result.file);
                addFileToList(result.file);
            } else {
                alert('Error uploading file: ' + result.error);
            }
        })
        .catch(error => console.error('Error uploading file:', error));
    } else {
        alert('No file selected');
    }
});

function addFileToList(fileName) {
    const fileList = document.getElementById('fileList');
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
        <span class="file-name" onclick="previewFile('${fileName}')">${fileName}</span>
        <div class="file-buttons">
            <button onclick="downloadFile('${fileName}')">Download</button>
            <button onclick="deleteFile('${fileName}')">Delete</button>
        </div>
    `;
    fileList.appendChild(fileItem);
}

function displayUploadedFiles() {
    // Fetch and display the list of uploaded files from the server
    fetch('getFiles.php')
        .then(response => response.json())
        .then(files => {
            files.forEach(fileName => addFileToList(fileName));
        })
        .catch(error => console.error('Error fetching files:', error));
}

function downloadFile(fileName) {
    window.location.href = `downloadFile.php?file=${encodeURIComponent(fileName)}`;
}

function deleteFile(fileName) {
    fetch(`deleteFile.php?file=${encodeURIComponent(fileName)}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('File deleted: ' + fileName);
                displayUploadedFiles();
            } else {
                alert('Error deleting file: ' + fileName);
            }
        })
        .catch(error => console.error('Error deleting file:', error));
}

function previewFile(fileName) {
    const modal = document.getElementById('filePreviewModal');
    const modalContent = document.getElementById('modalContent');
    const fileExtension = fileName.split('.').pop().toLowerCase();
    let content = '';

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
        content = `<img src="Storage/${encodeURIComponent(fileName)}" style="width:100%; height:auto;">`;
    } else if (['pdf'].includes(fileExtension)) {
        content = `<iframe src="Storage/${encodeURIComponent(fileName)}" style="width:100%; height:500px;"></iframe>`;
    } else {
        content = `<iframe src="Storage/${encodeURIComponent(fileName)}" style="width:100%; height:500px;"></iframe>`;
    }

    modalContent.innerHTML = content;
    modal.style.display = 'block';
}

document.getElementsByClassName('close')[0].onclick = function() {
    document.getElementById('filePreviewModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('filePreviewModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
