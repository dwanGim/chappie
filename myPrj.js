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
    // 로딩함수 추가 요망


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
        document.getElementById('output').innerHTML = `<p class='typingTxt'>${replying}</p>`

        // 지금은 문제가 많은 타이핑 함수
        // autoTyping(".typingTxt",200);
        
    })
}


// // 로딩 중 이미지
// function LoadingWithMask(svg) {
//     //화면의 높이와 너비를 구합니다.
//     var maskHeight = $(document).height();
//     var maskWidth  = window.document.body.clientWidth;
     
//     //화면에 출력할 마스크를 설정해줍니다.
//     var mask       = "<div id='mask' style='position:absolute; z-index:9000; display:none; left:0; top:0;'></div>";
//     var loadingImg = '';
      
//     loadingImg += " <img src='"+ svg + "' style='position: absolute; display: block; margin: 0px auto;'/>";
 
//     //화면에 레이어 추가
//     $('body')
//         .append(mask)
 
//     //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채웁니다.
//     $('#mask').css({
//             'width' : maskWidth,
//             'height': maskHeight,
//             'opacity' : '0.3'
//     }); 
  
//     //마스크 표시
//     $('#mask').show();
  
//     //로딩중 이미지 표시
//     $('#loadingImg').append(loadingImg);
//     $('#loadingImg').show();
// }
 
// function closeLoadingWithMask() {
//     $('#mask, #loadingImg').hide();
//     $('#mask, #loadingImg').empty();  
// }

function displayOutPut(){
    document.getElementById('question11').style.display = "none";
    document.getElementById('yourNovelIsHere').style.display = "block";
}

function autoTyping(elementClass, typingSpeed) {
    let thisTxt = $(elementClass);
    thisTxt.prepend('<div class="cursor" style="right:initial; left:0;"></div>');
    thisTxt = thisTxt.find(".typingTxt");
    let typingTxt = thisTxt.text().trim().split('');
    let lenOfTxt = typingTxt.length;
    let newTxt = "";

    thisTxt.text("|");
    setTimeout(function(){
        thisTxt.css("opacity",1);
        thisTxt.prev().removeAttr("style");
        thisTxt.text("");

        for(let i=0; i < lenOfTxt; i++){
            (function(i,char){
                setTimeout(function(){
                    newTxt += char;
                    thisTxt.text(newTxt);
                }, i*typingSpeed);
            })(i+1, text[i]);
        }
    }, 1500);
}

