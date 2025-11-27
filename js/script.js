/********************* Bài 1: Carousel *********************/
let carouselIndex = 0;
const carouselSlides = document.querySelectorAll('.carousel-slides img');
const carouselContainer = document.querySelector('.carousel-slides');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let carouselTimer;

// Chỉ chạy nếu có carousel trên trang này
if (carouselSlides.length) {
    function showSlide(index) {
        // xử lý vượt ra ngoài, vòng lại (out-of-bound)
        if (index < 0) index = carouselSlides.length - 1;
        if (index >= carouselSlides.length) index = 0;
        carouselIndex = index;
        // chỉ cần dịch chuyển slide qua transform
        carouselContainer.style.transform = `translateX(-${carouselIndex * carouselSlides[0].clientWidth}px)`;
    }

    function nextSlide() {
        showSlide(carouselIndex + 1);
    }
    function prevSlide() {
        showSlide(carouselIndex - 1);
    }
    function startCarousel() {
        carouselTimer = setInterval(nextSlide, 3000);
    }
    function stopCarousel() {
        clearInterval(carouselTimer);
    }

    prevBtn.onclick = function() {
        stopCarousel();
        prevSlide();
        startCarousel();
    };
    nextBtn.onclick = function() {
        stopCarousel();
        nextSlide();
        startCarousel();
    };

    showSlide(carouselIndex);
    startCarousel();

    // Responsive: Khi resize thì cập nhật lại vị trí slide
    window.addEventListener('resize', () => showSlide(carouselIndex));
}

/********************* Bài 2: Todo List *********************/
let todos = JSON.parse(localStorage.getItem('todos_241A010766') || '[]');
const todoListEl = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');

function renderTodos() {
    if (!todoListEl) return;
    todoListEl.innerHTML = '';
    todos.forEach((todo, idx) => {
        // Task
        const item = document.createElement('div');
        item.textContent = todo;
        item.className = 'todo-item';
        // Actions
        const actions = document.createElement('div');
        actions.className = 'todo-actions';
        // Edit
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Sửa';
        editBtn.onclick = function(){
            let newTask = prompt('Sửa công việc:', todo);
            if (newTask && newTask.trim()) {
                todos[idx] = newTask.trim();
                saveTodos();
                renderTodos();
            }
        };
        // Delete
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Xóa';
        delBtn.onclick = function(){
            if (confirm('Xác nhận xóa?')) {
                todos.splice(idx, 1);
                saveTodos();
                renderTodos();
            }
        };
        actions.appendChild(editBtn);
        actions.appendChild(delBtn);

        // Gắn vào danh sách dùng grid
        todoListEl.appendChild(item);
        todoListEl.appendChild(actions);
    });
}
function saveTodos() {
    localStorage.setItem('todos_241A010766', JSON.stringify(todos));
}
function addTodo() {
    if(!todoInput) return;
    let val = todoInput.value.trim();
    if(val) {
        todos.push(val);
        saveTodos();
        renderTodos();
        todoInput.value = '';
    }
}
if(todoListEl) renderTodos();

/********************* Bài 3: Game đoán số *********************/
let randomNumber = Math.floor(Math.random()*100)+1;
let guessCount = 0;
const guessInput = document.getElementById('guess-input');
const guessMsg = document.getElementById('guess-msg');
const guessCountEl = document.getElementById('guess-count');
const confettiBox = document.getElementById('confetti');

function resetGuessGame(){
    randomNumber = Math.floor(Math.random()*100)+1;
    guessCount = 0;
    if(guessCountEl) guessCountEl.textContent = '';
    if(guessMsg) guessMsg.textContent = '';
    if(guessInput) guessInput.value = '';
    if(confettiBox) confettiBox.style.display = 'none';
}

function checkGuess() {
    if(!guessInput) return;
    let val = Number(guessInput.value);
    if(!val || val < 1 || val > 100) {
        if(guessMsg) guessMsg.textContent = 'Vui lòng nhập số từ 1-100!';
        return;
    }
    guessCount++;
    guessCountEl.textContent = `Số lần thử: ${guessCount}`;
    if(val > randomNumber) {
        guessMsg.textContent = 'Quá cao!';
    } else if(val < randomNumber) {
        guessMsg.textContent = 'Quá thấp!';
    } else {
        guessMsg.textContent = 'Chính xác!';
        showConfetti();
    }
}
function showConfetti(){
    if(!confettiBox) return;
    confettiBox.innerHTML = '';
    confettiBox.style.display = 'block';
    let colors = ['#e74c3c','#f1c40f','#2ecc71','#3498db','#9b59b6','#e67e22'];
    for(let i=0; i<16; i++) {
        let c = document.createElement('div');
        c.className = 'confetti-piece';
        c.style.left = (Math.random()*90+5)+'%';
        c.style.background = colors[i%colors.length];
        confettiBox.appendChild(c);
    }
    setTimeout(()=>confettiBox.style.display='none',1800);
}