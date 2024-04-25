// public/script.js 파일
document.getElementById('previewBtn').addEventListener('click', () => {
    const markdownText = document.getElementById('markdown-editor').value;
    const previewDiv = document.getElementById('preview');
    fetch('/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: markdownText,
    })
        .then(response => response.text())
        .then(html => {
            previewDiv.innerHTML = html;
            previewDiv.classList.remove('hidden');
            document.getElementById('markdown-editor').classList.add('hidden');
        });
});

document.getElementById('editBtn').addEventListener('click', () => {
    document.getElementById('markdown-editor').classList.remove('hidden');
    document.getElementById('preview').classList.add('hidden');
});

