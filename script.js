const claims = [];
let claimId = 1;


/* ==== File a Claim Button  ==== */

document.getElementById('fileClaimBtn').addEventListener('click', () => {
    document.getElementById('claimForm').style.display = 'block';
    document.getElementById('recentClaims').style.display = 'none';
    document.getElementById('chatbot').style.display = 'none';
});


/* ==== Track Claims Button  ==== */

document.getElementById('trackClaimsBtn').addEventListener('click', () => {
    document.getElementById('claimForm').style.display = 'none';
    document.getElementById('recentClaims').style.display = 'block';
    document.getElementById('chatbot').style.display = 'none';
    updateClaimsTable();
});


/* ==== Chatbot Button  ==== */

document.getElementById('chatbotBtn').addEventListener('click', () => {
    document.getElementById('claimForm').style.display = 'none';
    document.getElementById('recentClaims').style.display = 'none';
    document.getElementById('chatbot').style.display = 'block';
});


/* ==== Claim Submission  ==== */

document.getElementById('submissionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const policyNumber = document.getElementById('policyNumber').value.trim();
    const incidentDate = document.getElementById('incidentDate').value;
    const incidentDescription = document.getElementById('incidentDescription').value.trim();
    
    if (policyNumber === '' || incidentDescription === '') {
        document.getElementById('submissionMessage').innerText = 'Please fill in all required fields.';
        return;
    }

    claims.push({
        id: claimId++,
        policyNumber,
        incidentDate,
        description: incidentDescription,
        status: 'Submitted',
        dateSubmitted: new Date().toLocaleDateString()
    });

    document.getElementById('submissionMessage').innerText = 'Claim submitted successfully!';
    document.getElementById('submissionForm').reset();
    updateClaimsTable();
});


/* ==== Update Claims Table  ==== */

function updateClaimsTable() {
    const claimsTableBody = document.getElementById('claimsTableBody');
    claimsTableBody.innerHTML = '';

    claims.forEach(claim => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${claim.policyNumber}</td>
            <td>${claim.status}</td>
            <td>${claim.dateSubmitted}</td>
        `;
        claimsTableBody.appendChild(row);
    });
}


/* ==== Chatbot Functionality  ==== */

document.getElementById('sendChat').addEventListener('click', () => {
    const chatInput = document.getElementById('chatInput').value.trim();
    if (chatInput) {
        const chatArea = document.getElementById('chatArea');
        chatArea.innerHTML += `<div>User: ${chatInput}</div>`;
        document.getElementById('chatInput').value = '';


        /* ==== Simple AI Response ===== */
    
        let response;
        if (chatInput.includes('claim')) {
            response = 'You can file a claim by clicking the "File a Claim" button.';
        } else if (chatInput.includes('status')) {
            response = 'You can track your claims by clicking the "Track Claims" button.';
        } else {
            response = 'I am here to assist you! Please ask your question.';
        }
        chatArea.innerHTML += `<div>Bot: ${response}</div>`;
        chatArea.scrollTop = chatArea.scrollHeight;                                        // Scroll to the bottom
    }
});
