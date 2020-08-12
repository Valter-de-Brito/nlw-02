const proffys = [
  {
    name: "Valter de Brito",
    avatar:
      "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
    whatsapp: "1234567",
    bio: "Entusiasta das melhores tecnologias de programação avançada...",
    subject: "Pogramação",
    cost: 120,
    weekday: [0],
    time_from: [720],
    time_to: [1220],
  },
  {
    name: "Daniele Fortes",
    avatar:
      "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
    whatsapp: "1234567",
    bio: "Entusiasta das melhores tecnologias de Química avançada...",
    subject: "Química",
    cost: 50,
    weekday: [1],
    time_from: [700],
    time_to: [1020],
  },
];

const subjects = [
  "Artes",
  "Biologia",
  "Ciências",
  "Educação física",
  "Física",
  "Geografia",
  "História",
  "Matemática",
  "Português",
  "Química",
];

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

function getSubject(subjectNumber) {
  const position = +subjectNumber - 1;
  return subjects[position];
}

function pageLanding(request, response) {
  return response.render("index.html");
}

function pageStudy(request, response) {
  const filters = request.query;
  return response.render("study.html", {
    proffys,
    filters,
    subjects,
    weekdays,
  });
}

function pageGiveClasses(request, response) {
  const data = request.query;
  const isDataNotEmpty = Object.keys(data).length > 0;

  if (isDataNotEmpty) {
    data.subject = getSubject(data.subject);
    proffys.push(data);

    return response.redirect("/study");
  }

  return response.render("give-classes.html", { subjects, weekdays });
}

const express = require("express");
const server = express();
const nunjucks = require("nunjucks");

nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server
  .use(express.static("public"))
  .get("/", pageLanding)
  .get("/study", pageStudy)
  .get("/give-classes", pageGiveClasses)
  .listen(5500);
