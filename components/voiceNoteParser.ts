import {
  addDays,
  format,
  isValid,
  nextFriday,
  nextMonday,
  nextSaturday,
  nextSunday,
  nextThursday,
  nextTuesday,
  nextWednesday,
  parse,
  setHours,
  setMinutes,
  startOfDay,
} from "date-fns";

export interface ParsedVoiceNote {
  title: string;
  date: string;
  time: string;
}

const WEEKDAY_PARSERS: Record<string, (date: Date) => Date> = {
  sunday: nextSunday,
  monday: nextMonday,
  tuesday: nextTuesday,
  wednesday: nextWednesday,
  thursday: nextThursday,
  friday: nextFriday,
  saturday: nextSaturday,
};

function stripFiller(text: string) {
  return text
    .replace(/\b(add|create|schedule|set|remind me about|reminder for)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseTime(input: string) {
  const matches = [...input.matchAll(/\b(at\s+)?(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?|am|pm)?\b/gi)];
  const match = matches.find((candidate) => Boolean(candidate[1] || candidate[3] || candidate[4]));
  if (!match) return { time: "", text: input };

  const rawHour = Number(match[2]);
  const rawMinute = match[3] ? Number(match[3]) : 0;
  const meridiem = match[4]?.replace(/\./g, "").toLowerCase();

  if (rawHour > 23 || rawMinute > 59) return { time: "", text: input };

  let hour = rawHour;
  if (meridiem === "pm" && hour < 12) hour += 12;
  if (meridiem === "am" && hour === 12) hour = 0;
  if (!meridiem && rawHour > 12) hour = rawHour;

  const dateWithTime = setMinutes(setHours(new Date(), hour), rawMinute);
  return {
    time: format(dateWithTime, "HH:mm"),
    text: input.replace(match[0], " "),
  };
}

function parseDate(input: string, baseDate = new Date()) {
  const today = startOfDay(baseDate);
  const lower = input.toLowerCase();

  if (/\btoday\b/.test(lower)) {
    return { date: format(today, "yyyy-MM-dd"), text: input.replace(/\btoday\b/i, " ") };
  }

  if (/\btomorrow\b/.test(lower)) {
    return { date: format(addDays(today, 1), "yyyy-MM-dd"), text: input.replace(/\btomorrow\b/i, " ") };
  }

  const weekdayMatch = lower.match(/\b(next\s+)?(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/);
  if (weekdayMatch) {
    const parser = WEEKDAY_PARSERS[weekdayMatch[2]];
    return {
      date: format(parser(today), "yyyy-MM-dd"),
      text: input.replace(new RegExp(`\\b${weekdayMatch[0]}\\b`, "i"), " "),
    };
  }

  const datePatterns = [
    { regex: /\b(?:on\s+)?(\d{1,2})(?:st|nd|rd|th)?\s+([a-z]+)(?:\s+(\d{4}))?\b/i, formats: ["d MMMM yyyy", "d MMM yyyy"] },
    { regex: /\b(?:on\s+)?([a-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?(?:,?\s+(\d{4}))?\b/i, formats: ["MMMM d yyyy", "MMM d yyyy"] },
  ];

  for (const pattern of datePatterns) {
    const match = input.match(pattern.regex);
    if (!match) continue;

    const year = match[3] ?? String(today.getFullYear());
    const candidates = pattern.regex.source.includes("([a-z]+)\\s+")
      ? [`${match[1]} ${match[2]} ${year}`]
      : [`${match[1]} ${match[2]} ${year}`];

    for (const value of candidates) {
      for (const dateFormat of pattern.formats) {
        const parsed = parse(value, dateFormat, today);
        if (isValid(parsed)) {
          return {
            date: format(parsed, "yyyy-MM-dd"),
            text: input.replace(match[0], " "),
          };
        }
      }
    }
  }

  return { date: "", text: input };
}

export function parseVoiceNote(input: string, baseDate = new Date()): ParsedVoiceNote {
  const cleaned = stripFiller(input);
  const timeResult = parseTime(cleaned);
  const dateResult = parseDate(timeResult.text, baseDate);
  const title = dateResult.text
    .replace(/\b(on|at|for)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  return {
    title: title || cleaned,
    date: dateResult.date,
    time: timeResult.time,
  };
}

export function formatVoiceNoteText(title: string, time: string) {
  if (!time) return title.trim();
  const [hours, minutes] = time.split(":").map(Number);
  const timeLabel = format(setMinutes(setHours(new Date(), hours), minutes), "h:mm a");
  return `${title.trim()} at ${timeLabel}`;
}
