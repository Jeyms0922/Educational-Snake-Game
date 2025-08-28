class EducationalSnakesLadders {
            constructor() {
                this.currentPlayer = 1;
                this.players = {
                    1: { position: 1, score: 0 },
                    2: { position: 1, score: 0 }
                };
                this.gameWon = false;
                this.waitingForQuestion = false;
                
                // Game board special squares
                this.ladders = {
                    4: 14, 9: 31, 17: 7, 20: 38, 28: 84, 40: 59, 51: 67, 63: 81, 71: 91
                };
                
                this.snakes = {
                    98: 78, 95: 75, 93: 73, 87: 24, 64: 60, 62: 19, 56: 53, 49: 11, 47: 26, 16: 6
                };
                
                // Special question squares (bonus points)
                this.specialSquares = [15, 25, 35, 45, 55, 65, 75, 85];
                
                this.questions = {
                    math: [
                        { q: "What is 7 × 8?", options: ["54", "56", "58", "60"], correct: 1 },
                        { q: "What is 144 ÷ 12?", options: ["11", "12", "13", "14"], correct: 1 },
                        { q: "What is 15 + 27?", options: ["41", "42", "43", "44"], correct: 1 },
                        { q: "What is 100 - 37?", options: ["63", "64", "65", "66"], correct: 0 },
                        { q: "What is 9 × 6?", options: ["52", "54", "56", "58"], correct: 1 },
                        { q: "What is the square of 8?", options: ["62", "64", "66", "68"], correct: 1 }
                    ],
                    science: [
                        { q: "What planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], correct: 1 },
                        { q: "How many bones are in an adult human body?", options: ["204", "206", "208", "210"], correct: 1 },
                        { q: "What gas do plants absorb from the air?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
                        { q: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Silver"], correct: 2 },
                        { q: "How many chambers does a human heart have?", options: ["2", "3", "4", "5"], correct: 2 },
                        { q: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippo"], correct: 1 }
                    ],
                    history: [
                        { q: "Who was the first person to walk on the moon?", options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"], correct: 1 },
                        { q: "In which year did World War II end?", options: ["1944", "1945", "1946", "1947"], correct: 1 },
                        { q: "Who built the pyramids?", options: ["Romans", "Greeks", "Egyptians", "Babylonians"], correct: 2 },
                        { q: "Which ocean did the Titanic sink in?", options: ["Pacific", "Atlantic", "Indian", "Arctic"], correct: 1 },
                        { q: "Who painted the Mona Lisa?", options: ["Picasso", "Van Gogh", "Da Vinci", "Michelangelo"], correct: 2 },
                        { q: "What year did the Berlin Wall fall?", options: ["1987", "1988", "1989", "1990"], correct: 2 }
                    ],
                    vocabulary: [
                        { q: "What does 'enormous' mean?", options: ["Very small", "Very large", "Very fast", "Very slow"], correct: 1 },
                        { q: "What is a synonym for 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], correct: 1 },
                        { q: "What does 'transparent' mean?", options: ["Colorful", "Heavy", "See-through", "Rough"], correct: 2 },
                        { q: "What is the opposite of 'ancient'?", options: ["Old", "Modern", "Big", "Small"], correct: 1 },
                        { q: "What does 'migrate' mean?", options: ["To sleep", "To eat", "To move", "To sing"], correct: 2 },
                        { q: "What is a 'decade'?", options: ["5 years", "10 years", "15 years", "20 years"], correct: 1 }
                    ]
                };
                
                this.init();
            }
            
            init() {
                this.createBoard();
                this.updateDisplay();
                this.bindEvents();
            }
            
            createBoard() {
                const board = document.getElementById('gameBoard');
                board.innerHTML = '';
                
                // Create 100 squares (10x10 grid)
                for (let row = 9; row >= 0; row--) {
                    for (let col = 0; col < 10; col++) {
                        let squareNum;
                        if (row % 2 === 1) {
                            squareNum = row * 10 + (10 - col);
                        } else {
                            squareNum = row * 10 + (col + 1);
                        }
                        
                        const square = document.createElement('div');
                        square.className = 'square';
                        square.id = `square-${squareNum}`;
                        
                        // Add special square styling
                        if (this.ladders[squareNum]) {
                            square.classList.add('ladder');
                            square.innerHTML = `${squareNum}<br>🪜`;
                        } else if (this.snakes[squareNum]) {
                            square.classList.add('snake');
                            square.innerHTML = `${squareNum}<br>🐍`;
                        } else if (this.specialSquares.includes(squareNum)) {
                            square.classList.add('special');
                            square.innerHTML = `${squareNum}<br>⭐`;
                        } else {
                            square.textContent = squareNum;
                        }
                        
                        board.appendChild(square);
                    }
                }
                
                this.updatePlayerPositions();
            }
            
            updatePlayerPositions() {
                // Remove all players from squares
                document.querySelectorAll('.player').forEach(p => p.remove());
                
                // Add players to their current positions
                for (let player in this.players) {
                    const position = this.players[player].position;
                    const square = document.getElementById(`square-${position}`);
                    if (square) {
                        const playerElement = document.createElement('div');
                        playerElement.className = `player player${player}`;
                        playerElement.textContent = player;
                        square.appendChild(playerElement);
                    }
                }
            }
            
            updateDisplay() {
                document.getElementById('player1Pos').textContent = this.players[1].position;
                document.getElementById('player2Pos').textContent = this.players[2].position;
                document.getElementById('player1Score').textContent = this.players[1].score;
                document.getElementById('player2Score').textContent = this.players[2].score;
                
                // Update active player
                document.getElementById('player1Info').classList.toggle('active', this.currentPlayer === 1);
                document.getElementById('player2Info').classList.toggle('active', this.currentPlayer === 2);
                
                this.updatePlayerPositions();
            }
            
            bindEvents() {
                document.getElementById('rollBtn').addEventListener('click', () => this.rollDice());
            }
            
            rollDice() {
                if (this.gameWon || this.waitingForQuestion) return;
                
                const dice = document.getElementById('dice');
                const rollBtn = document.getElementById('rollBtn');
                
                dice.classList.add('rolling');
                rollBtn.disabled = true;
                
                setTimeout(() => {
                    const roll = Math.floor(Math.random() * 6) + 1;
                    dice.textContent = roll;
                    dice.classList.remove('rolling');
                    
                    this.movePlayer(roll);
                }, 1000);
            }
            
            movePlayer(steps) {
                const newPosition = Math.min(this.players[this.currentPlayer].position + steps, 100);
                this.players[this.currentPlayer].position = newPosition;
                
                this.updateDisplay();
                
                if (newPosition === 100) {
                    this.endGame();
                    return;
                }
                
                // Check for special squares
                this.checkSpecialSquare(newPosition);
            }
            
            checkSpecialSquare(position) {
                if (this.ladders[position]) {
                    this.showQuestion('ladder', position);
                } else if (this.snakes[position]) {
                    this.showQuestion('snake', position);
                } else if (this.specialSquares.includes(position)) {
                    this.showQuestion('bonus', position);
                } else {
                    this.nextTurn();
                }
            }
            
            showQuestion(type, position) {
                this.waitingForQuestion = true;
                const categories = Object.keys(this.questions);
                const category = categories[Math.floor(Math.random() * categories.length)];
                const questionSet = this.questions[category];
                const question = questionSet[Math.floor(Math.random() * questionSet.length)];
                
                document.getElementById('questionCategory').textContent = 
                    `${category.charAt(0).toUpperCase() + category.slice(1)} Question`;
                document.getElementById('questionText').textContent = question.q;
                
                const optionsContainer = document.getElementById('answerOptions');
                optionsContainer.innerHTML = '';
                
                question.options.forEach((option, index) => {
                    const button = document.createElement('button');
                    button.className = 'answer-btn';
                    button.textContent = option;
                    button.addEventListener('click', () => this.answerQuestion(index, question.correct, type, position));
                    optionsContainer.appendChild(button);
                });
                
                document.getElementById('questionModal').style.display = 'flex';
            }
            
            answerQuestion(selected, correct, type, position) {
                const buttons = document.querySelectorAll('.answer-btn');
                const isCorrect = selected === correct;
                
                buttons[selected].classList.add(isCorrect ? 'correct' : 'incorrect');
                if (!isCorrect) {
                    buttons[correct].classList.add('correct');
                }
                
                setTimeout(() => {
                    document.getElementById('questionModal').style.display = 'none';
                    this.handleQuestionResult(isCorrect, type, position);
                }, 2000);
            }
            
            handleQuestionResult(correct, type, position) {
                let message = '';
                
                if (type === 'ladder') {
                    if (correct) {
                        this.players[this.currentPlayer].position = this.ladders[position];
                        this.players[this.currentPlayer].score += 10;
                        message = `🎉 Correct! Player ${this.currentPlayer} climbs the ladder!`;
                    } else {
                        message = `❌ Wrong answer! Player ${this.currentPlayer} stays put.`;
                    }
                } else if (type === 'snake') {
                    if (correct) {
                        this.players[this.currentPlayer].score += 5;
                        message = `🎉 Correct! Player ${this.currentPlayer} avoids the snake!`;
                    } else {
                        this.players[this.currentPlayer].position = this.snakes[position];
                        message = `🐍 Wrong answer! Player ${this.currentPlayer} slides down the snake!`;
                    }
                } else if (type === 'bonus') {
                    if (correct) {
                        this.players[this.currentPlayer].score += 15;
                        message = `⭐ Excellent! Player ${this.currentPlayer} earns bonus points!`;
                    } else {
                        message = `❌ Wrong answer, but no penalty for bonus questions!`;
                    }
                }
                
                document.getElementById('gameMessage').textContent = message;
                this.updateDisplay();
                this.waitingForQuestion = false;
                
                if (this.players[this.currentPlayer].position === 100) {
                    this.endGame();
                } else {
                    setTimeout(() => this.nextTurn(), 2000);
                }
            }
            
            nextTurn() {
                this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
                document.getElementById('gameMessage').textContent = 
                    `Player ${this.currentPlayer}'s turn! Roll the dice!`;
                document.getElementById('rollBtn').disabled = false;
                this.updateDisplay();
            }
            
            endGame() {
                this.gameWon = true;
                const winner = this.currentPlayer;
                const finalScore = this.players[winner].score;
                
                document.getElementById('gameMessage').innerHTML = 
                    `🏆 Player ${winner} wins with ${finalScore} points! 🎉`;
                document.getElementById('gameMessage').classList.add('win-message');
                
                document.getElementById('rollBtn').textContent = 'Game Over!';
                document.getElementById('rollBtn').disabled = true;
            }
        }
        
        // Start the game when page loads
        window.addEventListener('DOMContentLoaded', () => {
            new EducationalSnakesLadders();
        });

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'97647b19a45fba0b',t:'MTc1NjM5MTE1Ny4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
