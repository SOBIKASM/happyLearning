const fetch = require('node-fetch');

async function testSorting() {
    try {
        const res = await fetch('http://localhost:5000/elements');
        const data = await res.json();
        if (data.error) {
            console.error("API Error:", data.error);
            return;
        }
        const numbers = data.map(el => el.atomicNumber);
        console.log("First 10 Atomic Numbers:", numbers.slice(0, 10));
        
        let isSorted = true;
        for (let i = 0; i < numbers.length - 1; i++) {
            if (numbers[i] > numbers[i+1]) {
                isSorted = false;
                console.log(`Mismatch at index ${i}: ${numbers[i]} > ${numbers[i+1]}`);
                break;
            }
        }
        console.log("Is Sorted:", isSorted);
    } catch (err) {
        console.error("Fetch failed:", err.message);
    }
}

testSorting();
