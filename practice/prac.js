const data = []
const $input = document.querySelector('input');
data.push({
    "role": "system",
    "content": "assistant는 한국어로 웹소설을 만들어주는 최고의 메이드입니다."
})


const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`



// script.js
function generateWebNovel() {
    
    const title = document.getElementById('title').value || "[Title]";
    const genre = document.getElementById('genre').value || "[genre]";
    const mc = document.getElementById('mc').value || "[Main Character]";
    const sc = document.getElementById('sc').value || "[Supporting Character]";
    const antagonist = document.getElementById('antagonist').value || "[Antagonist]";
    
    const background = document.getElementById('background').value || "[background]";
    const event1 = document.getElementById('event1').value || "[First Event]";
    const event2 = document.getElementById('event2').value || "[Second Event]";
    const event3 = document.getElementById('event3').value || "[Third Event]";
    const ending = document.getElementById('ending').value || "[ending]";
    const moral = document.getElementById('moral').value || "[Moral/Message]";
    
    const output = `
        ${title}
        ${genre}
        ${mc}
        ${sc}
        ${antagonist}
        ${background}
        ${event1}
        ${event2}
        ${event3}
        ${ending}
        ${moral}
    `;

    data.push({
        "role": "user",
        "content": output
    });
    $input.value = '';
    chatGPTAPI();
}

function chatGPTAPI() {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        redirect: 'follow'
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        // 답변 온 것을 assistant로 저장
        const replying = res.choices[0].message.content;
        document.getElementById('output').innerText = replying;
    })
}