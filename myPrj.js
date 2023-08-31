const data = [];
const $input = document.querySelector('input');

const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

const TOTAL_PAGE = document.querySelectorAll('.field-container fieldset').length -1;
console.log(TOTAL_PAGE);
let CURRENT_PAGE = 1;
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

function next() {
    if (CURRENT_PAGE < TOTAL_PAGE) {
        const currentField = document.getElementById(`question${CURRENT_PAGE}`);
        const nextField = document.getElementById(`question${CURRENT_PAGE + 1}`);

        currentField.style.display = "none";
        nextField.style.display = "block";
        prevBtn.style.display = "block";
        CURRENT_PAGE++;

        if(CURRENT_PAGE == TOTAL_PAGE){
            nextBtn.style.display = "none";
        }else{
            nextBtn.style.display = "block";
        }
        console.log(CURRENT_PAGE);
    }
}

function prev() {
    if (CURRENT_PAGE > 1) {
        const currentField = document.getElementById(`question${CURRENT_PAGE}`);
        const prevField = document.getElementById(`question${CURRENT_PAGE - 1}`);

        currentField.style.display = "none";
        prevField.style.display = "block";
        nextBtn.style.display = "block";

        CURRENT_PAGE--;
        if(CURRENT_PAGE == 1) {
            prevBtn.style.display = "none";
        }else{
            prevBtn.style.display = "block";
        }

        console.log(CURRENT_PAGE);
    }
}

data.push({
    "role": "system",
    "content": "assistant는 한국어로 웹소설을 만들어주는 최고의 AI입니다. 최고의 AI답게 제목이랑 등장인물 이름을 멋있게 지어주지요. 스토리도 물론 흥미진진합니다!"
});
// script.js
function generateWebNovel() {

    currentQuestion = 1;
    
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

    displayOutPut();

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

function displayOutPut(){
    document.getElementById('question11').style.display = "none";
    document.getElementById('yourNovelIsHere').style.display = "block";
}