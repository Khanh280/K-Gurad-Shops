import React from "react";
import {Bar} from "react-chartjs-2";

export const ChartComponent = ({data}) => {
    const chartData = {
        labels: data.map((row) => row.productName),
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
                height: 10
            },
        ],
    };
    const options = {
        responsive: true, // Tự động điều chỉnh kích thước biểu đồ theo kích thước của container cha
        maintainAspectRatio: false, // Tắt việc duy trì tỷ lệ khung nhìn mặc định (được sử dụng kết hợp với responsive)
        // scales: {
        //     x: {
        //         beginAtZero: true, // Hiển thị giá trị trục x bắt đầu từ 0
        //     },
        //     y: {
        //         beginAtZero: true, // Hiển thị giá trị trục y bắt đầu từ 0
        //     },
        // },
        plugins: {
            legend: {
                display: true, // Hiển thị chú thích (legend) của biểu đồ
                position: 'top', // Vị trí của chú thích (top, bottom, left, right)
            },
            title: {
                display: true, // Hiển thị tiêu đề của biểu đồ
                text: 'Biểu đồ top 10 doanh thu sẩn phẩm ' , // Tiêu đề biểu đồ
                font: {
                    size: 18, // Kích thước font tiêu đề
                },
            },
        },
    };

    return <Bar data={chartData} options={options}/>;
};