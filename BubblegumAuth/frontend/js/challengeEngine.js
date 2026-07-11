/*
=========================================
BubblegumAuth Challenge Engine
=========================================
*/

export default class ChallengeEngine {

    constructor() {

        this.challenge = null;

    }

    //-----------------------------------
    // Generate a challenge
    //-----------------------------------

    generate(credential) {

        const totalLines = credential.length;

        const line =
            Math.floor(Math.random() * totalLines);

        const lineLength =
            credential[line].length;

        const start =
            Math.floor(Math.random() * (lineLength - 6));

        const length = 6;

        const end = start + length;

        const expected =
            credential[line].substring(start, end);

        this.challenge = {

            line,

            start,

            end,

            expected,

            expires:

                Date.now() + 15000

        };

        return this.challenge;

    }

    //-----------------------------------
    // Return challenge text
    //-----------------------------------

    getPrompt() {

        if (!this.challenge)
            return "";

        return `Copy Line ${this.challenge.line + 1}
Characters ${this.challenge.start + 1}-${this.challenge.end}`;

    }

    //-----------------------------------
    // Verify
    //-----------------------------------

    verify(input) {

        if (!this.challenge)
            return false;

        if (Date.now() > this.challenge.expires)
            return false;

        return input === this.challenge.expected;

    }

    //-----------------------------------
    // Remaining Time
    //-----------------------------------

    remainingTime() {

        if (!this.challenge)
            return 0;

        return Math.max(

            0,

            Math.floor(

                (this.challenge.expires - Date.now())

                /1000

            )

        );

    }

    //-----------------------------------
    // Reset
    //-----------------------------------

    reset() {

        this.challenge = null;

    }

}