import { STATUSES, User, Message } from "./model";

export const RANDOM_MSGS = [
    "I don’t know. What do you think?",
    "Has that been your experience too?",
    "Has that ever happened to you?",
    "Why do you think that is (the case)?",
    "Is that a good thing or a bad thing?",
    "Okay, I’m totally changing the topic now, but I was wondering …",
    "Not to go off topic, but I recently heard that …",
    "That reminds me …",
    "Oh hey. Did you hear that …",
    "Speaking of [horses], I found out that …",
    "I’m not keeping you from something, am I?",
    "Sorry for taking up so much of your time. Do you need to take off?",
    "I just realised you’re probably in the middle of something. Do you have time to chat?",
    "Let me know if you need to get going. I don’t want to take up all your time.",
    "Well, if you ever want to chat again, I’m usually here [every Monday afternoon].",
    "Let me give you my email address. If you’re ever in the area again it’d be great to meet up.",
    "Feel free to call me if you want to hang out. Here, I’ll give you my number.",
    "I really enjoyed our chat. Thanks so much.",
    "It was really nice meeting you.",
    "I had a great time talking with you. Hope to see you again soon.",
    "Actually, that happened to me once. It was really [annoying].",
    "I totally agree. The same thing happened to me too.",
    "That’s pretty common. I heard that a lot of people had the same experience.",
    "Hey, I better get going. I have a long day tomorrow.",
    "Hey Guys. Sorry, but I have to run. It was great chatting with you all.",
    "Oh man, it’s getting late. I better head out.",
    "Alright guys. Time for me to go. Have a good one.",
    "Do you have a recommendation on any good dishes?",
    "What would you recommend for someone who hasn’t eaten here before?",
    "What is the best drink here?",
    "Do you know if the [chow mein] is any good?",
    "Have you ever had the [asparagus]?",
    "If you had to eat just one meal for the rest of your life, what would it be?",
    "What is your favourite dessert?",
    "What is your favourite spicy dish?” (They don’t like spicy? Great! Ask them why, and keep the conversation going.)"
];

export const TYPE_OF_MSG: string[] = ["replies", "sent"];

export const getRandom = (items: string[]) =>
    items[Math.floor(Math.random() * items.length)];

export function generateMessage(length: number): { type: string, message: string }[] {
    return Array.from({ length }).map(
        () => ({ type: getRandom(TYPE_OF_MSG), message: getRandom(RANDOM_MSGS) })
    );
}

export const MESSAGES = [];

export const USERS: any[] = [
    {
        id: '1',
        name: "Sharmila",
        status: STATUSES.BUSY,
        img: "http://emilcarlsson.se/assets/rachelzane.png",
        messages: generateMessage(11)
    },
    {
        id: '2',
        name: "Louis Litt",
        status: STATUSES.BUSY,
        img: "http://emilcarlsson.se/assets/louislitt.png",
        messages: generateMessage(10)
    },
    {
        id: '3',
        name: "Harvey Specter",
        status: STATUSES.ONLINE,
        img: "http://emilcarlsson.se/assets/harveyspecter.png",
        messages: generateMessage(7)
    },
    {
        id: '4',
        name: "Aman Yadav",
        status: STATUSES.BUSY,
        img: "http://emilcarlsson.se/assets/donnapaulsen.png",
        messages: generateMessage(11)
    },
    {
        id: '5',
        name: "Harold Gunderson",
        status: STATUSES.OFFLINE,
        img: "http://emilcarlsson.se/assets/jessicapearson.png",
        messages: generateMessage(3)
    },
    {
        id: '6',
        name: "Samu Raunela",
        status: STATUSES.BUSY,
        img: "http://emilcarlsson.se/assets/haroldgunderson.png",
        messages: generateMessage(4)
    },
];