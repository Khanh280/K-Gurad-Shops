import React from "react";
import {Bar} from "react-chartjs-2";

export const ChartComponent = ({data}) => {
    const chartData = {
        labels: data.map((row) =>{
            if (row.productName.length > 20) {
                return row.productName.substring(0, 20) + '...';
            }else {
                return row.productName
            }
        }),
        datasets: [
            {
                label: "Lợi nhuận",
                data: data.map((row) => +row.totalProfit),
                backgroundColor: ['#0a9a4e'],
                hoverBackgroundColor: '#27533e',
                borderColor: ['black'],
                borderWidth: 1,
                maxBarThickness: 30,
                indexAxis: "y",
            },
        ],
    };
    const options = {
        responsive: true, // Tự động điều chỉnh kích thước biểu đồ theo kích thước của container cha
        maintainAspectRatio: false, // Tắt việc duy trì tỷ lệ khung nhìn mặc định (được sử dụng kết hợp với responsive)
        plugins: {
            legend: {
                display: true, // Hiển thị chú thích (legend) của biểu đồ
                position: 'top', // Vị trí của chú thích (top, bottom, left, right)
            },
            title: {
                display: true, // Hiển thị tiêu đề của biểu đồ
                text: 'Biểu đồ Top 10 sản phẩm bán chạy' , // Tiêu đề biểu đồ
                font: {
                    size: 18, // Kích thước font tiêu đề
                },
            }
        },
    };

    return <Bar data={chartData} options={options}/>;
};