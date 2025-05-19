
// 5. src/App.jsx

import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function App() {
    const videoRef = useRef(null);
    const [qrData, setQrData] = useState(''); 
    const codeReader = new BrowserMultiFormatReader();

    useEffect(() => {
        const startScanner = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoInputDevices = devices.filter(device => device.kind === 'videoinput');
                if (videoInputDevices.length === 0) throw new Error("Kamera bulunamadı.");
                const selectedDeviceId = videoInputDevices[0].deviceId;

                await codeReader.decodeFromVideoDevice(
                    selectedDeviceId,
                    videoRef.current,
                    (result, err) => {
                        if (result) setQrData(result.getText());
                    }
                );
            } catch (error) {
                console.error("Kamera erişimi başarısız:", error);
            }
        };

        startScanner();
        return () => codeReader.reset();

    }, []);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet([{ qrContent: qrData }]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'QR Data');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([excelBuffer]), 'qr_data.xlsx');
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>QRInvoice Tracker</h2>
            <video ref={videoRef} style={{ width: '300px', border: '1px solid #ccc' }} autoPlay playsInline />
            <p>Okunan Veri: <strong>{qrData || 'Henüz veri yok'}</strong></p>
            {qrData && <button onClick={exportToExcel}>Excel'e Aktar</button>}
        </div>
    );
}

export default App;

// 6. README.md
// # QRInvoice Tracker
// Bu proje QR kod ile fiş/fatura okuyup verileri Excel'e aktarmayı amaçlamaktadır. 
// 
// ## Kurulum
// '''bash
// npm install // npm run dev 
// '''
// 
// ## Kullanım
// - Kamerayı açar
// - QR verisini okur
// - Ekrana yazdırır
// - Excel'e aktarma butonuyla veri indirilebilir hale gelir