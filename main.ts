console.log("All arguments:", Deno.args);
const args: string[] = Deno.args;

const today = new Date()
const masihiMonth = args[0] || prompt(`Specify masihi month as number (e.g. ${today.getMonth() + 2}): `) || 9;
const masihiYear = args[1] || prompt(`Specify masihi year as number (e.g. ${today.getFullYear()}): `) || 2025;
const hijriMonth1 = args[2] || prompt("Specify first hijri month as text (e.g. Rabiulawal): ") || "Rabiulawal";
const hijriMonth2 = args[3] || prompt("Specify second hijri month as text (e.g. Rabiulakhir): ") ||
  "Rabiulakhir";
const hijriYear = args[4] || prompt("Specify hijri year as number (e.g. 1447): ") || "1447";

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
