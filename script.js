
const $ = (id) => document.getElementById(id);

const questions = [
  {q:"She _____ to school every morning.",a:["go","goes","going","gone"],c:1,level:"easy",why:"She là ngôi thứ ba số ít nên động từ hiện tại đơn thêm -es."},
  {q:"I _____ English for five years.",a:["study","studied","have studied","am study"],c:2,level:"medium",why:"For five years diễn tả khoảng thời gian kéo dài đến hiện tại, dùng hiện tại hoàn thành."},
  {q:"If I _____ rich, I would travel around the world.",a:["am","was","were","be"],c:2,level:"medium",why:"Câu điều kiện loại 2 thường dùng were trong mệnh đề If."},
  {q:"Choose the word closest in meaning to 'enormous'.",a:["Tiny","Huge","Weak","Narrow"],c:1,level:"easy",why:"Enormous có nghĩa là rất lớn, gần nghĩa với huge."},
  {q:"The book _____ by millions of people every year.",a:["reads","is read","read","is reading"],c:1,level:"medium",why:"Câu bị động hiện tại đơn: am/is/are + V3."},
  {q:"Although it was raining, we _____ football.",a:["played","playing","plays","has played"],c:0,level:"easy",why:"Although + mệnh đề. Hai vế có thể kết hợp với quá khứ đơn."},
  {q:"Choose the correct word: She is interested _____ learning languages.",a:["on","at","in","for"],c:2,level:"easy",why:"Cụm từ đúng là be interested in something/V-ing."},
  {q:"By the time we arrived, the film _____.",a:["starts","has started","had started","starting"],c:2,level:"hard",why:"Một hành động xảy ra trước một thời điểm trong quá khứ: quá khứ hoàn thành."},
  {q:"Which sentence is grammatically correct?",a:["He don't like tea.","She doesn't likes tea.","They doesn't like tea.","He doesn't like tea."],c:3,level:"easy",why:"He doesn't + động từ nguyên mẫu."},
  {q:"The more you practice, _____ you become.",a:["the better","better","the best","best"],c:0,level:"hard",why:"Cấu trúc so sánh kép: The + comparative, the + comparative."},
  {q:"Choose the correct form: I wish I _____ speak English fluently.",a:["can","could","will","am"],c:1,level:"medium",why:"Wish diễn tả mong ước trái với hiện tại thường dùng quá khứ đơn hoặc could."},
  {q:"The opposite of 'generous' is _____.",a:["Kind","Selfish","Friendly","Helpful"],c:1,level:"easy",why:"Generous là hào phóng; selfish là ích kỷ."},
  {q:"Neither Tom nor his friends _____ at home.",a:["is","are","was","be"],c:1,level:"hard",why:"Với neither...nor, động từ thường hòa hợp với chủ ngữ gần nhất: friends."},
  {q:"We should reduce plastic waste _____ protect the environment.",a:["so that","in order to","because","although"],c:1,level:"medium",why:"In order to + động từ nguyên mẫu, diễn tả mục đích."},
  {q:"She speaks English _____ than her brother.",a:["fluent","more fluently","most fluently","fluency"],c:1,level:"medium",why:"So sánh hơn của trạng từ fluently là more fluently."},
  {q:"I am looking forward to _____ you.",a:["see","seeing","saw","seen"],c:1,level:"hard",why:"Look forward to + V-ing."}
];

const library = [
  {icon:"📖",title:"Present Simple",desc:"Thì hiện tại đơn – diễn tả thói quen và sự thật.",detail:"Công thức:\n(+) S + V(s/es)\n(-) S + do/does not + V\n(?) Do/Does + S + V?\nDấu hiệu: always, usually, often, sometimes, every day."},
  {icon:"⏳",title:"Present Perfect",desc:"Thì hiện tại hoàn thành – hành động liên quan đến hiện tại.",detail:"Công thức:\nS + have/has + V3/ed\nDấu hiệu: since, for, already, yet, just, ever, never."},
  {icon:"🔄",title:"Passive Voice",desc:"Câu bị động – nhấn mạnh đối tượng chịu tác động.",detail:"Công thức cơ bản:\nS + be + V3/ed\nVí dụ: English is spoken around the world."},
  {icon:"🧩",title:"Conditionals",desc:"Câu điều kiện loại 1, 2 và 3.",detail:"Loại 1: If + hiện tại đơn, will + V\nLoại 2: If + quá khứ đơn, would + V\nLoại 3: If + had + V3, would have + V3."},
  {icon:"🌟",title:"Vocabulary: Education",desc:"Từ vựng chủ đề giáo dục.",detail:"Achievement: thành tựu\nKnowledge: kiến thức\nScholarship: học bổng\nAssignment: bài tập được giao\nAcademic: thuộc học thuật."},
  {icon:"🌍",title:"Vocabulary: Environment",desc:"Từ vựng chủ đề môi trường.",detail:"Biodiversity: đa dạng sinh học\nSustainable: bền vững\nPollution: ô nhiễm\nRenewable energy: năng lượng tái tạo\nConservation: sự bảo tồn."},
  {icon:"🔗",title:"Linking Words",desc:"Từ nối giúp bài viết mạch lạc.",detail:"Moreover: hơn nữa\nHowever: tuy nhiên\nTherefore: do đó\nAlthough: mặc dù\nIn addition: thêm vào đó\nAs a result: kết quả là."},
  {icon:"💡",title:"Comparisons",desc:"Cấu trúc so sánh trong Tiếng Anh.",detail:"So sánh hơn: adj-er / more + adj\nSo sánh nhất: the adj-est / the most + adj\nSo sánh bằng: as + adj + as."},
  {icon:"🎯",title:"Gerunds & Infinitives",desc:"Phân biệt V-ing và to V.",detail:"Enjoy, avoid, finish + V-ing\nWant, decide, hope + to V\nLook forward to + V-ing."}
];

const samplePlayers = [
  {name:"English Master",points:850},
  {name:"Blue Penguin",points:720},
  {name:"Study Champion",points:640},
  {name:"Grammar Hero",points:510}
];

let state = loadState();
let currentQuestions = [];
let currentIndex = 0;
let answers = [];
let quizMode = "quiz";
let room = null;
let selectedName = state.name || "Học sinh";

function loadState() {
  try {
    return JSON.parse(localStorage.getItem("giahuyStudyData")) || {
      name:"Học sinh", history:[], points:0
    };
  } catch {
    return {name:"Học sinh",history:[],points:0};
  }
}

function saveState() {
  localStorage.setItem("giahuyStudyData",JSON.stringify(state));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  })[char]);
}

function updateDashboard() {
  const history = state.history;
  const attempts = history.length;
  const average = attempts
    ? history.reduce((sum,item)=>sum+item.score,0)/attempts : 0;
  const correct = history.reduce((sum,item)=>sum+item.correct,0);

  $("statAttempts").textContent = attempts;
  $("statAverage").textContent = average.toFixed(1);
  $("statCorrect").textContent = correct;
  $("statPoints").textContent = state.points;
  $("scoreAttempts").textContent = attempts;
  $("scoreAverage").textContent = average.toFixed(1);
  $("scoreBest").textContent = attempts ? Math.max(...history.map(x=>x.score)).toFixed(1) : "0";
  $("scorePoints").textContent = state.points;

  $("profileName").textContent = state.name;
  $("welcomeName").textContent = state.name;
  $("topName")?.textContent;
  $("recentActivity").innerHTML = history.length
    ? history.slice(-3).reverse().map(item=>`
      <div class="recent-row">
        <span>${escapeHTML(item.mode)} · ${escapeHTML(item.date)}</span>
        <b>${item.score.toFixed(1)}/10</b>
      </div>`).join("")
    : "Chưa có hoạt động nào. Hãy làm bài Quiz đầu tiên nhé!";

  $("historyList").innerHTML = history.length
    ? history.slice().reverse().map(item=>`
      <div class="history-row">
        <div><b>${escapeHTML(item.mode)}</b><small>${escapeHTML(item.date)} · ${item.correct}/${item.total} câu đúng</small></div>
        <span class="history-score">${item.score.toFixed(1)}/10</span>
      </div>`).join("")
    : '<div class="empty-state">Bạn chưa có kết quả nào.</div>';

  renderLeaderboard();
}

function renderLeaderboard() {
  const players = [...samplePlayers];
  players.push({name:state.name,points:state.points});
  players.sort((a,b)=>b.points-a.points);

  $("leaderboardList").innerHTML = players.map((player,index)=>`
    <div class="leader-row">
      <div class="leader-left">
        <div class="rank-number">${index+1}</div>
        <div><span class="leader-name">${escapeHTML(player.name)}</span>
        <small>${player.name===state.name ? "Bạn" : "English learner"}</small></div>
      </div>
      <div class="leader-points">${player.points} pts</div>
    </div>`).join("");
}

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page=>page.classList.remove("active-page"));
  const target = $(pageId);
  if (!target) return;
  target.classList.add("active-page");

  document.querySelectorAll(".nav-link").forEach(link=>{
    link.classList.toggle("active",link.dataset.page===pageId);
  });

  const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
  $("pageName").textContent = activeLink ? activeLink.textContent.trim() : "GiaHuy Study";
  $("sidebar").classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll(".nav-link").forEach(button=>{
  button.addEventListener("click",()=>showPage(button.dataset.page));
});

document.querySelectorAll("[data-go]").forEach(card=>{
  card.addEventListener("click",()=>showPage(card.dataset.go));
});

$("mobileMenu").addEventListener("click",()=>{
  $("sidebar").classList.toggle("open");
});

function changeName() {
  const newName = prompt("Nhập tên hiển thị của bạn:",state.name);
  if (newName && newName.trim()) {
    state.name = newName.trim().slice(0,24);
    saveState();
    updateDashboard();
  }
}
$("changeName").addEventListener("click",changeName);

function renderLibrary(search="") {
  const filtered = library.filter(item=>
    (item.title+" "+item.desc+" "+item.detail).toLowerCase().includes(search.toLowerCase())
  );

  $("libraryGrid").innerHTML = filtered.length
    ? filtered.map(item=>`
      <article class="library-card">
        <div class="lib-icon">${item.icon}</div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.desc)}</p>
        <div class="lib-detail">${escapeHTML(item.detail)}</div>
      </article>`).join("")
    : '<div class="empty-state">Không tìm thấy tài liệu phù hợp.</div>';
}

$("librarySearch").addEventListener("input",event=>{
  renderLibrary(event.target.value);
});

function startTest(mode) {
  quizMode = mode;
  const level = mode==="exam" ? "all" : $("quizLevel").value;
  let pool = questions.filter(q=>level==="all" || q.level===level);
  pool = [...pool].sort(()=>Math.random()-.5);
  currentQuestions = pool.slice(0,10);
  currentIndex = 0;
  answers = new Array(currentQuestions.length).fill(null);
  renderQuestion();
  showPage(mode==="exam" ? "exam" : "quiz");
}

$("startQuiz").addEventListener("click",()=>startTest("quiz"));
$("startExam").addEventListener("click",()=>startTest("exam"));
$("quickBattle").addEventListener("click",()=>startTest("battle"));

function renderQuestion() {
  const area = quizMode==="exam" ? $("examArea") : $("quizArea");
  const q = currentQuestions[currentIndex];
  if (!q) return;

  const letters = ["A","B","C","D"];
  area.innerHTML = `
    <div class="question-card">
      <div class="question-meta">QUESTION ${currentIndex+1} / ${currentQuestions.length} · ${q.level.toUpperCase()}</div>
      <div class="progress-track"><div class="progress-fill" style="width:${(currentIndex+1)/currentQuestions.length*100}%"></div></div>
      <h3>${escapeHTML(q.q)}</h3>
      <div class="answer-list">
        ${q.a.map((answer,index)=>`
          <label class="answer-option ${answers[currentIndex]===index?"selected":""}">
            <input type="radio" name="answer" value="${index}" ${answers[currentIndex]===index?"checked":""}>
            <b>${letters[index]}.</b> ${escapeHTML(answer)}
          </label>`).join("")}
      </div>
      <div class="quiz-controls">
        <button class="secondary-btn" id="previousQuestion" ${currentIndex===0?"disabled":""}>← Câu trước</button>
        <span style="font-size:10px;color:#8792a6">${currentIndex+1} / ${currentQuestions.length}</span>
        <button class="primary-btn" id="nextQuestion">${currentIndex===currentQuestions.length-1?"Nộp bài":"Câu tiếp →"}</button>
      </div>
    </div>`;

  area.querySelectorAll('input[name="answer"]').forEach(input=>{
    input.addEventListener("change",()=>{
      answers[currentIndex] = Number(input.value);
      area.querySelectorAll(".answer-option").forEach(option=>option.classList.remove("selected"));
      input.closest(".answer-option").classList.add("selected");
    });
  });

  $("previousQuestion").addEventListener("click",()=>{
    if (currentIndex>0) { currentIndex--; renderQuestion(); }
  });

  $("nextQuestion").addEventListener("click",()=>{
    if (currentIndex<currentQuestions.length-1) {
      currentIndex++;
      renderQuestion();
    } else {
      finishTest();
    }
  });
}

function finishTest() {
  let correct = 0;
  currentQuestions.forEach((q,index)=>{
    if (answers[index]===q.c) correct++;
  });

  const score = correct/currentQuestions.length*10;
  const earned = correct*10;
  state.points += earned;

  const modeName = quizMode==="exam" ? "Đề kiểm tra"
    : quizMode==="battle" ? "Đấu trường" : "Luyện tập Quiz";

  state.history.push({
    mode:modeName,
    score,
    correct,
    total:currentQuestions.length,
    date:new Date().toLocaleString("vi-VN")
  });

  saveState();
  updateDashboard();

  const area = quizMode==="exam" ? $("examArea") : $("quizArea");
  const message = score>=8 ? "Tuyệt vời! Bạn đã làm rất tốt! 🎉"
    : score>=5 ? "Khá tốt! Hãy tiếp tục cố gắng nhé! 💪"
    : "Đừng nản lòng! Sai là cơ hội để học tốt hơn. 🌱";

  area.innerHTML = `
    <div class="question-card result-card">
      <div style="font-size:42px">🏆</div>
      <h2>Hoàn thành bài thi!</h2>
      <div class="result-score">${score.toFixed(1)}<small style="font-size:16px">/10</small></div>
      <p>${message}</p>
      <p>Bạn trả lời đúng <b>${correct}/${currentQuestions.length}</b> câu.</p>
      <p>Bạn nhận được <b>${earned} Study points</b>.</p>
      <button class="primary-btn" id="reviewAnswers">Xem đáp án và giải thích</button>
      <button class="secondary-btn" id="tryAgain" style="margin-left:7px">Làm bài mới</button>
    </div>
    <div id="answerReview"></div>`;

  $("reviewAnswers").addEventListener("click",()=>{
    $("answerReview").innerHTML = currentQuestions.map((q,index)=>`
      <div class="question-card">
        <div class="question-meta">CÂU ${index+1} · ${answers[index]===q.c?"ĐÚNG ✓":"CHƯA ĐÚNG ✗"}</div>
        <h3>${escapeHTML(q.q)}</h3>
        <p style="font-size:11px;line-height:1.8;color:#60718e">
          Đáp án: <b>${escapeHTML(q.a[q.c])}</b><br>
          ${escapeHTML(q.why)}
        </p>
      </div>`).join("");
  });

  $("tryAgain").addEventListener("click",()=>startTest(quizMode));
  area.scrollIntoView({behavior:"smooth"});
}

function createRoom() {
  room = Math.random().toString(36).substring(2,8).toUpperCase();
  $("arenaMessage").innerHTML = `
    <b>🎉 Đã tạo phòng thi!</b><br>
    Mã phòng của bạn: <strong style="font-size:22px;color:#2563eb">${room}</strong>
    <br>Hãy chia sẻ mã này với bạn bè. Đây là phòng mô phỏng trên thiết bị hiện tại.`;
}
$("createRoom").addEventListener("click",createRoom);

$("joinRoom").addEventListener("click",()=>{
  const code = $("roomCode").value.trim().toUpperCase();
  if (!code) {
    $("arenaMessage").textContent = "Bạn hãy nhập mã phòng trước nhé.";
  } else if (room && code===room) {
    $("arenaMessage").innerHTML = "✅ Mã phòng hợp lệ! Bạn đã tham gia phòng mô phỏng. Nhấn Thi nhanh để bắt đầu.";
  } else {
    $("arenaMessage").textContent = "Không tìm thấy phòng này trên thiết bị hiện tại. Phiên bản này chưa có hệ thống phòng trực tuyến.";
  }
});

$("clearHistory").addEventListener("click",()=>{
  if (confirm("Bạn có chắc muốn xóa toàn bộ lịch sử làm bài?")) {
    state.history = [];
    state.points = 0;
    saveState();
    updateDashboard();
  }
});

function assistantReply(message) {
  const text = message.toLowerCase();

  if (text.includes("present perfect") || text.includes("hiện tại hoàn thành")) {
    return "📘 PRESENT PERFECT – THÌ HIỆN TẠI HOÀN THÀNH\n\nCông thức: S + have/has + V3/ed.\n\nCách dùng:\n• Diễn tả hành động bắt đầu trong quá khứ và còn liên quan đến hiện tại.\n• Diễn tả trải nghiệm.\n\nDấu hiệu: since, for, already, yet, just, ever, never.\n\nVí dụ: I have studied English for five years.\n→ Mình đã học Tiếng Anh được 5 năm.";
  }

  if (text.includes("little")) {
    return "📘 LITTLE VÀ A LITTLE\n\n• Little + danh từ không đếm được: rất ít, gần như không có.\n• A little + danh từ không đếm được: một chút, vẫn có một ít.\n\nVí dụ:\nThere is little water left. → Còn rất ít nước.\nThere is a little water left. → Vẫn còn một chút nước.\n\nMẹo: Có chữ A thường mang ý nghĩa tích cực hơn.";
  }

  if (text.includes("although") || text.includes("despite")) {
    return "📘 ALTHOUGH VÀ DESPITE\n\n• Although + S + V.\n• Despite + danh từ / cụm danh từ / V-ing.\n\nVí dụ:\nAlthough it rained, we went out.\nDespite the rain, we went out.\n\nKhông dùng Although ... but trong cùng một cấu trúc thông thường.";
  }

  if (text.includes("vocabulary") || text.includes("từ vựng")) {
    return "📘 MẸO HỌC TỪ VỰNG\n\n1. Học từ trong câu hoàn chỉnh.\n2. Ghi nhớ từ loại và cách kết hợp từ.\n3. Tự đặt ví dụ.\n4. Ôn lại theo khoảng cách thời gian.\n\nBạn có thể gửi một từ Tiếng Anh cụ thể để mình giải thích nghĩa và cách dùng.";
  }

  if (text.includes("wish") || text.includes("câu ước")) {
    return "📘 WISH – CÂU ƯỚC\n\n• Ước trái với hiện tại: S + wish(es) + S + V2/ed.\n• Ước về tương lai: S + wish(es) + S + would + V.\n• Ước trái với quá khứ: S + wish(es) + S + had + V3.\n\nVí dụ: I wish I were taller.";
  }

  if (text.includes("passive") || text.includes("bị động")) {
    return "📘 PASSIVE VOICE – CÂU BỊ ĐỘNG\n\nCấu trúc cơ bản:\nS + be + V3/ed (+ by O).\n\nVí dụ chủ động: People speak English worldwide.\nBị động: English is spoken worldwide.\n\nHãy xác định thì của câu chủ động để chia động từ be cho đúng.";
  }

  if (text.includes("hello") || text.includes("xin chào") || text.includes("hi")) {
    return "Xin chào! 👋 Rất vui được đồng hành cùng bạn. Hôm nay chúng ta sẽ học Tiếng Anh nhé! Bạn có thể hỏi về ngữ pháp, từ vựng hoặc cách làm bài.";
  }

  return "Mình đã nhận được câu hỏi của bạn! 💙\n\nTrợ lý hiện tại là phiên bản mẫu với một số chủ đề Tiếng Anh có sẵn, chưa kết nối AI trực tuyến nên chưa thể hiểu và giải quyết mọi câu hỏi tự do.\n\nBạn hãy thử hỏi về Present Perfect, Little/A little, Although/Despite, Wish hoặc Passive Voice nhé.";
}

function addChatMessage(message,type) {
  const div = document.createElement("div");
  div.className = type==="user" ? "user-message" : "bot-message";
  div.textContent = message;
  $("chatMessages").appendChild(div);
  $("chatMessages").scrollTop = $("chatMessages").scrollHeight;
}

$("chatForm").addEventListener("submit",event=>{
  event.preventDefault();
  const message = $("chatInput").value.trim();
  if (!message) return;

  addChatMessage(message,"user");
  $("chatInput").value = "";

  setTimeout(()=>{
    addChatMessage(assistantReply(message),"bot");
  },300);
});

document.querySelectorAll(".chat-suggestions button").forEach(button=>{
  button.addEventListener("click",()=>{
    const question = button.dataset.question;
    addChatMessage(question,"user");
    setTimeout(()=>addChatMessage(assistantReply(question),"bot"),300);
  });
});

renderLibrary();
updateDashboard();
