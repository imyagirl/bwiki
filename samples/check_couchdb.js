const auth = Buffer.from('admin:password').toString('base64');

async function checkConnection() {
    try {
        const response = await fetch('http://127.0.0.1:5984/', {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Connection Successful!');
            console.log('Server Info:', data);
        } else {
            console.error('❌ Connection Failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('❌ Error connecting to CouchDB:', error.message);
    }
}

checkConnection();
