// ===========================
// DATA
// ===========================

const tableData = [
    { id: '#10234', client: 'Jean Dupont', product: 'Laptop Pro', amount: '1,299€', status: 'success', date: '2025-12-08' },
    { id: '#10235', client: 'Marie Martin', product: 'Smartphone X', amount: '899€', status: 'pending', date: '2025-12-08' },
    { id: '#10236', client: 'Pierre Durand', product: 'Tablette Plus', amount: '549€', status: 'success', date: '2025-12-07' },
    { id: '#10237', client: 'Sophie Leroy', product: 'Écouteurs Pro', amount: '299€', status: 'failed', date: '2025-12-07' },
    { id: '#10238', client: 'Luc Bernard', product: 'Montre Smart', amount: '399€', status: 'success', date: '2025-12-07' },
    { id: '#10239', client: 'Julie Petit', product: 'Clavier Mécanique', amount: '149€', status: 'success', date: '2025-12-06' },
    { id: '#10240', client: 'Marc Moreau', product: 'Souris Gaming', amount: '79€', status: 'pending', date: '2025-12-06' },
    { id: '#10241', client: 'Émilie Simon', product: 'Webcam HD', amount: '129€', status: 'success', date: '2025-12-05' },
    { id: '#10242', client: 'Thomas Laurent', product: 'Microphone USB', amount: '89€', status: 'success', date: '2025-12-05' },
    { id: '#10243', client: 'Claire Michel', product: 'Casque VR', amount: '449€', status: 'failed', date: '2025-12-04' },
    { id: '#10244', client: 'Nicolas Garnier', product: 'Imprimante 3D', amount: '1,599€', status: 'success', date: '2025-12-04' },
    { id: '#10245', client: 'Isabelle Faure', product: 'Scanner Pro', amount: '299€', status: 'pending', date: '2025-12-03' },
    { id: '#10246', client: 'Olivier Bonnet', product: 'Disque SSD 2To', amount: '249€', status: 'success', date: '2025-12-03' },
    { id: '#10247', client: 'Nathalie Blanc', product: 'Caméra 4K', amount: '699€', status: 'success', date: '2025-12-02' },
    { id: '#10248', client: 'François Roux', product: 'Drone Pro', amount: '1,099€', status: 'pending', date: '2025-12-02' }
];

const activities = [
    {
        icon: 'icon-user',
        iconClass: 'fa-user-plus',
        text: 'Nouveau client inscrit : Marie Dubois',
        time: 'Il y a 5 minutes'
    },
    {
        icon: 'icon-cart',
        iconClass: 'fa-shopping-cart',
        text: 'Nouvelle commande #10249 pour 1,299€',
        time: 'Il y a 15 minutes'
    },
    {
        icon: 'icon-check',
        iconClass: 'fa-check-circle',
        text: 'Paiement validé pour la commande #10248',
        time: 'Il y a 30 minutes'
    },
    {
        icon: 'icon-alert',
        iconClass: 'fa-exclamation-triangle',
        text: 'Stock faible : Laptop Pro (5 unités restantes)',
        time: 'Il y a 1 heure'
    },
    {
        icon: 'icon-user',
        iconClass: 'fa-star',
        text: 'Nouvel avis 5 étoiles de Jean Martin',
        time: 'Il y a 2 heures'
    },
    {
        icon: 'icon-cart',
        iconClass: 'fa-truck',
        text: 'Commande #10245 expédiée',
        time: 'Il y a 3 heures'
    },
    {
        icon: 'icon-check',
        iconClass: 'fa-user-check',
        text: '10 nouveaux abonnés à la newsletter',
        time: 'Il y a 4 heures'
    },
    {
        icon: 'icon-alert',
        iconClass: 'fa-bell',
        text: 'Rappel : Réunion équipe à 15h',
        time: 'Il y a 5 heures'
    }
];

// ===========================
// COUNTER ANIMATION
// ===========================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString('fr-FR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('fr-FR');
        }
    }, 16);
}

// ===========================
// CHARTS
// ===========================

let salesChart, categoryChart, countriesChart, trafficChart, performanceChart;

// Sales Chart
function createSalesChart(type = 'line') {
    const ctx = document.getElementById('salesChart');

    if (salesChart) {
        salesChart.destroy();
    }

    salesChart = new Chart(ctx, {
        type: type,
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            datasets: [{
                label: 'Ventes 2025',
                data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 32000, 35000, 38000, 42000, 45000],
                backgroundColor: type === 'bar' ? 'rgba(245, 80, 80, 0.8)' : 'rgba(245, 80, 80, 0.1)',
                borderColor: '#F55050',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#F55050',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Roboto',
                            size: 12
                        },
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        family: 'Roboto'
                    },
                    bodyFont: {
                        size: 13,
                        family: 'Roboto'
                    },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toLocaleString('fr-FR') + '€';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('fr-FR') + '€';
                        },
                        font: {
                            family: 'Roboto'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Roboto'
                        }
                    }
                }
            }
        }
    });
}

// Category Chart
function createCategoryChart() {
    const ctx = document.getElementById('categoryChart');

    categoryChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Électronique', 'Vêtements', 'Maison', 'Sport', 'Livres'],
            datasets: [{
                data: [35, 25, 20, 12, 8],
                backgroundColor: [
                    '#F55050',
                    '#627b8e',
                    '#FFD372',
                    '#d06969',
                    '#86A3B8'
                ],
                borderWidth: 3,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Roboto',
                            size: 12
                        },
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        family: 'Roboto'
                    },
                    bodyFont: {
                        size: 13,
                        family: 'Roboto'
                    },
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Countries Chart
function createCountriesChart() {
    const ctx = document.getElementById('countriesChart');

    countriesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['France', 'Belgique', 'Suisse', 'Canada', 'Luxembourg', 'Monaco'],
            datasets: [
                {
                    label: 'Desktop',
                    data: [4500, 3200, 2800, 2100, 1500, 900],
                    backgroundColor: '#F55050',
                    borderRadius: 8
                },
                {
                    label: 'Mobile',
                    data: [3800, 2900, 2300, 1800, 1200, 700],
                    backgroundColor: '#627b8e',
                    borderRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        family: 'Roboto'
                    },
                    bodyFont: {
                        size: 13,
                        family: 'Roboto'
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Roboto'
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: 'Roboto'
                        }
                    }
                }
            }
        }
    });
}

// Traffic Chart
function createTrafficChart() {
    const ctx = document.getElementById('trafficChart');

    trafficChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Direct', 'Recherche', 'Réseaux Sociaux'],
            datasets: [{
                data: [42, 35, 23],
                backgroundColor: [
                    '#F55050',
                    '#627b8e',
                    '#FFD372'
                ],
                borderWidth: 3,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Roboto',
                            size: 12
                        },
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        family: 'Roboto'
                    },
                    bodyFont: {
                        size: 13,
                        family: 'Roboto'
                    },
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Performance Chart
function createPerformanceChart() {
    const ctx = document.getElementById('performanceChart');

    performanceChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Qualité', 'Service', 'Prix', 'Rapidité', 'Innovation', 'Support'],
            datasets: [{
                label: 'Performance 2025',
                data: [90, 85, 78, 92, 88, 86],
                backgroundColor: 'rgba(245, 80, 80, 0.2)',
                borderColor: '#F55050',
                borderWidth: 3,
                pointBackgroundColor: '#F55050',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Roboto',
                            size: 12
                        },
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        family: 'Roboto'
                    },
                    bodyFont: {
                        size: 13,
                        family: 'Roboto'
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        font: {
                            family: 'Roboto'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            family: 'Roboto',
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

// ===========================
// TABLE FUNCTIONS
// ===========================

let currentPage = 1;
const rowsPerPage = 10;
let filteredData = [...tableData];

function renderTable() {
    const tbody = document.getElementById('table-content');
    tbody.innerHTML = '';

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = filteredData.slice(start, end);

    pageData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.client}</td>
            <td>${row.product}</td>
            <td><strong>${row.amount}</strong></td>
            <td><span class="status-badge status-${row.status}">${getStatusLabel(row.status)}</span></td>
            <td>${row.date}</td>
        `;
        tbody.appendChild(tr);
    });

    updatePagination();
}

function getStatusLabel(status) {
    const labels = {
        'success': 'Validé',
        'pending': 'En attente',
        'failed': 'Échoué'
    };
    return labels[status] || status;
}

function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    document.getElementById('page-info').textContent = `Page ${currentPage} sur ${totalPages}`;

    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
}

function searchTable(query) {
    query = query.toLowerCase();
    filteredData = tableData.filter(row => {
        return row.id.toLowerCase().includes(query) ||
               row.client.toLowerCase().includes(query) ||
               row.product.toLowerCase().includes(query) ||
               row.amount.toLowerCase().includes(query) ||
               row.date.toLowerCase().includes(query);
    });
    currentPage = 1;
    renderTable();
}

// ===========================
// ACTIVITY FEED
// ===========================

function renderActivities() {
    const feed = document.getElementById('activity-feed');
    feed.innerHTML = '';

    activities.forEach(activity => {
        const div = document.createElement('div');
        div.className = 'activity-item';
        div.innerHTML = `
            <div class="activity-icon ${activity.icon}">
                <i class="fas ${activity.iconClass}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.text}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        feed.appendChild(div);
    });
}

// ===========================
// EVENT LISTENERS
// ===========================

document.addEventListener('DOMContentLoaded', function() {

    // Animate counters
    document.querySelectorAll('.stat-number').forEach(animateCounter);

    // Create charts
    createSalesChart();
    createCategoryChart();
    createCountriesChart();
    createTrafficChart();
    createPerformanceChart();

    // Render table
    renderTable();

    // Render activities
    renderActivities();

    // Chart type toggle
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const chartType = this.getAttribute('data-chart');
            const type = this.getAttribute('data-type');

            if (chartType === 'sales') {
                document.querySelectorAll('[data-chart="sales"]').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                createSalesChart(type);
            }
        });
    });

    // Period select
    document.getElementById('period-select').addEventListener('change', function() {
        console.log('Période changée:', this.value);
        // Animation de rafraîchissement
        document.querySelectorAll('.stat-number').forEach(el => {
            el.textContent = '0';
            setTimeout(() => animateCounter(el), 100);
        });
    });

    // Refresh button
    document.getElementById('refresh-btn').addEventListener('click', function() {
        const icon = this.querySelector('i');
        icon.style.animation = 'none';
        setTimeout(() => {
            icon.style.animation = 'spin 1s linear';
        }, 10);

        // Refresh data
        document.querySelectorAll('.stat-number').forEach(el => {
            el.textContent = '0';
            setTimeout(() => animateCounter(el), 100);
        });
    });

    // Search input
    document.getElementById('search-input').addEventListener('input', function() {
        searchTable(this.value);
    });

    // Pagination
    document.getElementById('prev-page').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    document.getElementById('next-page').addEventListener('click', function() {
        const totalPages = Math.ceil(filteredData.length / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });

    // Export button
    document.querySelector('.btn-export').addEventListener('click', function() {
        alert('Fonctionnalité d\'export en cours de développement!');
    });

    // Clear activities
    document.querySelector('.btn-clear').addEventListener('click', function() {
        if (confirm('Marquer toutes les activités comme lues?')) {
            document.querySelectorAll('.activity-item').forEach(item => {
                item.style.opacity = '0.5';
            });
        }
    });
});

// ===========================
// SPIN ANIMATION
// ===========================

const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
