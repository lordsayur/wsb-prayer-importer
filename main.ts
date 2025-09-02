const masihiMonth = prompt("Specify masihi month as number") || 9;
const masihiYear = prompt("Specify masihi year as number") || 2025;
const hijriMonth1 = prompt("Specify first hijri month as text") || "Rabiulawal";
const hijriMonth2 = prompt("Specify second hijri month as text") ||
  "Rabiulakhir";
const hijriYear = prompt("Specify hijri year as number") || "1447";

const content = await Deno.readTextFile("./prayer-data/prayer_times.txt");
// console.log(content);
const lines = content.split("\n");

const days = ["Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu", "Ahad", "Isnin"];

const linesByDay: string[][] = [];
let day: string[] = [];

lines.forEach((line, index) => {
  if (days.includes(line)) {
    if (day.length) linesByDay.push(day);
    day = [];
    day.push(line);
  } else {
    day.push(line);
  }

  if (index === lines.length - 1) {
    linesByDay.push(day);
  }
});

let previousHijriDay = "";
let currentHijriMonth = hijriMonth1;
const text = linesByDay
  .map((d) => {
    if (previousHijriDay !== "" && +previousHijriDay > +d[2]) {
      currentHijriMonth = hijriMonth2;
    }

    previousHijriDay = d[2];

    return `${d[1]}/${masihiMonth}/${masihiYear}\t${
      d[2]
    } ${currentHijriMonth} ${hijriYear}\t${d[3]}\t${d[4]}\t${d[5]}\t${d[6]}\t${
      d[7]
    }\t${d[8]}\t${d[9]}\t${d[10]}`;
  })
  .join("\n");

await Deno.writeTextFile("./prayer-data/prayer-formatted.txt", text);

console.log("File saved!");
