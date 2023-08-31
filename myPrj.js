const data = [];
const $input = document.querySelector('input');
data.push({
    "role": "system",
    "content": "assistant는 한국어로 웹소설을 만들어주는 최고의 메이드입니다. AI답게 제목이랑 등장인물 이름을 멋있게 지어주지요."
});


const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;



// script.js
function generateWebNovel() {
    
    const title = document.getElementById('title').value || "[제목]";
    const genre = document.getElementById('genre').value || "[장르]";
    const mc = document.getElementById('mc').value || "[주인공]";
    const sc = document.getElementById('sc').value || "[조력자]";
    const antagonist = document.getElementById('antagonist').value || "[빌런]";
    
    const background = document.getElementById('background').value || "[배경]";
    const event1 = document.getElementById('event1').value || "[첫 사건]";
    const event2 = document.getElementById('event2').value || "[두번째 사건]";
    const event3 = document.getElementById('event3').value || "[세번째 사건]";
    const ending = document.getElementById('ending').value || "[엔딩]";
    const moral = document.getElementById('moral').value || "[덧붙여서..]";
    
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