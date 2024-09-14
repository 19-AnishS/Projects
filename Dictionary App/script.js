document.querySelector('button').addEventListener('click', async () => {
    const word = document.querySelector('input').value.trim();
    if (!word) return;

    // Show loading indicator
    document.querySelector('.dictionary-app').innerHTML = '<div class="card"><div class="property"><span>Loading...</span></div></div>';

    try {
        // Replace with your actual API URL
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error('Word not found or API error');

        const data = await response.json();
        const wordData = data[0];

        // Extract phonetics, meanings, examples, parts of speech, and audio URL
        const phonetics = wordData.phonetics.map(p => p.text).join(', ');
        const meanings = wordData.meanings.map(m => m.definitions.map(d => d.definition).join('; ')).join('; ');
        
        // Get examples if available
        const exampleLists = wordData.meanings.flatMap(m => m.definitions.flatMap(d => d.example)).filter(example => example);
        const examples = exampleLists.length > 0 ? exampleLists.join('; ') : 'No examples available.';
        
        const partsOfSpeech = wordData.meanings.map(m => m.partOfSpeech).join(', ');
        const audioUrl = wordData.phonetics.find(p => p.audio)?.audio;

        // Provide a fallback audio URL if none is available
        const fallbackAudioUrl = 'path/to/your/default-audio.mp3'; // Replace with the URL of your default audio file

        // Update UI
        document.querySelector('.dictionary-app').innerHTML = `
            <div class="card">
                <div class="property"><span>Word:</span><span>${word}</span></div>
                <div class="property"><span>Phonetics:</span><span>${phonetics || 'N/A'}</span></div>
                <div class="property"><span>Audio:</span><span><audio controls src="${audioUrl || fallbackAudioUrl}">Your browser does not support the audio element.</audio></span></div>
                <div class="property"><span>Meaning:</span><span>${meanings || 'N/A'}</span></div>
                ${exampleLists.length > 0 ? `<div class="property"><span>Example:</span><span>${examples}</span></div>` : ''}
                <div class="property"><span>Parts of Speech:</span><span>${partsOfSpeech || 'N/A'}</span></div>
            </div>
        `;

    } catch (error) {
        console.error('Error fetching word data:', error);
        document.querySelector('.dictionary-app').innerHTML = `<div class="card"><div class="property"><span>Error:</span><span>${error.message}</span></div></div>`;
    }
});
