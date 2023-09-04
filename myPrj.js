const data = [];
const $textarea = document.querySelector('textarea');

const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

const tabBtns = document.querySelectorAll('.tabBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const TOTAL_PAGE = document.querySelectorAll('.field-container fieldset').length -1;
let CURRENT_PAGE = 1;
let isReplying = false;

const speechBubbleStr = ["힘세고 강한 아침! 묻겠다면, 내 이름은 채피. 우리는  쓴다. AI로 웹소설을", "어떤 장르를 쓰고 싶으세요?", "주인공에 대해 알려주세요.", "조력자는 어떤 인물인가요?", "빌런에 대해 궁금해요!", "이야기의 배경은? ", "주인공에게 무슨 일이 생기나요?", "그 다음엔 어떤 사건을 겪게 되나요?", "그 다음엔 어떻게 되는 거죠??", "이야기의 결말은 어떻게 되나요?","멋진 이야기를 만들기 위해 채피에게 이 이야기만의 멋진 점을 꼭 가르쳐주세요!"];
const textareaIdList = ["title","genre","mc","sc","antagonist","background","event1","event2","event3","ending","moral"];


// 초기화 함수들은 여기에!
document.addEventListener('DOMContentLoaded', function () {
    // 문서가 로드될 때 실행할 코드
    console.log("채피, 발진");
    console.log("TOTAL_PAGES"+TOTAL_PAGE);
    console.log(tabBtns)

    goAheadCat(CURRENT_PAGE); // 고양아 말해
    
    tabBtnOnclick();
    tabBtns[0].classList.add('clicked');
    // setupTextareaBehavior("tabBtn1");
});

function tabBtnOnclick() {
    // 각 버튼에 클릭 이벤트 리스너를 추가합니다.
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const btnId = btn.id;
            const textareaIndex = parseInt(btnId.replace('tabBtn', '')) - 1; // 버튼의 ID로 textarea의 인덱스 계산
            console.log(textareaIndex);
            console.log(btn.id); // 버튼의 ID 가져오기
            const textareaId = textareaIdList[textareaIndex]; // textareaIdList에서 textarea의 ID 가져오기
            console.log(textareaId);
            const textareaTxt = document.getElementById(textareaId); // 해당 ID에 해당하는 textarea 요소 선택
            


            console.log(textareaIndex);
            console.log(textareaTxt);
            

            const currentField = document.getElementById(`question${CURRENT_PAGE}`);
            console.log(CURRENT_PAGE);
            CURRENT_PAGE = textareaIndex+1;
            const nextField = document.getElementById(`question${CURRENT_PAGE}`);

            currentField.style.display = "none";
            nextField.style.display = "block";
            nextBtn.disabled = false;

            if(CURRENT_PAGE < TOTAL_PAGE) {
                console.log("현재 페이지가 마지막 페이지가 아니야");
                nextBtn.disabled = false;
                if(CURRENT_PAGE == 1) {
                    console.log("첫번째 페이지야");
                    // prevBtn.disabled = true;
                }
                else{
                    // prevBtn.disabled = false;
                }
            }
            else if(CURRENT_PAGE == TOTAL_PAGE){
                console.log("현재 페이지가 마지막 페이지야");
                // nextBtn.disabled = true;
            }

            if(CURRENT_PAGE == 10 && isReplying){ 
                displayOutPut();     
            }
            if(CURRENT_PAGE == TOTAL_PAGE){
                nonDisplayOutPut();
            }
 

            // textarea에 대한 이벤트 리스너 등록
            textareaTxt.addEventListener('input', () => {
                // textarea의 내용이 변경되었을 때 실행할 작업
                console.log(`Textarea with ID ${textareaId} 내용이 변경되었습니다.`);
            }); 
            // 클릭된 버튼에 'clicked' 클래스를 추가합니다.
            btn.classList.add('clicked');
            // 다른 버튼들에서 'clicked' 클래스를 제거합니다.
            tabBtns.forEach(otherBtn => {
            if (otherBtn !== btn) {
                otherBtn.classList.remove('clicked');
            }
            });

            // 클릭된 버튼에 대한 동작을 여기에 작성합니다.
            console.log(`${btn.textContent} 버튼이 클릭되었습니다.`);
        });
    });
}

// function setupTextareaBehavior(textareaId) {
//     // textarea 요소를 찾습니다.
//     const textarea = document.getElementById(textareaId);
//     console.log(textarea);
//     // 버튼을 찾습니다.
//     const button = document.getElementById("iDunnoBtn");
  
//     // 버튼의 기본 텍스트를 저장합니다.
//     const originalButtonText = button.textContent;
//     // textarea의 내용이 변경될 때 호출되는 함수를 정의합니다.
//     function handleTextareaChange() {
//         console.log("바뀜");
//         // textarea의 내용을 가져옵니다.

//         // 만약 textarea의 내용이 비어있다면 버튼 텍스트를 원래대로 복구합니다.
//         if (textarea.value.length > 0) {
//             button.textContent = '이걸로 합시다!';
//         } else {
//             button.textContent = originalButtonText;
//         }
//     }
//     // textarea의 내용이 변경될 때마다 위의 함수를 호출하도록 리스너를 추가합니다.
//     textarea.addEventListener('input', handleTextareaChange);

//     // 페이지 로드 시 한 번 호출하여 초기 상태를 설정합니다.
//     handleTextareaChange();
// }




function goAheadCat(CURRENT_PAGE) {

    const theCatSays = speechBubbleStr[CURRENT_PAGE-1];
    document.getElementById('catSay').innerText = theCatSays;
}

function next() {
    if(CURRENT_PAGE < TOTAL_PAGE){
        NEXT_PAGE = CURRENT_PAGE++;
        
        tabBtns[NEXT_PAGE].classList.add('clicked');
    
        goAheadCat(NEXT_PAGE);
    }
}

function prev() {
    if (CURRENT_PAGE > 1) {
        PREV_PAGE = CURRENT_PAGE-1;
        tabBtns[PREV_PAGE].classList.add('clicked');

        goAheadCat(PREV_PAGE);
    }
}

function iDunno(){
    next();
}

data.push({
    "role": "system",
    "content": "assistant는 한국어로 웹소설을 만들어주는 최고의 AI입니다. 최고의 AI답게 제목이랑 등장인물 이름을 멋있게 지어주지요. 스토리도 물론 흥미진진합니다!"
});
// script.js
function generateWebNovel() {

    currentQuestion = 1;
    
    const title = "[제목]" + document.getElementById('title').value || "[제목]";
    const genre = "[장르]"+document.getElementById('genre').value || "[장르]";
    const mc = "[주인공]"+document.getElementById('mc').value || "[주인공]";
    const sc = "[조력자]"+document.getElementById('sc').value || "[조력자]";
    const antagonist = "[빌런]"+document.getElementById('antagonist').value || "[빌런]";
    const background = "[배경]"+document.getElementById('background').value || "[배경]";
    const event1 = "[첫 사건]"+document.getElementById('event1').value || "[첫 사건]";
    const event2 = "[두번째 사건]"+document.getElementById('event2').value || "[두번째 사건]";
    const event3 = "[세번째 사건]"+document.getElementById('event3').value || "[세번째 사건]";
    const ending = "[엔딩]"+document.getElementById('ending').value || "[엔딩]";
    const moral = "[덧붙여서..]"+document.getElementById('moral').value || "[덧붙여서..]";
    
    const output = `
        ${title}
        <br>
        ${genre}
        <br>
        ${mc}
        <br>
        ${sc}
        <br>
        ${antagonist}
        <br>
        ${background}
        <br>
        ${event1}
        <br>
        ${event2}
        <br>
        ${event3}
        <br>
        ${ending}
        <br>
        ${moral}
        <br>
    `;

    data.push({
        "role": "user",
        "content": output
    });
    $textarea.value = '';
    console.log(output);
    chatGPTAPI();
    isReplying = true;
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
        document.getElementById('output').innerHTML = `<p class='typingTxt' style='white-space: pre-line;'>${replying}</p>`

        console.log(replying);
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

function nonDisplayOutPut(){
   
    document.getElementById('yourNovelIsHere').style.display = "none";
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

// menuTabActivate();

// function menuTabActivate() {

// 	// Menu Tabular
// 	var $menu_tabs = $('.menu__tabs li a'); 
// 	$menu_tabs.on('click', function(e) {
// 		e.preventDefault();
// 		$menu_tabs.removeClass('active');
// 		$(this).addClass('active');

// 		$('.menu__item').fadeOut(300);
// 		$(this.hash).delay(300).fadeIn();
// 	});

// };