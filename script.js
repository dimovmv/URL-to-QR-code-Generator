function generateQR() {
  let url = document.getElementById('url').value;
  let size = document.getElementById('size').value;
  if (!url) {
    alert('Please enter a URL');
    return;
  }
  try {
    new URL(url);
  } catch (_) {
    alert('Invalid URL');
    return;
  }
  document.getElementById('qrcode').innerHTML = '';
  try {
    let qrcode = new QRCode(document.getElementById('qrcode'), {
      text: url,
      width: size,
      height: size,
    });
    document.getElementById('download').style.display = 'block';
    document.getElementById('downloadPDF').style.display = 'block';
  } catch (e) {
    alert('Failed to generate QR code: ' + e.message);
  }
}

document.getElementById('download').addEventListener('click', function () {
  if (!document.querySelector('#qrcode > canvas')) {
    alert('Please generate a QR code first');
    return;
  }
  html2canvas(document.querySelector('#qrcode')).then(function (canvas) {
    try {
      let link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (e) {
      alert('Failed to download PNG: ' + e.message);
    }
  });
});

document.getElementById('downloadPDF').addEventListener('click', function () {
  if (!document.querySelector('#qrcode > canvas')) {
    alert('Please generate a QR code first');
    return;
  }
  html2canvas(document.querySelector('#qrcode')).then(function (canvas) {
    try {
      let pdf = new jsPDF();
      let imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('qrcode.pdf');
    } catch (e) {
      alert('Failed to download PDF: ' + e.message);
    }
  });
});
