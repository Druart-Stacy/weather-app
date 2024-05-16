// chart.js
import Chart from 'chart.js/auto';

export function renderChart(data) {
    const ctx = document.getElementById('weatherChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Temperature',
                data: data.temperatures,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: { beginAtZero: true },
                y: { beginAtZero: true }
            }
        }
    });
}
