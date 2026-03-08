import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function HomePage() {

  const waterPollution = [
    { name: "Чисти води", value: 30 },
    { name: "Умерено замърсени", value: 40 },
    { name: "Силно замърсени", value: 30 },
  ];

  const wasteStats = [
    { name: "Пластмаса", value: 45 },
    { name: "Хранителни отпадъци", value: 25 },
    { name: "Хартия", value: 20 },
    { name: "Други", value: 10 },
  ];

  const COLORS = ["#4caf50", "#ff9800", "#f44336"];

  return (
    <>
      {/* HERO */}
      <section
        className="d-flex align-items-center justify-content-center text-center py-5"
        style={{
          minHeight: "70vh",
          background: "linear-gradient(135deg,#e8f5e9,#c8e6c9)",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C12 22 11 16 7 15C3 14 2 10 2 10C2 10 6 11 10 12C10 8 10 3 12 2C14 3 14 8 14 12C18 11 22 10 22 10C22 10 21 14 17 15C13 16 12 22 12 22Z"
                fill="#81C784" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 22V12" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <Col md={10} lg={8}>
              <h1 className="display-3 fw-bold text-success mb-4">
                EcoBit Блог
              </h1>

              <p className="lead text-secondary mb-5 fs-4">
                Научи как малките действия могат да помогнат за опазването на природата.
              </p>

              <Button
                as={Link}
                to="/minigame"
                variant="success"
                size="lg"
                className="rounded-pill px-5 py-3 fw-bold"
              >
                Играй мини играта
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* BLOG SECTION */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="g-4">

            <Col md={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="fw-bold text-success">
                    Замърсяване на водите
                  </Card.Title>

                  <Card.Text>
                    Много реки и езера по света са силно замърсени. Пластмаса,
                    химикали и отпадни води често попадат директно в природата.
                  </Card.Text>

                  <Card.Text className="text-muted">
                    Това застрашава рибите, растенията и дори питейната вода
                    на хората.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="fw-bold text-success">
                    Проблемът с пластмасата
                  </Card.Title>

                  <Card.Text>
                    Всяка година милиони тонове пластмаса попадат в океаните.
                    Част от нея се разпада на микропластмаси, които попадат
                    в хранителната верига.
                  </Card.Text>

                  <Card.Text className="text-muted">
                    Намаляването на еднократната пластмаса е една от
                    най-важните стъпки за по-чиста планета.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="fw-bold text-success">
                    Малките действия имат значение
                  </Card.Title>

                  <Card.Text>
                    Рециклирането, пестенето на енергия и намаляването на
                    отпадъците са прости действия, които всеки човек може
                    да прави.
                  </Card.Text>

                  <Card.Text className="text-muted">
                    Ако милиони хора започнат да правят тези малки стъпки,
                    ефектът върху природата ще бъде огромен.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </Container>
      </section>

      {/* CHARTS */}
      <section
        className="py-5"
        style={{ background: "#f1f8f2", borderTop: "2px dashed #c8e6c9" }}
      >
        <Container>
          <Row className="mb-4 text-center">
            <Col>
              <h2 className="fw-bold text-success">
                Данни за околната среда
              </h2>
            </Col>
          </Row>

          <Row>

            {/* PIE CHART */}
            <Col md={6} className="mb-5">
              <h5 className="text-center mb-3">
                Състояние на реките по света
              </h5>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={waterPollution}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >
                    {waterPollution.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Col>

            {/* BAR CHART */}
            <Col md={6}>
              <h5 className="text-center mb-3">
                Видове битови отпадъци
              </h5>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={wasteStats}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4caf50" />
                </BarChart>
              </ResponsiveContainer>
            </Col>

          </Row>
        </Container>
      </section>

      <section className="py-5 bg-white">
        <Container>

          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold text-success">
                Малките действия правят голяма промяна
              </h2>
              <p className="text-muted fs-5">
                Всеки човек може да помогне на природата с прости ежедневни решения.
              </p>
            </Col>
          </Row>

          <Row className="g-4">

            <Col md={3}>
              <Card className="h-100 shadow-sm border-0 text-center">
                <Card.Body>
                  <h4>♻️ Рециклиране</h4>
                  <p className="text-muted">
                    Рециклирането на хартия, пластмаса и метал намалява количеството
                    отпадъци и пести природни ресурси.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="h-100 shadow-sm border-0 text-center">
                <Card.Body>
                  <h4>💧 Пестене на вода</h4>
                  <p className="text-muted">
                    Краткият душ и спирането на водата докато мием зъбите може да
                    спести стотици литри вода всеки месец.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="h-100 shadow-sm border-0 text-center">
                <Card.Body>
                  <h4>🌳 Засаждане на дървета</h4>
                  <p className="text-muted">
                    Дърветата почистват въздуха, произвеждат кислород и помагат
                    срещу климатичните промени.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="h-100 shadow-sm border-0 text-center">
                <Card.Body>
                  <h4>🚲 По-малко коли</h4>
                  <p className="text-muted">
                    Ходенето пеша, колелото или обществения транспорт намаляват
                    вредните емисии във въздуха.
                  </p>
                </Card.Body>
              </Card>
            </Col>

          </Row>

        </Container>
      </section>
    </>
  );
}
