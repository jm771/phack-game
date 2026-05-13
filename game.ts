import { erf } from 'mathjs';

// Regular phrases (encouraging teacher vibes)
const overallPhrasesRegular = [
    "Nice work! You flipped {count} {type}, which is better than {percentile}% of random results.",
    "Interesting! You got {count} {type}. That's in the {percentile}th percentile.",
    "Good tosses! With {count} {type}, you're doing better than {percentile}% of people.",
    "Well done! {count} {type} puts you ahead of {percentile}% of results.",
    "Not bad! You managed {count} {type}, beating {percentile}% of the distribution.",
    "Nice! Your {count} {type} result is better than {percentile}% of flips.",
    "Cool! {count} {type} means you're in the top {top}% of results.",
    "Good job! With {count} {type}, you outperformed {percentile}% of random chance.",
    "Solid! You flipped {count} {type}, which beats {percentile}% of outcomes.",
    "That's pretty good! {count} {type} is better than {percentile}% of what we'd expect."
];

const streakPhrasesRegular = [
    "Nice streak! You got {count} {type} in a row. The odds of that are {probability}%.",
    "Interesting pattern! A {count}-{type} streak has a {probability}% probability.",
    "Good run! {count} consecutive {type} is a {probability}% occurrence.",
    "Cool sequence! Getting {count} {type} in a row happens {probability}% of the time.",
    "Notable streak! Your {count} {type} chain has odds of {probability}%.",
    "That's a solid streak! {count} {type} back-to-back is a {probability}% event.",
    "Nice consistency! {count} straight {type} has a probability of {probability}%.",
    "Interesting! You chained {count} {type} together, which has {probability}% odds.",
    "Good sequence! A run of {count} {type} occurs {probability}% of the time.",
    "That's noteworthy! {count} {type} in a row is a {probability}% probability."
];

const surprisingPhrasesRegular = [
    "Interesting pattern! You got {count} {type} out of {total} tosses. That's in the top {percentile}%.",
    "Notable result! Your best sequence was {count} {type} in {total} flips, which is in the top {percentile}%.",
    "Cool finding! {count} {type} in {total} attempts puts you in the top {percentile}%.",
    "Nice deviation! You managed {count} {type} out of {total} tosses, that's top {percentile}%.",
    "That's your standout result: {count} {type} in {total} flips (top {percentile}%).",
    "Good variation! {count} {type} out of {total} is in the top {percentile}% of results.",
    "Noteworthy! Your most extreme result was {count} {type} in {total} tosses (top {percentile}%).",
    "Solid peak! You hit {count} {type} out of {total} flips, that's top {percentile}%.",
    "That's interesting! {count} {type} in {total} attempts is in the top {percentile}%.",
    "Nice outlier! Your best was {count} {type} in {total} tosses, top {percentile}% of results."
];

// Over-the-top phrases for top 3% results
const overallPhrasesExcited = [
    "🎉 UNBELIEVABLE! You flipped {count} {type}! You did better than {percentile}% of people! You're a natural!",
    "🌟 WOW! {count} {type}?! That's INSANE! You beat {percentile}% of the population! Are you some kind of coin-flipping prodigy?!",
    "🔥 INCREDIBLE! You managed to flip {count} {type}! That puts you ahead of {percentile}% of everyone! You've got the golden touch!",
    "💫 AMAZING! {count} {type} tosses! You're literally better than {percentile}% of people at this! Have you been practicing?!",
    "⭐ SPECTACULAR! {count} {type}?! You just outperformed {percentile}% of the entire world! That's absolutely LEGENDARY!",
    "🎊 FANTASTIC! You flipped {count} {type}! You're in the top {top}% of all people! Your coin-flipping skills are OFF THE CHARTS!",
    "🚀 OUT OF THIS WORLD! {count} {type}?! You're better than {percentile}% of humanity! You should go professional!",
    "💥 MIND-BLOWING! You got {count} {type}! That beats {percentile}% of all coin flippers! You're absolutely CRUSHING IT!",
    "✨ PHENOMENAL! {count} {type} tosses! You're ahead of {percentile}% of everyone! Your talent is UNDENIABLE!",
    "🎯 EXTRAORDINARY! You flipped {count} {type}! You outperformed {percentile}% of the world! You're a COIN-FLIPPING CHAMPION!"
];

const streakPhrasesExcited = [
    "😱 HOLY MOLY! You tossed {count} {type} IN A ROW! The odds of that are only {probability}%! You're DEFYING PROBABILITY!",
    "🤯 ABSOLUTELY BONKERS! A streak of {count} consecutive {type}?! That's a {probability}% chance! You're a STATISTICAL MIRACLE!",
    "💎 UNREAL! {count} {type} in a row?! The probability is just {probability}%! You've achieved the IMPOSSIBLE!",
    "🌈 WHOA! A {count}-{type} streak! The odds? A mere {probability}%! You're REWRITING THE LAWS OF CHANCE!",
    "⚡ ELECTRIC! You chained {count} {type} together! Only a {probability}% chance! You're a PROBABILITY-DEFYING LEGEND!",
    "🎪 SPECTACULAR! {count} straight {type}?! That's a microscopic {probability}% probability! You're BREAKING MATHEMATICS!",
    "🏆 CHAMPION STREAK! {count} {type} consecutively! With odds of {probability}%, you're basically a SUPERHERO!",
    "🌟 STELLAR! A magnificent {count}-{type} run! The {probability}% odds didn't stand a chance against YOU!",
    "🎨 MASTERFUL! {count} {type} back-to-back! At {probability}% odds, you're performing COIN-FLIPPING MAGIC!",
    "🔮 MYSTICAL! {count} {type} in an unbroken chain! The {probability}% probability bows before your GREATNESS!"
];

const surprisingPhrasesExcited = [
    "🎆 STOP THE PRESSES! Your craziest result was {count} {type} in just {total} tosses! You're in the TOP {percentile}%! STATISTICALLY STUNNING!",
    "🌪️ WILD! You managed {count} {type} out of {total} flips! That's TOP {percentile}%! That's your most REMARKABLE achievement!",
    "🎭 DRAMATIC! Your best performance: {count} {type} in {total} attempts! TOP {percentile}%! You're a STATISTICAL ANOMALY!",
    "💥 KABOOM! Your peak was {count} {type} in {total} tosses! TOP {percentile}%! This is your CROWN JEWEL of coin flipping!",
    "🎪 SHOWSTOPPER! {count} {type} in {total} flips? You're in the TOP {percentile}%! This is your GREATEST STATISTICAL MOMENT!",
    "🌠 COSMIC! Your wildest result: {count} {type} out of {total}! That's TOP {percentile}%! The universe smiled upon you!",
    "🎨 ARTISTIC! You crafted {count} {type} in {total} tosses! TOP {percentile}%, that's your MASTERPIECE!",
    "🏅 GOLDEN MOMENT! {count} {type} in {total} flips! TOP {percentile}%! This is your most IMPRESSIVE statistical feat!",
    "🎯 BULLSEYE! Your craziest stat: {count} {type} in {total} tosses! TOP {percentile}% of PURE EXCELLENCE!",
    "🌟 LEGENDARY! Your standout result is {count} {type} in {total} flips! TOP {percentile}%! You've reached MYTHICAL status!"
];

// Coin flip logic
function flipCoins(count: number): boolean[] {
    const flips: boolean[] = [];
    for (let i = 0; i < count; i++) {
        flips.push(Math.random() < 0.5);
    }
    return flips;
}

// Calculate percentile using normal approximation to binomial
function calculatePercentile(heads: number, total: number): number {
    const p = 0.5;
    const mean = total * p;
    const stdDev = Math.sqrt(total * p * (1 - p));
    const z = (heads - mean) / stdDev;

    // Cumulative distribution function approximation
    const erfValue =  erf(z / Math.sqrt(2))
    const percentile = 0.5 * (1 + erfValue);
    return percentile * 100;
}

function formatToSigFigs(value: number, sigFigs = 2): string {
    if (value === 0) {
        return "0";
    }

    const abs = Math.abs(value);

    // Figure out how many decimal places are needed
    const digitsBeforeDecimal = Math.floor(Math.log10(abs)) + 1;
    const decimalPlaces = Math.max(0, sigFigs - digitsBeforeDecimal);

    // Round using toFixed to avoid scientific notation
    return value.toFixed(decimalPlaces);
}


// Find longest streak
function findLongestStreak(flips: boolean[]): { value: boolean; length: number } {
    let maxLength = 0;
    let maxValue = flips[0];
    let currentLength = 1;
    let currentValue = flips[0];

    for (let i = 1; i < flips.length; i++) {
        if (flips[i] === currentValue) {
            currentLength++;
        } else {
            if (currentLength > maxLength) {
                maxLength = currentLength;
                maxValue = currentValue;
            }
            currentLength = 1;
            currentValue = flips[i];
        }
    }

    if (currentLength > maxLength) {
        maxLength = currentLength;
        maxValue = currentValue;
    }

    return { value: maxValue, length: maxLength };
}

// Find most surprising streak (most extreme deviation from 50%)
function findMostSurprisingStreak(flips: boolean[]): { heads: number; total: number; percentage: number; percentile: number } {
    let maxDeviation = 0;
    let bestHeads = 0;
    let bestTotal = 0;
    let bestPercentile = 50;

    // Scan through different window sizes
    for (let windowSize = 10; windowSize <= Math.min(100, flips.length); windowSize++) {
        for (let i = 0; i <= flips.length - windowSize; i++) {
            let heads = 0;
            for (let j = i; j < i + windowSize; j++) {
                if (flips[j]) heads++;
            }

            const percentile = calculatePercentile(heads, windowSize);
            // Measure how extreme this result is (distance from median)
            const deviation = Math.abs(percentile - 50);

            if (deviation > maxDeviation) {
                maxDeviation = deviation;
                bestHeads = heads;
                bestTotal = windowSize;
                bestPercentile = percentile;
            }
        }
    }

    return {
        heads: bestHeads,
        total: bestTotal,
        percentile: bestPercentile
    };
}

// Display results
function displayResults(flips: boolean[]): void {
    const headsCount = flips.filter(f => f).length;
    const tailsCount = flips.length - headsCount;

    // Overall result
    const isHeads = headsCount > tailsCount;
    const count = isHeads ? headsCount : tailsCount;
    const type = isHeads ? "heads" : "tails";
    const percentile = calculatePercentile(count, flips.length);
    const topPercentile = (100 - percentile);

    // Use excited phrases if in top 3% (percentile > 97 or < 3)
    const isTopResult = percentile > 97 || percentile < 3;
    const overallPhrases = isTopResult ? overallPhrasesExcited : overallPhrasesRegular;

    const overallPhrase = overallPhrases[Math.floor(Math.random() * overallPhrases.length)]
        .replace("{count}", count.toString())
        .replace("{type}", type)
        .replace("{percentile}", formatToSigFigs(percentile))
        .replace("{top}", formatToSigFigs(topPercentile));

    document.getElementById("overall-result")!.textContent = overallPhrase;

    // Longest streak
    const streak = findLongestStreak(flips);
    const streakType = streak.value ? "heads" : "tails";
    const probability = Math.pow(0.5, streak.length) * 100;

    // Use excited phrases if probability is very low (< 0.1%)
    const isRareStreak = probability < 0.1;
    const streakPhrases = isRareStreak ? streakPhrasesExcited : streakPhrasesRegular;

    const streakPhrase = streakPhrases[Math.floor(Math.random() * streakPhrases.length)]
        .replace("{count}", streak.length.toString())
        .replace("{type}", streakType)
        .replace("{probability}", formatToSigFigs(probability));

    document.getElementById("streak-result")!.textContent = streakPhrase;

    // Most surprising result
    const surprising = findMostSurprisingStreak(flips);

    // Always report the more extreme outcome (closer to 0% or 100%)
    // If percentile > 50, we have more heads than expected, so report heads
    // If percentile < 50, we have fewer heads than expected, so report tails
    const surprisingType = surprising.percentile > 50 ? "heads" : "tails";
    const surprisingCount = surprising.percentile > 50 ? surprising.heads : surprising.total - surprising.heads;

    // Calculate how far into the extreme tail (distance from 100% or 0%)
    // This gives us "top X%" format
    const extremePercentile = surprising.percentile > 50 ? (100 - surprising.percentile) : surprising.percentile;

    // Use excited phrases if in top 3% (extreme percentile < 3)
    const isExtremeSurprising = extremePercentile < 3;
    const surprisingPhrases = isExtremeSurprising ? surprisingPhrasesExcited : surprisingPhrasesRegular;

    const surprisingPhrase = surprisingPhrases[Math.floor(Math.random() * surprisingPhrases.length)]
        .replace("{count}", surprisingCount.toString())
        .replace("{type}", surprisingType)
        .replace("{total}", surprising.total.toString())
        .replace("{percentile}", formatToSigFigs(extremePercentile));

    document.getElementById("surprising-result")!.textContent = surprisingPhrase;

    // Display all tosses
    const tossesDisplay = flips.map(f => f ? "H" : "T").join(" ");
    document.getElementById("all-tosses")!.textContent = tossesDisplay;
}

// Initialize game
function initGame(): void {
    const flips = flipCoins(1000);
    displayResults(flips);
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    initGame();

    document.getElementById("try-again-btn")!.addEventListener("click", () => {
        initGame();
    });
});
