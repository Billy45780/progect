class ApiTester {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
        this.initEventListeners();
        this.updateUI();
    }

    initEventListeners() {
        document.getElementById('sendRequest').addEventListener('click', () => this.sendRequest());
        document.getElementById('method').addEventListener('change', () => this.updateUI());
        document.getElementById('endpoint').addEventListener('change', () => this.updateUI());
    }

    updateUI() {
        const method = document.getElementById('method').value;
        const dataGroup = document.getElementById('dataGroup');
        
        if (method === 'POST' || method === 'PUT') {
            dataGroup.style.display = 'block';
        } else {
            dataGroup.style.display = 'none';
        }
    }

    async sendRequest() {
        const endpoint = document.getElementById('endpoint').value;
        const method = document.getElementById('method').value;
        const requestData = document.getElementById('requestData').value;

        const startTime = performance.now();
        
        try {
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            if ((method === 'POST' || method === 'PUT') && requestData) {
                options.body = requestData;
            }

            const response = await fetch(`${this.baseUrl}${endpoint}`, options);
            const responseTime = Math.round(performance.now() - startTime);

            const data = await response.json();

            this.displayResult(response.status, responseTime, data);
        } catch (error) {
            const responseTime = Math.round(performance.now() - startTime);
            this.displayResult(0, responseTime, { error: `Ошибка сети: ${error.message}` });
        }
    }

    displayResult(statusCode, responseTime, data) {
        document.getElementById('statusCode').textContent = statusCode;
        document.getElementById('statusCode').className = statusCode >= 400 ? 'error' : 'success';
        document.getElementById('responseTime').textContent = responseTime;
        
        const output = document.getElementById('responseOutput');
        output.textContent = JSON.stringify(data, null, 2);
        output.className = statusCode >= 400 ? 'error' : 'success';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ApiTester();
});

function testAllEndpoints() {
    const tests = [
        { endpoint: '/', method: 'GET' },
        { endpoint: '/api/users', method: 'GET' },
        { endpoint: '/api/users/1', method: 'GET' },
        { endpoint: '/api/products', method: 'GET' },
        { endpoint: '/api/products?category=electronics', method: 'GET' },
        { endpoint: '/api/stats', method: 'GET' }
    ];

    console.log('Запуск тестов всех endpoints...');
    tests.forEach(test => {
        fetch(`${this.baseUrl}${test.endpoint}`, { method: test.method })
            .then(response => response.json())
            .then(data => console.log(`${test.method} ${test.endpoint}:`, data))
            .catch(error => console.error(`${test.method} ${test.endpoint}:`, error));
    });
}