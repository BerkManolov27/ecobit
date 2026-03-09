import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Badge, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";

const ITEMS = [
  { name: "Пластмасова бутилка", type: "plastic", icon: "🧴" },
  { name: "Кутия от сок", type: "paper", icon: "📦" },
  { name: "Бананова кора", type: "organic", icon: "🍌" },
  { name: "Стъклено шише", type: "glass", icon: "🍾" },
  { name: "Вестник", type: "paper", icon: "📰" },
  { name: "Консерва", type: "metal", icon: "🥫" },
  { name: "Ябълкова огризка", type: "organic", icon: "🍎" },
  { name: "Пластмасова торбичка", type: "plastic", icon: "🛍️" },
  { name: "Буркан", type: "glass", icon: "🫙" },
  { name: "Алуминиево фолио", type: "metal", icon: "🧻" },
];

const BINS = [
  { key: "plastic", label: "Пластмаса", color: "#00a6a6", icon: "♻️" },
  { key: "paper", label: "Хартия", color: "#f4b400", icon: "📄" },
  { key: "organic", label: "Био", color: "#4caf50", icon: "🌱" },
  { key: "glass", label: "Стъкло", color: "#4f83cc", icon: "🍶" },
  { key: "metal", label: "Метал", color: "#7e8894", icon: "⚙️" },
];

function getRandomItem(lastItemName) {
  const filtered = ITEMS.filter((item) => item.name !== lastItemName);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export default function MiniGamePage() {
  const roundTime = 60;
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [lastAction, setLastAction] = useState("Сортирай първия отпадък");
  const [currentItem, setCurrentItem] = useState(() => getRandomItem(""));
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const saved = window.localStorage.getItem("ecobit-high-score");
    return saved ? Number(saved) : 0;
  });

  useEffect(() => {
    if (!isRunning || isFinished) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isFinished]);


  useEffect(() => {
    if (isFinished && score > highScore) {
      setHighScore(score);
      window.localStorage.setItem("ecobit-high-score", String(score));
    }
  }, [isFinished, score, highScore]);

  const chooseBin = (binKey) => {
    if (!isRunning || isFinished) {
      return;
    }

    const isCorrect = binKey === currentItem.type;

    if (isCorrect) {
      const combo = streak + 1;
      const comboBonus = combo >= 4 ? 2 : 0;
      setScore((prev) => prev + 10 + comboBonus);
      setStreak(combo);
      setLastAction(`Точно! +${10 + comboBonus} точки`);
    } else {
      setLives((prev) => {
        const nextLives = prev - 1;
        if (nextLives <= 0) {
          setIsRunning(false);
          setIsFinished(true);
        }
        return nextLives;
      });
      setStreak(0);
      setLastAction("Грешен контейнер. -1 живот");
    }

    setCurrentItem(getRandomItem(currentItem.name));
  };

  const startGame = () => {
    setTimeLeft(60);
    setScore(0);
    setStreak(0);
    setLives(3);
    setLastAction("Играта започна. Успех!");
    setCurrentItem(getRandomItem(""));
    setIsFinished(false);
    setIsRunning(true);
  };

  const accuracyHint = isFinished
    ? score >= 180
      ? "Eco Master"
      : score >= 120
        ? "Eco Hero"
        : "Eco Starter"
    : "В игра";

  const timeProgress = Math.max(0, Math.round((timeLeft / roundTime) * 100));

  return (
    <section className="minigame-page py-5">
      <Container>
        <Row className="justify-content-center mb-4">
          <Col lg={9}>
            <Card className="game-shell border-0">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                  <div>
                    <Badge bg="dark" className="me-2">EcoBit MiniGame</Badge>
                    <span className="game-rank">{accuracyHint}</span>
                  </div>
                  <div className="d-flex gap-3 flex-wrap">
                    <span className="score-pill">Точки: {score}</span>
                    <span className="score-pill">Рекорд: {highScore}</span>
                    <span className="score-pill">Време: {timeLeft}s</span>
                    <span className="score-pill">Живот: {"❤️".repeat(Math.max(lives, 0)) || "0"}</span>
                  </div>
                </div>

                <ProgressBar
                  now={timeProgress}
                  className="mb-4"
                  variant={timeProgress > 40 ? "success" : timeProgress > 20 ? "warning" : "danger"}
                />

                <div className="item-card mb-4">
                  <h4 className="mb-2">Сортирай отпадъка:</h4>
                  <div className="game-item-display">
                    <span className="item-icon">{currentItem.icon}</span>
                    <strong>{currentItem.name}</strong>
                  </div>
                </div>

                <Row className="g-3 mb-3">
                  {BINS.map((bin) => (
                    <Col key={bin.key} sm={6} lg={4}>
                      <button
                        type="button"
                        className="bin-btn"
                        style={{ borderColor: bin.color }}
                        onClick={() => chooseBin(bin.key)}
                        disabled={!isRunning || isFinished}
                      >
                        <span>{bin.icon}</span>
                        <span>{bin.label}</span>
                      </button>
                    </Col>
                  ))}
                </Row>

                <p className="mb-4 game-feedback">{lastAction}</p>

                <div className="d-flex gap-3 flex-wrap">
                  <Button onClick={startGame} className="eco-primary-btn">
                    {isRunning ? "Рестарт" : "Старт"}
                  </Button>
                  <Button as={Link} to="/" variant="outline-dark">
                    Обратно към началото
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
