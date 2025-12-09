import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Export data to CSV format
 */
export function exportToCSV(data: any[], filename: string) {
    // Convert data to CSV
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);

    // Create a blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Export data to Excel format
 */
export function exportToExcel(data: any[], filename: string, sheetName: string = 'Sheet1') {
    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Generate Excel file and download
    XLSX.writeFile(workbook, `${filename}.xlsx`);
}

/**
 * Export data to PDF format with table
 */
export function exportToPDF(
    data: any[],
    filename: string,
    title: string,
    columns?: string[]
) {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text(title, 14, 20);

    // Add date
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

    // Prepare table data
    const headers = columns || (data.length > 0 ? Object.keys(data[0]) : []);
    const rows = data.map(item => headers.map(header => item[header] || ''));

    // Add table
    autoTable(doc, {
        head: [headers],
        body: rows,
        startY: 35,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [46, 204, 113] }, // Green color matching your theme
    });

    // Save the PDF
    doc.save(`${filename}.pdf`);
}

/**
 * Export sales data specifically formatted
 */
export function exportSalesData(salesData: any[], format: 'csv' | 'excel' | 'pdf') {
    const formattedData = salesData.map(sale => ({
        Date: sale.date,
        'Item Sold': sale.itemSold,
        Quantity: sale.quantity,
        'Revenue (PKR)': sale.revenue,
    }));

    const filename = `sales_report_${new Date().toISOString().split('T')[0]}`;

    switch (format) {
        case 'csv':
            exportToCSV(formattedData, filename);
            break;
        case 'excel':
            exportToExcel(formattedData, filename, 'Sales Data');
            break;
        case 'pdf':
            exportToPDF(formattedData, filename, 'Sales Report');
            break;
    }
}

/**
 * Export reports data (multiple tabs/sections)
 */
export function exportReportsData(
    reportType: string,
    data: any[],
    format: 'excel' | 'pdf'
) {
    const filename = `${reportType}_report_${new Date().toISOString().split('T')[0]}`;

    if (format === 'excel') {
        exportToExcel(data, filename, reportType);
    } else {
        exportToPDF(data, filename, `${reportType} Report`);
    }
}
